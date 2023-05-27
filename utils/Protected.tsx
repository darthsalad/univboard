import PageLoader from "@/components/Loader/Loader";
import { baseURL } from "@/pages/_app";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

type TChildren = {
	children: React.ReactNode;
};

const Protected = ({ children }: TChildren) => {
	const router = useRouter();
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
							localStorage.setItem("user", JSON.stringify(data));
						}
					} else {
						localStorage.removeItem("token");
						localStorage.removeItem("user");
						router.push("/auth/login");
					}
				});
			return null;
		},
	});

	if (isLoading) {
		return <PageLoader />;
	}

	return <div>{children}</div>;
};

export default Protected;
