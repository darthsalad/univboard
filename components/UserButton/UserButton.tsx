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
	IconBug,
	IconChevronRight,
	IconLogout,
	IconMessageDots,
	IconSettings,
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
					<Menu.Item color="red" icon={<IconLogout size={14} />}>
						Logout
					</Menu.Item>
						<Menu.Divider />
					<Menu.Item icon={<IconMessageDots size={14} />}>Feedback</Menu.Item>
					<Menu.Item icon={<IconBug size={14} />}>Report Bug</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</div>
	);
};

export default UserButton;
