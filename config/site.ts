export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "GenerosityWave",
	description: "GenerosityWave is a simple app to manage donations and donors.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Sign In",
      href: "/sign-in",
    },
    {
      label: "User Profile",
      href: "/user-profile",
    },

	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Sign In",
      href: "/sign-in",
    },

	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
