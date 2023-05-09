import Layout from "@/components/Layout/layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { useThemeStore } from "@/lib/zustand.store";

export default function MyApp({ Component, pageProps }: AppProps) {
	const { theme } = useThemeStore((state) => ({
		theme: state.theme,
	}));

	return (
		<>
			<Head>
				<title>Univboard</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="A universal note app with first class clipboard support."
				/>
				<link rel="icon" href="/favicon.ico" />
				<meta property="og:title" content="Univboard" />
				<meta
					property="og:description"
					content="A universal note app with first class clipboard support."
				/>
				<meta property="og:type" content="website" />
				{/* <meta property="og:image" content="https://univboard.com/og-image.png" /> */}
			</Head>
			<MantineProvider
				theme={{ colorScheme: theme }}
				withGlobalStyles
				withNormalizeCSS
			>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</MantineProvider>
		</>
	);
}
