import { cn } from "@/lib/utils";
import { X, ChevronsUpDown, Check } from "lucide-react";
import { Button } from "./button";
import { useState, useEffect } from "react";
import { Badge } from "./badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface MultiSelectorProps {
  items: { label: string; value: string }[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
}

export default function MultiSelector({ items, selectedItems, setSelectedItems, placeholder }: MultiSelectorProps) {
  const [open, setOpen] = useState(false);
  const [localSelection, setLocalSelection] = useState<string[]>([]);

  // Sync with external state
  useEffect(() => {
    setLocalSelection(selectedItems || []);
  }, [selectedItems]);

  const removeItem = (itemValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelection = localSelection.filter((value) => value !== itemValue);
    setLocalSelection(newSelection);
    setSelectedItems(newSelection);
  };

  const handleItemSelect = (itemValue: string) => {
    let newSelection;
    if (localSelection.includes(itemValue)) {
      newSelection = localSelection.filter((id) => id !== itemValue);
    } else {
      newSelection = [...localSelection, itemValue];
    }
    setLocalSelection(newSelection);
    setSelectedItems(newSelection);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between min-h-[2.5rem]", localSelection.length > 0 ? "h-auto" : "h-10")}
        >
          <div className="flex flex-wrap gap-1 max-w-[90%]">
            {localSelection.length > 0 ? (
              localSelection.map((itemValue) => {
                const item = items.find((item) => item.value === itemValue);
                return (
                  <Badge key={itemValue} variant="secondary" className="mr-1 mb-1">
                    {item?.label || itemValue}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={(e) => removeItem(itemValue, e)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {item?.label || itemValue}</span>
                    </Button>
                  </Badge>
                );
              })
            ) : (
              <span className="text-muted-foreground">{placeholder ?? "Select options"}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No item found</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {items.map((item) => (
                <CommandItem key={item.value} value={item.value} onSelect={() => handleItemSelect(item.value)}>
                  <div className="flex items-center">{item.label}</div>
                  <Check
                    className={cn("ml-auto h-4 w-4", localSelection.includes(item.value) ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
