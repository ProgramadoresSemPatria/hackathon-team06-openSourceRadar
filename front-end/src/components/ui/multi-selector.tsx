import { cn } from "@/lib/utils";
import { X, ChevronsUpDown, Check } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";
import { Badge } from "./badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface MultiSelectorProps {
  items: { label: string; value: string }[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
}

export default function MultiSelector({
  items,
  selectedItems,
  setSelectedItems,
  placeholder,
}: MultiSelectorProps) {
  const [open, setOpen] = useState(false);

  const removeItem = (itemValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItems(selectedItems.filter((value) => value !== itemValue));
  };

  const handleItemSelect = (itemValue: string) => {
    setSelectedItems((current) => {
      if (current.includes(itemValue)) {
        return current.filter((id) => id !== itemValue);
      } else {
        return [...current, itemValue];
      }
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between min-h-[2.5rem]",
            selectedItems.length > 0 ? "h-auto" : "h-10"
          )}
        >
          <div className="flex flex-wrap gap-1 max-w-[90%]">
            {selectedItems.length > 0 ? (
              selectedItems.map((itemValue) => {
                const item = items.find((item) => item.value === itemValue);
                return (
                  <Badge
                    key={itemValue}
                    variant="secondary"
                    className="mr-1 mb-1"
                  >
                    {item?.label}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={(e) => removeItem(itemValue, e)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {item?.label}</span>
                    </Button>
                  </Badge>
                );
              })
            ) : (
              <span className="text-muted-foreground">
                {placeholder ?? "Select options"}
              </span>
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
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleItemSelect(item.value)}
                >
                  <div className="flex items-center">{item.label}</div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedItems.includes(item.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
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
