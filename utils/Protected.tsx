import PageLoader from "@/components/Loader/Loader";
import { baseURL } from "@/pages/_app";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuthStore } from "@/lib/zustand.store";
import React, { FC } from "react";

type TChildren = {
	children: React.ReactNode;
};

const Protected: FC<TChildren> = ({ children }: TChildren) => {
	const router = useRouter();
	const { isLoggedIn, setUser, setToken } = useAuthStore((state) => ({
		isLoggedIn: state.isLoggedIn,
		setUser: state.setUser,
		setToken: state.setToken,
	}));
	const { data, isLoading, isError } = useQuery({
		queryKey: ["auth"],
		queryFn: () => {
			fetch(`${baseURL}/auth`, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.id) {
						if (localStorage.getItem("token")) {
							setUser(data);
							setToken(localStorage.getItem("token")!);
							localStorage.setItem("user", JSON.stringify(data));
							return data;
						}
					} else {
						localStorage.removeItem("token");
						localStorage.removeItem("user");
						router.push("/auth/login");
					}
				})
				.catch((err) => {
					throw new Error("Error fetching details: ", err);
				});
			return null;
		},
		refetchInterval: 5000,
	});

	if (isLoading) {
		return <PageLoader />;
	};

	if (isError) {
		router.push("/auth/login");
	};

	return <div>{children}</div>;
};

export default Protected;
