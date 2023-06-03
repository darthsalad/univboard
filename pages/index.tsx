import ClipCard from "@/components/ClipCard/card";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "./_app";
import { FC } from "react";
import { Button, Code, Text } from "@mantine/core";
import PageLoader from "@/components/Loader/PageLoader";
import { useAuthStore } from "@/lib/zustand.store";
import React from "react";

export interface ClipInterface {
	_id: string;
	title: string;
	text: string;
	owner: string;
	labels: string[];
	collaborators: string[];
	pinned: boolean;
	createdOn: string;
	modifiedOn: string;
}

interface FetchClipsResponse {
	clips: ClipInterface[];
}

const Home: FC = () => {
	const { user } = useAuthStore((state) => ({
		user: state.user,
	}));

	const { data, isLoading, error } = useQuery<FetchClipsResponse>(
		["clips"],
		() =>
			fetch(`${baseURL}/clips/${user.id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				credentials: "include",
			}).then((res) => res.json()),
		{
			refetchInterval: 5000,
		}
	);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<div className="card-wrapper">
			{data && data.clips ? (
				data.clips.map((clip) => (
					<ClipCard
						key={clip._id}
						title={clip.title}
						text={clip.text}
						labels={clip.labels}
						owner={clip.owner}
						collaborators={clip.collaborators}
						id={clip._id}
						pinned={clip.pinned}
						createdOn={clip.createdOn}
						modifiedOn={clip.modifiedOn}
					/>
				))
			) : (
				<div
					style={{
						textAlign: "center",
						marginTop: "20px",
					}}
				>
					<Text
						fw={500}
						fz="xl"
						style={{
							display: "inline-block",
						}}
					>
						There are no clips to show. Click the <Code>+</Code> button to add a
						new clip.
					</Text>
				</div>
			)}
		</div>
	);
};

export default Home;
