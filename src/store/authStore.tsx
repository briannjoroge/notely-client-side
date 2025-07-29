import { create } from "zustand";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
  dateJoined?: string;
  lastProfileUpdate?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const tokenFromStorage = localStorage.getItem("token");
const rawUser = localStorage.getItem("user");
const userFromStorage =
  rawUser && rawUser !== "undefined" ? JSON.parse(rawUser) : null;
const isLoggedIn = !!tokenFromStorage;

const useAuthStore = create<AuthStore>((set) => ({
  user: userFromStorage,
  token: tokenFromStorage,
  isLoggedIn,

  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({
      user,
      token,
      isLoggedIn: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    });
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
}));

export default useAuthStore;
