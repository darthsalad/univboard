import React from "react";
import {
	IconArchive,
	IconArrowBadgeRight,
	IconCopy,
	IconPalette,
	IconPhoto,
	IconShare,
	IconTrash,
	IconUserPlus,
} from "@tabler/icons-react";
import { ActionIcon, Group, Tooltip } from "@mantine/core";

const iconOptions = [
	{
		icon: IconUserPlus,
		func: (e: any) => {
			e.stopPropagation();
			console.log("clicked");
		},
		title: "Add Collaborators",
	},
	{
		icon: IconPalette,
		func: (e: any) => {
			e.stopPropagation();
			console.log("clicked");
		},
		title: "Change Color",
	},
	{
		icon: IconPhoto,
		func: (e: any) => {
			e.stopPropagation();
			console.log("clicked");
		},
	},
	{
		icon: IconArchive,
		func: (e: any) => {
			e.stopPropagation();
			console.log("clicked");
		},
		title: "Archive",
	},
	{
		icon: IconTrash,
		func: (e: any) => {
			e.stopPropagation();
			console.log("clicked");
		},
		title: "Delete",
	},
];

const moreOptions = [
	{
		icon: IconCopy,
		func: (e: any) => {
			e.stopPropagation();
			console.log("clicked");
		},
		title: "Copy",
	},
	{
		icon: IconShare,
		func: (e: any) => {
			e.stopPropagation();
			console.log("clicked");
		},
		title: "Share",
	},
	{
		icon: IconArrowBadgeRight,
		func: (e: any) => {
			e.stopPropagation();
			console.log("clicked");
		},
		title: "Add Label",
	},
];

type IconOptionsProps = {
	card?: boolean;
};

const IconOptions = ({ card }: IconOptionsProps) => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: card ? "space-between" : "flex-start",
				alignItems: "flex-start",
				marginTop: "10px",
				overflowY: "hidden",
				overflowX: "auto",
				flexWrap: "nowrap",
			}}
		>
			{iconOptions.map((item, index) => {
				return (
					<Tooltip label={item.title} key={index}>
						<ActionIcon
							onClick={item.func}
							style={{
								marginRight: card ? 0 : "20px",
							}}
						>
							<item.icon size={card ? 18 : 23} />
						</ActionIcon>
					</Tooltip>
				);
			})}
			{!card ? (
				<Group position="apart" style={{ flexWrap: "nowrap" }}>
					{moreOptions.map((item, index) => (
						<Tooltip label={item.title} key={index}>
							<ActionIcon onClick={item.func}>
								<item.icon size={item.title === "Add Label" ? 25 : 19} />
							</ActionIcon>
						</Tooltip>
					))}
				</Group>
			) : null}
		</div>
	);
};

export default IconOptions;
