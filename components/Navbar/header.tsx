import React from "react";
import {
	Header,
	Container,
	Group,
	Burger,
	Text,
	Button,
	Code,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./navbar.styles";

const AppHeader = () => {
	const { classes } = useStyles();
	const [opened, { toggle }] = useDisclosure(false);

	return (
		<div>
			<Header height={60} mb={120}>
				<Container className={classes.header}>
					<Text size="xl" weight={700}>
						Univboard <Code>beta</Code>
					</Text>
					<Group spacing={5} className={classes.links}>
						<Button variant="subtle" size="sm">
							<Text size="sm" weight={500}>
								Login
							</Text>
						</Button>
					</Group>

					<Burger
						opened={opened}
						onClick={toggle}
						className={classes.burger}
						size="sm"
					/>
				</Container>
			</Header>
		</div>
	);
};

export default AppHeader;
