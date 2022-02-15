import { useEffect } from "react";
import { connect, styled } from "frontity";
import Post from "./post";
import Item from "./list/list-item";
import Loading from "./loading";

const CLASSES_CATEGORY = "/category/i-nostri-corsi/";

const DedaloClasses = (props) => {
  console.log("dedalo");
  useEffect(() => {
    props.actions.source.fetch(CLASSES_CATEGORY);
  }, []);

  const data = props.state.source.get(CLASSES_CATEGORY);

  console.log(props.state);
  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <>
      <Post {...props} />
      <Container>
        {data.items?.map(({ type, id }) => {
          const item = props.state.source[type][id];
          // Render one Item component for each one.
          return <Item key={item.id} item={item} />;
        })}
      </Container>
    </>
  ) : (
    <Loading />
  );
};

export default connect(DedaloClasses);

const Container = styled.div`
  margin: 0;
  padding: 24px;
  @media (min-width: 420px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
