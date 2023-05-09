import { createStyles, px, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	sidebar: {
		transition: 'transform 0.3s ease-in-out',
		transform: 'translateX(0)',
		"@media (max-width: 768px)": {
			transform: 'translateX(-100%)',
		},
	},
	
	section: {
		marginLeft: `calc(${theme.spacing.md} * -1)`,
		marginRight: `calc(${theme.spacing.md} * -1)`,
		marginBottom: theme.spacing.md,

		"&:not(:last-of-type)": {
			borderBottom: `${rem(1)} solid ${
				theme.colorScheme === "dark"
					? theme.colors.dark[4]
					: theme.colors.gray[3]
			}`,
		},
	},

	searchCode: {
		fontWeight: 700,
		fontSize: rem(10),
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[7]
				: theme.colors.gray[0],
		border: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
		}`,
	},

	mainLinks: {
		paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
		paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
		paddingBottom: theme.spacing.md,
	},

	mainLink: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		padding: `${rem(8)} ${theme.spacing.xs}`,
		borderRadius: theme.radius.md,
		fontWeight: 500,
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,
		},
	},

	mainLinkInner: {
		display: "flex",
		alignItems: "center",
		flex: 1,
	},

	mainLinkIcon: {
		marginRight: theme.spacing.sm,
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[2]
				: theme.colors.gray[6],
	},

	mainLinkBadge: {
		padding: 0,
		width: rem(20),
		height: rem(20),
		pointerEvents: "none",
	},

	collections: {
		paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
		paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
		paddingBottom: theme.spacing.md,
	},

	collectionsHeader: {
		paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
		paddingRight: theme.spacing.md,
	},

	collectionLink: {
		display: "flex",
		alignItems: "center",
		padding: `${rem(8)} ${theme.spacing.xs}`,
		textDecoration: "none",
		borderRadius: theme.radius.md,
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		lineHeight: 1,
		fontWeight: 500,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,
		},
	},

	links: {
		[theme.fn.smallerThan(px(768))]: {
			display: "none",
		},
	},

	burger: {
		[theme.fn.largerThan(px(768))]: {
			display: "none",
		},
	},

	link: {
		display: "block",
		lineHeight: 1,
		padding: `${rem(8)} ${rem(12)}`,
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	linkActive: {
		"&, &:hover": {
			backgroundColor: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
				.color,
		},
	},
}));
