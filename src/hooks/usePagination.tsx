import Pagination from "@/components/ui/pagination";
import { ChangeEvent, useState } from "react";

interface PaginationProps {
    totalItems: number;
    disabled?: boolean;
}

export default function usePagination({ totalItems, disabled = false }: PaginationProps) {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const numberOfPages = Math.ceil(totalItems / itemsPerPage) || 0;
    // @ts-ignore
    const pages = [...Array(numberOfPages).keys()];

    const handleItemPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (disabled) return;
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        if (disabled) return;
        if (currentPage > 1) {
            setCurrentPage((currentPage) => currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (disabled) return;
        if (currentPage < pages.length) {
            setCurrentPage((currentPage) => currentPage + 1);
        }
    };

    const PaginationComponent = () => {
        return <Pagination currentPage={currentPage} handleItemPerPageChange={handleItemPerPageChange} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} itemsPerPage={itemsPerPage} pages={pages} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} totalItems={totalItems} disabled={disabled} />;
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
        PaginationComponent
    };
}