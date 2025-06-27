"use client";

import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Loader2, Search } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLazyGetOrderQuery } from "@/features/api/apiSlice";
import { useDebounce } from "@/hooks/useDebounce";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onSearch?: (filteredData: TData[]) => void;
}

export function DataTable<TData, TValue>({ columns, data, onSearch }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Use a ref to store the original data to avoid re-renders
    const originalDataRef = React.useRef<TData[]>(data);
    React.useEffect(() => {
        originalDataRef.current = data;
    }, [data]);

    const [getOrder, { data: searchedOrder, isLoading, isError }] = useLazyGetOrderQuery();
    const [tableData, setTableData] = React.useState<TData[]>(data);

    // Single effect to handle all search-related logic
    React.useEffect(() => {
        // Initialize with props data when component mounts
        if (!debouncedSearchTerm) {
            setTableData(originalDataRef.current);
            if (onSearch) {
                onSearch([]);
            }
            return;
        }

        // Call API when debounced search term changes
        const fetchData = async () => {
            try {
                const result = await getOrder(debouncedSearchTerm).unwrap();
                if (result.success && result.data) {
                    // Handle both array and single object responses
                    const orderData = Array.isArray(result.data)
                        ? result.data
                        : [result.data];

                    setTableData(orderData as unknown as TData[]);

                    if (onSearch) {
                        onSearch(orderData as unknown as TData[]);
                    }
                }
            } catch (error) {
                console.error("Error fetching order data:", error);
                // On error, revert to original data
                setTableData(originalDataRef.current);
                if (onSearch) {
                    onSearch([]);
                }
            }
        };

        fetchData();
    }, [debouncedSearchTerm, getOrder, onSearch]);

    // Update tableData when data prop changes and no search is active
    React.useEffect(() => {
        if (!searchTerm) {
            setTableData(data);
        }
    }, [data, searchTerm]);

    const table = useReactTable({
        data: tableData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    // Handle search input changes
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Immediately clear search if the term is emptied
        if (value === "") {
            setTableData(originalDataRef.current);
            if (onSearch) {
                onSearch([]);
            }
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    {isLoading && <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />}
                    <Input
                        placeholder="Search by order ID..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="pl-8 pr-8"
                    />
                </div>
                <Select
                    value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
                    onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {isLoading ? "Searching..." : isError ? "Error loading data" : "No results."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                    Showing {table.getRowModel().rows?.length || 0} of {data.length} results
                </div>
            </div>
        </div>
    );
}
