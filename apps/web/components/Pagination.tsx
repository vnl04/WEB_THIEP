'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = [];
  const showPages = 5;
  const halfShow = Math.floor(showPages / 2);

  let startPage = Math.max(1, currentPage - halfShow);
  let endPage = Math.min(totalPages, startPage + showPages - 1);

  if (endPage - startPage < showPages - 1) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* First Page */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="btn-ghost w-10 h-10 p-0 flex items-center justify-center"
          >
            1
          </button>
          {startPage > 2 && <span className="text-foreground-muted">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 p-0 flex items-center justify-center rounded-lg font-medium transition-all duration-200 ${
            page === currentPage
              ? 'bg-primary text-white'
              : 'text-foreground hover:bg-surface-light'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-foreground-muted">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="btn-ghost w-10 h-10 p-0 flex items-center justify-center"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
