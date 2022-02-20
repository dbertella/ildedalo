import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";

const CORSI_URL = "/i-nostri-corsi/";
const CORSI_PAGE_ID = 33;

const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      autoPrefetch: "in-view",
      menu: [],
      isMobileMenuOpen: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      beforeSSR: async ({ state, actions, libraries }) => {
        // prefetch  extra content from dummy holder page
        const response = await libraries.source.api.get({
          endpoint: "pages",
          params: {
            _embed: true,
            parent: CORSI_PAGE_ID,
          },
        });

        // add the content to our data
        const res = await response.json();

        await actions.source.fetch(CORSI_URL);
        await Promise.all(
          res.map((r) => actions.source.fetch(`${CORSI_URL}${r.slug}`))
        );

        Object.assign(state.source.data[CORSI_URL], {
          childrenPages: res.sort((a, b) => a.menu_order - b.menu_order),
          isPageWithChildren: true,
        });
      },
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, iframe, link],
    },
  },
};

export default marsTheme;
