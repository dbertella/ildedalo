const settings = {
  name: "il-dedalo",
  state: {
    frontity: {
      url: "https://ildedalo.com",
      title: "Il dedalo 🌿 Soul Space",
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
            ["Workshop ed Eventi", "/workshop-ed-eventi/"],
            ["Gli Spazi", "/gli-spazi/"],
            ["Contatti", "/contatti/"],
            ["News", "/category/news/"],
          ],
          featured: {
            showOnList: true,
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
          postsPage: "news",
          homepage: "home",
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
