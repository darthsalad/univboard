import { AppShell } from "@mantine/core";
import Sidebar from "../Navbar/sidebar";
import AppHeader from "../Navbar/header";
import { useRouter } from "next/router";
import { useStyles } from "./layout.styles";

type LayoutProps = {
	children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	const { classes } = useStyles();
	const { pathname } = useRouter();

	return pathname === "/auth/login" || pathname === "/auth/register" ? (
		<div>
			<AppHeader />
			<main className={classes.authMain}>{children}</main>
		</div>
	) : (
		<div>
			<AppShell
				padding="md"
				navbar={<Sidebar />}
				header={<AppHeader />}
				styles={(theme) => ({
					main: {
						backgroundColor:
							theme.colorScheme === "dark"
								? theme.colors.dark[8]
								: theme.colors.gray[0],
					},
				})}
			>
				<main className="main-content">{children}</main>
			</AppShell>
		</div>
	);
};

export default Layout;
