import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { META_THEME_COLORS, SITE } from "@/constants/site";

export const siteConfig = {
  description: SITE.DESCRIPTION.LONG,
  links: {
    github: LINK.GITHUB,
  },
  name: SITE.NAME,
  navItems: [
    {
      href: ROUTES.DOCS,
      label: "Docs",
    },
    {
      href: ROUTES.DOCS_EXAMPLES,
      label: "Examples",
    },
  ],
  ogImage: SITE.OG_IMAGE,
  url: SITE.URL,
};

export { META_THEME_COLORS };
