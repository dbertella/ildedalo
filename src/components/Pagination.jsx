import React from 'react';
import Link from './Link';

const Pagination = ({ currentPage = 1, totalPages = 1 }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="pagination-link">
          ← Previous
        </Link>
      )}
      
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      
      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`} className="pagination-link">
          Next →
        </Link>
      )}
    </div>
  );
};

export default Pagination; 