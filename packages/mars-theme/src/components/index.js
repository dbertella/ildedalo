import { Global, css, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import { Footer } from "./Footer";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 *
 * @param props - The props injected by Frontity's {@link connect} HOC.
 *
 * @returns The top-level react component representing the theme.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <meta name="description" content={state.frontity.description} />
        <html lang="it" />
        <link rel="icon" href="/static/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
        <link rel="manifest" href="/static/manifest.webmanifest" />
        <meta name="theme-color" content="#669999" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />
      <Page>
        <HeadContainer>
          <Header />
        </HeadContainer>
        <div>
          <Switch>
            <Loading when={data.isFetching} />

            <List when={data.isArchive} />

            {/* <DedaloClasses when={data.isPageWithChildren} /> */}
            <Post when={data.isPostType} />
            <PageError when={data.isError} />
          </Switch>
        </div>
      </Page>

      <Footer />
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
  :root {
    --wp--preset--color--black: #000000;
    --wp--preset--color--cyan-bluish-gray: #abb8c3;
    --wp--preset--color--white: #ffffff;
    --wp--preset--color--pale-pink: #f78da7;
    --wp--preset--color--vivid-red: #cf2e2e;
    --wp--preset--color--luminous-vivid-orange: #ff6900;
    --wp--preset--color--luminous-vivid-amber: #fcb900;
    --wp--preset--color--light-green-cyan: #7bdcb5;
    --wp--preset--color--vivid-green-cyan: #00d084;
    --wp--preset--color--pale-cyan-blue: #8ed1fc;
    --wp--preset--color--vivid-cyan-blue: #0693e3;
    --wp--preset--color--vivid-purple: #9b51e0;
    --wp--preset--color--primary: #007cba;
    --wp--preset--color--secondary: #006ba1;
    --wp--preset--color--foreground: #333333;
    --wp--preset--color--background: #ffffff;
    --wp--preset--color--tertiary: #f0f0f0;
    --wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(
      135deg,
      rgba(6, 147, 227, 1) 0%,
      rgb(155, 81, 224) 100%
    );
    --wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(
      135deg,
      rgb(122, 220, 180) 0%,
      rgb(0, 208, 130) 100%
    );
    --wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(
      135deg,
      rgba(252, 185, 0, 1) 0%,
      rgba(255, 105, 0, 1) 100%
    );
    --wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(
      135deg,
      rgba(255, 105, 0, 1) 0%,
      rgb(207, 46, 46) 100%
    );
    --wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(
      135deg,
      rgb(238, 238, 238) 0%,
      rgb(169, 184, 195) 100%
    );
    --wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(
      135deg,
      rgb(74, 234, 220) 0%,
      rgb(151, 120, 209) 20%,
      rgb(207, 42, 186) 40%,
      rgb(238, 44, 130) 60%,
      rgb(251, 105, 98) 80%,
      rgb(254, 248, 76) 100%
    );
    --wp--preset--gradient--blush-light-purple: linear-gradient(
      135deg,
      rgb(255, 206, 236) 0%,
      rgb(152, 150, 240) 100%
    );
    --wp--preset--gradient--blush-bordeaux: linear-gradient(
      135deg,
      rgb(254, 205, 165) 0%,
      rgb(254, 45, 45) 50%,
      rgb(107, 0, 62) 100%
    );
    --wp--preset--gradient--luminous-dusk: linear-gradient(
      135deg,
      rgb(255, 203, 112) 0%,
      rgb(199, 81, 192) 50%,
      rgb(65, 88, 208) 100%
    );
    --wp--preset--gradient--pale-ocean: linear-gradient(
      135deg,
      rgb(255, 245, 203) 0%,
      rgb(182, 227, 212) 50%,
      rgb(51, 167, 181) 100%
    );
    --wp--preset--gradient--electric-grass: linear-gradient(
      135deg,
      rgb(202, 248, 128) 0%,
      rgb(113, 206, 126) 100%
    );
    --wp--preset--gradient--midnight: linear-gradient(
      135deg,
      rgb(2, 3, 129) 0%,
      rgb(40, 116, 252) 100%
    );
    --wp--preset--duotone--dark-grayscale: url(#wp-duotone-dark-grayscale);
    --wp--preset--duotone--grayscale: url(#wp-duotone-grayscale);
    --wp--preset--duotone--purple-yellow: url(#wp-duotone-purple-yellow);
    --wp--preset--duotone--blue-red: url(#wp-duotone-blue-red);
    --wp--preset--duotone--midnight: url(#wp-duotone-midnight);
    --wp--preset--duotone--magenta-yellow: url(#wp-duotone-magenta-yellow);
    --wp--preset--duotone--purple-green: url(#wp-duotone-purple-green);
    --wp--preset--duotone--blue-orange: url(#wp-duotone-blue-orange);
    --wp--preset--font-size--small: 1rem;
    --wp--preset--font-size--medium: 1.5rem;
    --wp--preset--font-size--large: 1.75rem;
    --wp--preset--font-size--x-large: 2rem;
    --wp--preset--font-family--system-font: -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",
      sans-serif;
    --wp--preset--font-family--arvo: Arvo, serif;
    --wp--preset--font-family--bodoni-moda: "Bodoni Moda", serif;
    --wp--preset--font-family--cabin: Cabin, sans-serif;
    --wp--preset--font-family--chivo: Chivo, sans-serif;
    --wp--preset--font-family--courier-prime: "Courier Prime", serif;
    --wp--preset--font-family--dm-sans: "DM Sans", sans-serif;
    --wp--preset--font-family--domine: Domine, serif;
    --wp--preset--font-family--eb-garamond: "EB Garamond", serif;
    --wp--preset--font-family--fira-sans: "Fira Sans", sans-serif;
    --wp--preset--font-family--helvetica-neue: "Helvetica Neue", "Helvetica",
      "Arial", sans-serif;
    --wp--preset--font-family--ibm-plex-mono: "IBM Plex Mono", monospace;
    --wp--preset--font-family--inter: Inter, sans-serif;
    --wp--preset--font-family--josefin-sans: "Josefin Sans", sans-serif;
    --wp--preset--font-family--libre-baskerville: "Libre Baskerville", serif;
    --wp--preset--font-family--libre-franklin: "Libre Franklin", sans-serif;
    --wp--preset--font-family--lora: Lora, serif;
    --wp--preset--font-family--merriweather: Merriweather, serif;
    --wp--preset--font-family--montserrat: Montserrat, sans-serif;
    --wp--preset--font-family--nunito: Nunito, sans-serif;
    --wp--preset--font-family--open-sans: "Open Sans", sans-serif;
    --wp--preset--font-family--overpass: Overpass, sans-serif;
    --wp--preset--font-family--playfair-display: "Playfair Display", serif;
    --wp--preset--font-family--poppins: Poppins, sans-serif;
    --wp--preset--font-family--raleway: Raleway, sans-serif;
    --wp--preset--font-family--red-hat-display: "Red Hat Display", sans-serif;
    --wp--preset--font-family--roboto: Roboto, sans-serif;
    --wp--preset--font-family--roboto-slab: "Roboto Slab", sans-serif;
    --wp--preset--font-family--rubik: Rubik, sans-serif;
    --wp--preset--font-family--source-sans-pro: "Source Sans Pro", sans-serif;
    --wp--preset--font-family--source-serif-pro: "Source Serif Pro", sans-serif;
    --wp--preset--font-family--space-mono: "Space Mono", sans-serif;
    --wp--preset--font-family--work-sans: "Work Sans", sans-serif;
    --wp--preset--spacing--20: 0.44rem;
    --wp--preset--spacing--30: 0.67rem;
    --wp--preset--spacing--40: 1rem;
    --wp--preset--spacing--50: 1.5rem;
    --wp--preset--spacing--60: 2.25rem;
    --wp--preset--spacing--70: 3.38rem;
    --wp--preset--spacing--80: 5.06rem;
  }
  body {
    margin: 0;
    font-family: "Montserrat", BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 18px;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #ffffea;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 234, 1) 55%,
    rgba(255, 255, 234, 0) 100%
  );
`;

const Page = styled.div`
  min-height: 100vh;
`;
