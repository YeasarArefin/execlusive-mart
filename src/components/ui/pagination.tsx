import { cn } from '@/lib/utils';
import { UsePaginationProps } from '@/types/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select';

export default function Pagination(props: UsePaginationProps) {

    const { itemsPerPage, currentPage, handlePreviousPage, handleNextPage, setCurrentPage, pages, setItemsPerPage } = props;

    return (
        <div className="flex items-center gap-x-2">
            <Button onClick={handlePreviousPage} variant={'outline'} size={'sm'} className="hover:bg-gray-50">
                <ChevronLeft />
                Previous
            </Button>
            {
                pages.map(page => {
                    const correctPage = page + 1;
                    return (
                        <Button
                            key={correctPage}
                            onClick={() => setCurrentPage(correctPage)}
                            size={'sm'}
                            className={cn("bg-white py-2 px-4 hover:bg-primary_red hover:text-white text-primary_red border border-gray-200 shadow-none font-semibold", "", { "bg-primary_red text-white": correctPage === currentPage })}>{correctPage}
                        </Button>
                    );
                })
            }

            <Button onClick={handleNextPage} variant={'outline'} size={'sm'} className="hover:bg-gray-50">
                Next
                <ChevronRight />
            </Button>

            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(parseInt(value))}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="1">1 Items</SelectItem>
                        <SelectItem value="10">10 Items</SelectItem>
                        <SelectItem value="20">20 Items</SelectItem>
                        <SelectItem value="30">30 Items</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    );
}
