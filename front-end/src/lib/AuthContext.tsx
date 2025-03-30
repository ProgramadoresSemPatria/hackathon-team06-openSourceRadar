import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, signInWithGitHub, signOut } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { toast } from "sonner";

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  saveOnboardingData: (languages: string[], experienceLevel: string) => Promise<boolean | undefined>;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  githubUsername?: string;
  githubToken?: string;
  preferredLanguages?: string[];
  favoriteRepos?: string[];
  createdAt?: Date;
  lastLogin?: Date;
  hasCompletedOnboarding?: boolean;
  experienceLevel?: string;
  updatedAt?: Date;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user?.uid || "No user");
      setCurrentUser(user);

      if (user) {
        // Buscar perfil do usuário no Firestore
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            console.log("User doc doesn't exist in Firestore");
          }
        } catch (error) {
          console.error("Erro ao buscar perfil do usuário:", error);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Função para fazer login
  const signIn = async () => {
    try {
      setLoading(true);
      await signInWithGitHub();
    } catch (error) {
      console.error("Erro na autenticação:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar dados de onboarding
  const saveOnboardingData = async (languages: string[], experienceLevel: string) => {
    if (!currentUser) {
      toast.error("Usuário não autenticado");
      return false;
    }

    try {
      const userDocRef = doc(db, "users", currentUser.uid);

      // Get current user data first to prevent overwriting
      const currentData = userProfile || {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
      };

      const updatedData = {
        ...currentData,
        preferredLanguages: languages,
        experienceLevel: experienceLevel,
        hasCompletedOnboarding: true,
        updatedAt: new Date(),
      };

      await setDoc(userDocRef, updatedData, { merge: true });

      // Update local state with the new data
      setUserProfile(updatedData as UserProfile);

      return true;
    } catch (error) {
      console.error("Erro ao salvar dados de onboarding:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    signIn,
    logout,
    saveOnboardingData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
