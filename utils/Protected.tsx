import PageLoader from "@/components/Loader/PageLoader";
import { useAuthStore } from "@/lib/zustand.store";
import React, { FC } from "react";

type TChildren = {
	children: React.ReactNode;
};

const Protected: FC<TChildren> = ({ children }: TChildren) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const { setUser } = useAuthStore((state) => ({
		setUser: state.setUser,
	}));

	React.useEffect(() => {
		async function getUserFromCookie() {
			let user = document.cookie
				.split(";")
				.find((cookie) => {
					return cookie.includes("user");
				})
				?.split("=")[1];
			if (user) {
				user = decodeURIComponent(user!);
				user = JSON.parse(user);
				setUser(user);
			}
			setIsLoading(false);
		}

		getUserFromCookie();
	}, []);

	if (isLoading) {
		return <PageLoader />;
	}

	return <div>{children}</div>;
};

export default Protected;
