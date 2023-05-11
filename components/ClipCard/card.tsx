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
		icon: IconUserPlus,
		func: () => {
			console.log("clicked");
		},
	},
	{
		icon: IconPalette,
		func: () => {
			console.log("clicked");
		},
	},
	{
		icon: IconTrash,
		func: () => {
			console.log("clicked");
		},
	},
	{
		icon: IconArchive,
		func: () => {
			console.log("clicked");
		},
	},
	{
		icon: IconDotsVertical,
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
			<Card shadow="sm" radius="md" withBorder className={classes.card}>
				<UnstyledButton>
					<div>
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
					</div>
				</UnstyledButton>
				<div>
					{/* <Group position="apart">
						{iconOptions.map((item, index) => {
							return (
								<ActionIcon radius="xl" onClick={item.func} key={index}>
									<item.icon size={23} />
								</ActionIcon>
							);
						})}
					</Group> */}
				</div>
			</Card>
		</div>
	);
};

export default ClipCard;
