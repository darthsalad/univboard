import React from "react";
import {
	Header,
	Group,
	Burger,
	Text,
	Button,
	Code,
	useMantineTheme,
	ActionIcon,
} from "@mantine/core";
import { useStyles } from "./navbar.styles";
import { useNavbarStore, useThemeStore } from "@/lib/zustand.store";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

const AppHeader = () => {
	const { classes } = useStyles();
	const { colorScheme } = useMantineTheme();

	const { themeToggle } = useThemeStore((state) => ({
		themeToggle: state.toggle,
	}));

	const { opened, toggle } = useNavbarStore((state) => ({
		opened: state.opened,
		toggle: state.toggle,
	}));

	const toggleClassname = () => {
		const navbarDiv = document.getElementById("sidebar-anim");
		navbarDiv!.classList.toggle("sidebar-anim");
	};

	return (
		<div>
			<Header
				height={60}
				// mb={120}
				p="xs"
			>
				<Group sx={{ height: "100%" }} px={20} position="apart">
					<Text size="xl" weight={700}>
						Univboard <Code>beta</Code>
					</Text>
					<Group spacing={5} className={classes.links}>
						<ActionIcon variant="default" onClick={() => themeToggle()} size={30}>
              {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
            </ActionIcon>
						<Button variant="subtle" size="sm">
							<Text size="sm" weight={500}>
								Login
							</Text>
						</Button>
					</Group>

					<Burger
						opened={opened}
						onClick={() => {toggle(); toggleClassname();}}
						className={classes.burger}
						size="sm"
					/>
				</Group>
			</Header>
		</div>
	);
};

export default AppHeader;
