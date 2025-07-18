import { create } from "zustand";
import type { StateCreator } from "zustand";

import { persist } from "zustand/middleware";
interface UserStoreType {
  user: { username: string; id: string } | null;
  setUserName: (user: { username: string; id: string }) => void;
  logoutuser: () => void;
  setverified: () => void;
  isverified: boolean;
}

const userStore: StateCreator<UserStoreType> = (set) => {
  return {
    user: null,
    setUserName: (user: { username: string; id: string }) => {
      return set({ user });
    },
    logoutuser: () => {
      return set({ user: null });
    },
    isverified: false,
    setverified: () => {
      return set({ isverified: true });
    },
  };
};

const useUser = create(persist(userStore, { name: "user-state" }));

export default useUser;
