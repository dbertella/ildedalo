import { useEffect } from "react";
import { connect, styled } from "frontity";
import Post from "./post";
import Item from "./list/list-item-corsi";
import Loading from "./loading";
import { Main } from "./Main";

const CLASSES_CATEGORY = "/category/i-corsi/";

const DedaloClasses = (props) => {
  useEffect(() => {
    props.actions.source.fetch(CLASSES_CATEGORY);
  }, []);

  const data = props.state.source.get(CLASSES_CATEGORY);
  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <>
      <Post {...props} />
      <Main>
        <Container>
          {data.items?.map(({ type, id }) => {
            const item = props.state.source[type][id];
            return (
              <ItemWrap key={item.id}>
                <Item item={item} />
              </ItemWrap>
            );
          })}
        </Container>
      </Main>
    </>
  ) : (
    <Loading />
  );
};

export default connect(DedaloClasses);

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
  @media (min-width: 420px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    /* This is better for small screens, once min() is better supported */
    /* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
    gap: 1rem;
  }
`;
const ItemWrap = styled.div``;
