import React from 'react';
import Link from './Link';

const BlogPost = ({ post, childrenPages = [] }) => {
  // Check if post has featured image
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  
  return (
    <article className="blog-post">
      <div className="post-container">

        {featuredImage && (
          <div className="featured-image-container">
            <img 
              src={featuredImage} 
              alt={post.title.rendered}
              className="featured-image"
            />
          </div>
        )}

        <div className="post-content">
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>

        {childrenPages.length > 0 && (
          <div className="desktop-grid">
            {childrenPages.map((childPage) => (
              <div key={childPage.id} className="child-page-item">
                <Link href={`/news/${childPage.slug}`}>
                  <h3 dangerouslySetInnerHTML={{ __html: childPage.title.rendered }} />
                </Link>
              </div>
            ))}
          </div>
        )}

        {post.parent ? (
          <div className="back-to-parent">
            <Link href="/i-nostri-corsi/">Torna ai Corsi</Link>
          </div>
        ) : (
          <div className="back-to-parent">
            <Link href="/news/">Torna alle News</Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPost; 