import { create } from "zustand";

type AuthState = {
	isLoggedIn: boolean;
	token: string;
	user: any | null;
	setUser: (user: any, token: string) => void;
	logout: () => void;
};

type NavbarState = {
	opened: boolean;
	toggle: () => void;
};

type ThemeState = {
	theme: any;
	toggle: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	isLoggedIn: false,
	token: "",
	user: null,
	setUser: (user, token) =>
		set(() => ({ isLoggedIn: true, user, token: token })),
	logout: () =>
		set(() => {
			fetch("http://localhost:5000/auth/logout", {
				method: "GET",
				credentials: "include",
				redirect: "follow",
			})
				.then((res) => res.json())
				.then(() => {
					window && window.location.reload();
				})
				.catch((err) => console.log(err));
			return {
				isLoggedIn: false,
				user: null,
				token: "",
			};
		}),
}));

export const useNavbarStore = create<NavbarState>((set) => ({
	opened: false,
	toggle: () => set((state) => ({ opened: !state.opened })),
}));

export const useThemeStore = create<ThemeState>((set) => ({
	theme: "dark",
	toggle: () =>
		set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
}));
