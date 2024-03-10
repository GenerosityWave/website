import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { ThemeModeScript } from 'flowbite-react';
import { ClerkProvider } from '@clerk/nextjs'
export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/images/logo.png",
		shortcut: "/images/logo.png",
		apple: "/images/logo.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
		<html lang="en" suppressHydrationWarning>
			   <head>
        <ThemeModeScript />
      </head>
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
							{children}
						</main>
						<footer className="w-full flex items-center justify-center py-3">
							<Link
								className="flex items-center gap-1 text-current"
								href="/r2sldevs"
								title="Credits"
							>
								<span className="text-default-600">Made with 💖 by</span>
								<p className="text-primary">R2SL Devs </p>
							</Link>
						</footer>
					</div>
				</Providers>
			</body>
		</html>
		</ClerkProvider>
	);
}
