import { ChangeEvent, useState } from "react";

export default function usePagination({ totalItems }) {

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const numberOfPages = Math.ceil(totalItems / itemsPerPage) || 0;
    // @ts-ignore
    const pages = [...Array(numberOfPages).keys()];

    const handleItemPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((currentPage) => currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage((currentPage) => currentPage + 1);
        }
    };

    return {
        itemsPerPage,
        currentPage,
        handleItemPerPageChange,
        handlePreviousPage,
        handleNextPage,
        setCurrentPage,
        pages,
        setItemsPerPage,
    };
}