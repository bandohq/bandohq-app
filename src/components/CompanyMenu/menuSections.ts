import { TFunction } from "i18next";

interface MenuSection {
  title: string;
  id: string;
  items: { label: string; href: string; active?: boolean; className?: string }[];
}

export const menuSections = (t: TFunction<"main", undefined>): MenuSection[] => [
  {
    title: t("main:main.docs", "Docs"),
    id: "docs",
    items: [
      {
        label: t("main:main.documentation", "Documentation"),
        href: "https://docs.bando.cool",
      },
      {
        label: t("main:main.apiReference", "API Reference"),
        href: "https://docs.bando.cool/fulfiller-api/api-reference",
      },
      {
        label: t("main:main.becomePartner", "Contact sales"),
        href: "https://tally.so/r/mexLqk",
      },
    ],
  },
  {
    title: t("main.about", "About"),
    id: "about",
    items: [
      { label: t("main.product", "Product"), href: "https://bando.cool" },
      { label: t("main.blog", "Blog"), href: "https://bando.cool/blog" },
    ],
  },
  {
    title: t("needHelp", "Need help?"),
    id: "needHelp",
    items: [
      { label: t("main.faqs", "FAQs"), href: "https://bando.cool#faqs" },
      {
        label: t("main.contactUs", "Contact us"),
        href: "mailto:support@bando.cool",
        className: "intercom-launcher",
      },
    ],
  },
];
