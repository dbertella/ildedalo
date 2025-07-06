import React from 'react';
import BlogListItem from './BlogListItem';
import Pagination from './Pagination';

const BlogList = ({ posts, title, isTaxonomy, isAuthor }) => {
  return (
    <section className="blog-list-container">
      {/* If the list is a taxonomy, we render a title. */}
      {isTaxonomy && (
        <div className="header">
          <h1 className="title">{title}</h1>
        </div>
      )}

      {/* If the list is for a specific author, we render a title. */}
      {isAuthor && (
        <div className="header">
          <h3>Author: <b>{title}</b></h3>
        </div>
      )}

      {/* Iterate over the items of the list. */}
      {posts.map((post) => (
        <BlogListItem key={post.id} post={post} />
      ))}
      
      <Pagination />
    </section>
  );
};

export default BlogList; 