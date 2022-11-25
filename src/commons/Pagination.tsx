import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

interface PaginationProps {
  itemInitial: number;
  itemFinal: number;
  totalItems: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination({ itemInitial, itemFinal, totalItems, totalPages, setPage }: PaginationProps) {
  const pivot = 3;
  const array = [];
  const [currentPage, setCurrentPage] = useState(1);
  const final = Math.min(Math.max(pivot * 2 + 2, pivot + currentPage + 1), totalPages + 1);
  const initial = Math.min(Math.max(final - (pivot * 2 + 1), 1), Math.max(currentPage - pivot, 1));

  for (let i = initial; i < final; i++) {
    array.push(
      <button
        key={`Pagination-${i}`}
        onClick={() => {
          setCurrentPage(i);
          setPage(i);
        }}
        aria-current="page"
        className={`${getCurrentPage(i)}`}
      >
        {i}
      </button>,
    );
  }

  function getCurrentPage(numberPage: number) {
    return numberPage === currentPage
      ? 'relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20'
      : 'relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex';
  }

  function startPagination() {
    if (currentPage !== 1) {
      setCurrentPage(1);
      setPage(1);
    }
  }

  function prevPagination() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPage(currentPage - 1);
    }
  }

  function nextPagination() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPage(currentPage + 1);
    }
  }

  function endPagination() {
    if (currentPage !== totalPages) {
      setCurrentPage(totalPages);
      setPage(totalPages);
    }
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button onClick={prevPagination} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Previous
        </button>
        <button onClick={nextPagination} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{itemInitial}</span> to <span className="font-medium">{itemFinal}</span> of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={startPagination}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Start</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button onClick={prevPagination} className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {array}
            <button onClick={nextPagination} className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={endPagination}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">End</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
