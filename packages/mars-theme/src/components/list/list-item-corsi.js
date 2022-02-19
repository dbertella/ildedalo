import { connect, styled } from "frontity";
import Link from "../link";
import FeaturedMedia from "../featured-media";

/**
 * Item Component
 *
 * It renders the preview of a blog post. Each blog post contains
 * - Title: clickable title of the post
 * - Author: name of author and published date
 * - FeaturedMedia: the featured image/video of the post
 */
const Item = ({ state, item }) => {
  return (
    <Article>
      <Link link={item.link}>
        <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
        {state.theme.featured.showOnList && (
          <FeaturedMedia id={item.featured_media} />
        )}
      </Link>
    </Article>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);

const Title = styled.h2`
  font-size: 1.5rem;
  color: rgba(12, 17, 43);
  margin: 0;
  padding: 8px 0;
  box-sizing: border-box;
  text-align: center;
  background: rgba(62, 59, 63, 0.7);
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Article = styled.article`
  position: relative;
  min-height: 300px;
`;
