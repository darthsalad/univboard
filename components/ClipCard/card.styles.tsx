import { createStyles, px } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	card: {
		display: "block",
		width: "275px",
		padding: theme.spacing.md,
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
		"@media (max-width: 923px)": {
			width: "300px",
		},
		"@media (max-width: 671px)": {
			width: "calc(100vw - 100px)",
			margin: "auto",
		}
	},

	cardContainer: {
		padding: px(10),
	},

	pinIcon: {
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
	},

	iconGroup: {
		display: "none",
		"&:hover": {
			display: "inline-block",
		},
	},
}));
