import { AppShell } from "@mantine/core";
import Sidebar from "../Navbar/sidebar";
import AppHeader from "../Navbar/header";

type LayoutProps = {
	children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
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
				<main>{children}</main>
			</AppShell>
		</div>
	);
};

export default Layout;
