export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const menu: { name: string; items: Item[] }[] = [
  {
    name: "",
    items: [
      {
        name: "Shows",
        slug: "shows",
        description: "Create UI that is shared across routes",
      },
      {
        name: "News",
        slug: "news",
        description: "Create UI that is shared across routes",
      },
      {
        name: "About Us",
        slug: "about",
        description: "Create UI that is shared across routes",
      },

      {
        name: "Contact Us",
        slug: "contact",
        description: "Create UI that is shared across routes",
      },
    ],
  },
];
