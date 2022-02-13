const settings = {
  name: "il-dedalo",
  state: {
    frontity: {
      url: "https://ildedalo.com",
      title: "Il dedalo 🌸 Soul Space",
      description:
        "Il Dedalo è uno spazio per l'anima, la creatività, la cura e la bellezza di condividere.",
    },
  },
  packages: [
    {
      name: "@frontity/mars-theme",
      state: {
        theme: {
          menu: [
            ["Home", "/"],
            ["Chi Siamo", "/chi-siamo/"],
            ["I Nostri Corsi", "/i-nostri-corsi/"],
            ["Gli Spazi", "/gli-spazi/"],
            ["Travel", "/category/travel/"],
            ["Japan", "/tag/japan/"],
          ],
          featured: {
            showOnList: false,
            showOnPost: true,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://ildedaloadmin.wordpress.com/",
          postsPage: "eventi",
          homepage: "home",
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
