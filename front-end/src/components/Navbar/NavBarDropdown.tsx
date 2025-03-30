// src/components/Navbar/NavBarDropdown.tsx
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProfileDialog } from "../ProfileDialog";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function NavBarDropdown() {
  const { logout, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout realizado com sucesso");
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary transition-colors cursor-pointer">
          <AvatarImage src={userProfile?.photoURL || ""} alt="Perfil" />
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ProfileDialog>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Perfil</DropdownMenuItem>
        </ProfileDialog>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="text-red-400 mr-2 h-4 w-4" />
          <span className="text-red-400 font-semibold">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
