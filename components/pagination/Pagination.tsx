import React, { useState } from "react";

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            {/* Previous Button */}
            <button
                className={`px-3 py-1 border rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    className={`px-3 py-1 border rounded ${currentPage === page ? "bg-green-500 text-white" : "bg-[#224957] hover:bg-[#224957]-200"}`}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                className={`px-3 py-1 border rounded ${currentPage === totalPages ? "bg-[#224957] cursor-not-allowed" : "bg-[#224957] text-white hover:bg-green-500"}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
