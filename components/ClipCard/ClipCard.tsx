import React from "react";
import { Card, Text, Group, ActionIcon, UnstyledButton } from "@mantine/core";
import { useStyles } from "./card.styles";
import {
	IconArchive,
	IconDotsVertical,
	IconPalette,
	IconPinned,
	IconPinnedFilled,
	IconTrash,
	IconUserPlus,
} from "@tabler/icons-react";

const iconOptions = [
	{
		icon: <IconUserPlus size={23} />,
		func: () => {
			console.log("clicked");
		},
	},
	{
		icon: <IconPalette size={23} />,
		func: () => {
			console.log("clicked");
		},
	},
	{
		icon: <IconTrash size={23} />,
		func: () => {
			console.log("clicked");
		},
	},
	{
		icon: <IconArchive size={23} />,
		func: () => {
			console.log("clicked");
		},
	},
	{
		icon: <IconDotsVertical size={23} />,
		func: () => {
			console.log("clicked");
		},
	},
];

const ClipCard = () => {
	const { classes } = useStyles();
	const [pinned, setPinned] = React.useState(false);

	return (
		<div className={classes.cardContainer}>
			<UnstyledButton>
				<Card shadow="sm" radius="md" withBorder className={classes.card}>
					<div>
						<Group position="apart">
							<Text size="lg" weight={500} style={{ marginBottom: 15 }}>
								Card title
							</Text>
							<Group>
								<IconUserPlus size={20} />
								<ActionIcon
									radius="xl"
									onClick={() => {
										setPinned(!pinned);
										console.log(pinned);
									}}
								>
									{pinned ? (
										<IconPinnedFilled size={23} className={classes.pinIcon} />
									) : (
										<IconPinned size={23} className={classes.pinIcon} />
									)}
								</ActionIcon>
							</Group>
						</Group>
					</div>
					<div>
						<Text size="sm" weight={400} style={{ marginBottom: 15 }}>
							Card description
						</Text>
					</div>
					<div>
						<Group position="apart">
							{iconOptions.map((item) => {
								return (
									<ActionIcon radius="xl" onClick={item.func}>
										{item.icon}
									</ActionIcon>
								);
							})}
						</Group>
					</div>
				</Card>
			</UnstyledButton>
		</div>
	);
};

export default ClipCard;
