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

interface CardProps {
	title: string;
	text: string;
	labels: string[];
	owner: string;
	collaborators: string[];
	id: string;
	pinned: boolean;
	createdOn: string;
	modifiedOn: string;
}

const ClipCard = ({
	title,
	text,
	labels,
	owner,
	collaborators,
	id,
	pinned,
	createdOn,
	modifiedOn,
}: CardProps) => {
	const { classes } = useStyles();
	const [pin, setPin] = React.useState(false);

	return (
		<div className={classes.cardContainer}>
			<Card shadow="sm" radius="md" withBorder className={classes.card}>
				<UnstyledButton>
					<div>
						<div>
							<Group position="apart">
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text size="lg" weight={500} style={{ margin: "10px auto" }}>
										{title.length > 15
											? title.substring(0, 15) + "..."
											: title
											? title
											: ""}
									</Text>
								</div>
								<div className={classes.iconGroup}>
									<Group position="right">
										<IconUserPlus size={20} />
										<ActionIcon
											radius="xl"
											onClick={() => {
												setPin(!pin);
												console.log(pin);
											}}
										>
											{pinned ? (
												<IconPinnedFilled
													size={23}
													className={classes.pinIcon}
												/>
											) : (
												<IconPinned size={23} className={classes.pinIcon} />
											)}
										</ActionIcon>
									</Group>
								</div>
							</Group>
						</div>

						<div>
							<Text size="sm" weight={400} style={{ marginBottom: 15 }}>
								{text}
							</Text>
						</div>
					</div>
				</UnstyledButton>
				<div>
					<Group position="apart">
						{iconOptions.map((item, index) => {
							return (
								<ActionIcon radius="xl" onClick={item.func} key={index}>
									<item.icon size={23} />
								</ActionIcon>
							);
						})}
					</Group>
				</div>
			</Card>
		</div>
	);
};

export default ClipCard;
