import React from 'react';
import Link from './Link';

const BlogListItem = ({ post }) => {
  // Check if post has featured image
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  
  return (
    <article className="blog-list-item">
      <Link href={`/news/${post.slug}`} className="item-link">
        <div className="item-content">
          {featuredImage && (
            <div className="item-image">
              <img src={featuredImage} alt={post.title.rendered} />
            </div>
          )}
          <div className="item-text">
            <h2 className="item-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div className="item-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogListItem; 