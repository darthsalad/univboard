import React from "react";
import {
	Navbar,
	TextInput,
	Code,
	UnstyledButton,
	Text,
	Group,
	ActionIcon,
	Tooltip,
  Badge,
} from "@mantine/core";
import {
	IconSearch,
	IconPlus,
	IconSelector,
	IconNotes,
	IconUsers,
	IconArrowBadgeRight,
	IconArchive,
	IconTrash,
} from "@tabler/icons-react";
import { useStyles } from "@/components/Navbar/navbar.styles";
import UserButton from "../UserButton/UserButton";
import { useNavbarStore } from "@/lib/zustand.store";
import { useQuery } from "@tanstack/react-query";

const links = [
	{ icon: IconNotes, label: "All Notes", notifications: 3 },
	{ icon: IconUsers, label: "Shared Notes" },
	{ icon: IconArchive, label: "Archived Notes" },
	{ icon: IconTrash, label: "Trash" },
];

const collections = [
	{ icon: IconArrowBadgeRight, label: "Work" },
	{ icon: IconArrowBadgeRight, label: "Dev" },
	{ icon: IconArrowBadgeRight, label: "Project A" },
];

const Sidebar = () => {
	const { classes } = useStyles();
	const { opened } = useNavbarStore((state) => ({
		opened: state.opened,
	}));

	const { data: user, isLoading } = useQuery<{
		avatar: string;
		name: string;
		email: string;
	}>({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await fetch("http://localhost:5000/auth/profile", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				credentials: "include",
			});
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await res.json();
			return {
				avatar: data.avatar,
				name: data.name,
				email: data.email,
			};
		},
		refetchOnWindowFocus: false,
	});

	const mainLinks = links.map((link) => (
		<UnstyledButton key={link.label} className={classes.mainLink}>
			<div className={classes.mainLinkInner}>
				<link.icon size={25} className={classes.mainLinkIcon} stroke={1.5} />
				<span>{link.label}</span>
			</div>
			{/* {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )} */}
		</UnstyledButton>
	));

	const collectionLinks = collections.map((collection) => (
		<a
			href="/"
			onClick={(event) => event.preventDefault()}
			key={collection.label}
			className={classes.collectionLink}
		>
			<span>
				<collection.icon
					size={25}
					className={classes.mainLinkIcon}
					stroke={1.5}
				/>
			</span>{" "}
			{collection.label}
		</a>
	));

	return (
		<div>
			<Navbar
				height="100%"
				width={{ sm: 300 }}
				p="md"
				id="sidebar-anim"
				className={classes.sidebar}
			>
				<Navbar.Section className={classes.section}>
					<UserButton
						image={isLoading ? "https://i.imgur.com/fGxgcDF.png" : user?.avatar!}
						name={isLoading ? "Loading..." : user?.name!}
						email={isLoading ? "Loading..." : user?.email!}
						icon={<IconSelector size="0.9rem" stroke={1.5} />}
					/>
				</Navbar.Section>

				<TextInput
					placeholder="Search"
					icon={<IconSearch size="0.8rem" stroke={1.5} />}
					rightSectionWidth={70}
					rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
					styles={{ rightSection: { pointerEvents: "none" } }}
					mb="sm"
				/>

				<Navbar.Section className={classes.section}>
					<div className={classes.mainLinks}>{mainLinks}</div>
				</Navbar.Section>

				<Navbar.Section className={classes.section}>
					<Group className={classes.collectionsHeader} position="apart">
						<Text weight={500} color="dimmed">
							Labels
						</Text>
						<Tooltip label="Create a label" withArrow position="right">
							<ActionIcon variant="default" size={25}>
								<IconPlus size="1rem" stroke={1.5} />
							</ActionIcon>
						</Tooltip>
					</Group>
					<div className={classes.collections}>{collectionLinks}</div>
				</Navbar.Section>
			</Navbar>
		</div>
	);
};

export default Sidebar;
