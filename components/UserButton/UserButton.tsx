import React from "react";
import {
	Avatar,
	Text,
	UnstyledButton,
	UnstyledButtonProps,
	Group,
	Menu,
} from "@mantine/core";
import {
	IconChevronRight,
	IconPhoto,
	IconSettings,
	IconTrash,
} from "@tabler/icons-react";
import { useStyles } from "./user-button.styles";

interface UserButtonProps extends UnstyledButtonProps {
	image: string;
	name: string;
	email: string;
	icon?: React.ReactNode;
}

const UserButton = ({
	image,
	name,
	email,
	icon,
	...others
}: UserButtonProps) => {
	const { classes } = useStyles();
	return (
		<div>
			<Menu shadow="md" width={200} withArrow>
				<Menu.Target>
					<UnstyledButton className={classes.user} {...others}>
						<Group>
							<Avatar src={image} radius="xl" />

							<div style={{ flex: 1 }}>
								<Text weight={500}>{name}</Text>

								<Text color="dimmed" size="xs">
									{email}
								</Text>
							</div>

							{icon || <IconChevronRight size="1.5rem" stroke={1.5} />}
						</Group>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
					<Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
					<Menu.Item color="red" icon={<IconTrash size={14} />}>
						Delete my account
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</div>
	);
};

export default UserButton;
