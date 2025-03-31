import { create } from "zustand";

type TokenStore = {
  token: string;
};

export const useTokenStore = create<TokenStore>()(() => ({
  token: "",
}));
