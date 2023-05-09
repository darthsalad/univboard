import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axios from "axios";

// type AuthState = {
//   isLoggedIn: boolean;
//   token: string;
//   user: any;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// };

type NavbarState = {
  opened: boolean;
  toggle: () => void;
};

type ThemeState = {
  theme: any;
  toggle: () => void;
};

// export const useAuthStore = create<AuthState>(
//   persist(
//     (set) => ({
//       isLoggedIn: false,
//       token: "",
//       user: {},
//       login: async (email: string, password: string) => {

//         const res = await axios.post("http://localhost:5000/api/auth/login", {
//           email,
//           password,
//         });

//         set((state) => ({
//           ...state,
//           isLoggedIn: true,
//           token: res.data.token,
//           user: res.data.user,
//         }));
//       }
//       ,
//       logout: () => {
//         set((state) => ({
//           ...state,
//           isLoggedIn: false,
//           token: "",
//           user: {},
//         }));
//       }
//       ,
//     }),
//     {
//       name: "auth-storage",
//     }
//   )
// );

export const useNavbarStore = create<NavbarState>((set) => ({
  opened: false,
  toggle: () => set((state) => ({ opened: !state.opened })),
}));

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",
  toggle: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
}));