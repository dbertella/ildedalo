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
  const author = state.source.author[item.author];
  const date = new Date(item.date);

  return (
    <article>
      <Link link={item.link}>
        <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
        {state.theme.featured.showOnList && (
          <FeaturedMedia id={item.featured_media} />
        )}
      </Link>

      {/* If the post has an excerpt (short summary text), we render it */}
      {item.excerpt && (
        <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
      )}
    </article>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);

const Title = styled.h2`
  font-size: 1.5rem;
  color: rgba(12, 17, 43, 0.8);
  font-weight: 400;
  margin: 0;
  padding-top: 24px;
  padding-bottom: 8px;
  box-sizing: border-box;
`;

const Excerpt = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);
`;
