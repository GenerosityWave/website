import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { UserButton,SignOutButton , SignedIn, SignedOut,} from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/icons";



export const Navbar = () => {


	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<img src="/images/logo.png" alt="logo" className="w-24 h-24" />
						<p className="font-bold text-inherit">GenerosityWave</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))
					
					}<SignedIn>
							<NextLink
						className={clsx(
							linkStyles({ color: "foreground" }),
							"data-[active=true]:text-primary data-[active=true]:font-medium"
						)}
						color="foreground"
						href="/user-profile"
						>User profile</NextLink>
						</SignedIn>
						<SignedOut>
					
					<NextLink
						className={clsx(
							linkStyles({ color: "foreground" }),
							"data-[active=true]:text-primary data-[active=true]:font-medium"
						)}
						color="foreground"
						href="/sign-in"
						>Sign In</NextLink>
				
					
				</SignedOut>
				</ul>
			
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
	
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				
			
				
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				
				<div className="mx-4 mt-2 flex flex-col gap-2">
			
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
								}
								href={item.href}
								size="lg"
							>
								{item.label}
							</Link>
							<SignedOut>
					<br />
					<Link
						color="foreground"
						href="/sign-in"
						size="lg">Sign In</Link>
					
				</SignedOut>
				<SignedIn>
					<br />
					<Link
						color="foreground"
						href="/user-profile"
						size="lg">User Profile</Link>
					
				</SignedIn>
						</NavbarMenuItem>
					))}
			
				</div>
			</NavbarMenu>
			<SignedIn>
					<NavbarItem>
					<SignOutButton/>
					</NavbarItem>
				</SignedIn>
		</NextUINavbar>
	);
};
