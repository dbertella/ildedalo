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
