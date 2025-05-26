import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Grid, List } from "lucide-react";
import PageSearchBar from "../ui/PageSearchBar";

export default function FilterAndSearch({ searchTerm, setSearchTerm, handleProductSearch, filterType, setFilterType, clearFilters, viewMode, setViewMode }) {
    return (
        <Card className="border-gray-200">
            <CardContent className="p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Search and Action Buttons */}
                    <PageSearchBar handleSearch={handleProductSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    {/* Filter and View Controls */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger className="w-full sm:w-48 border-gray-200">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="phone">Phones</SelectItem>
                                <SelectItem value="laptop">Laptops</SelectItem>
                                <SelectItem value="accessory">Accessories</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            onClick={clearFilters}
                            className="border-gray-200 hover:bg-gray-50 text-gray-700"
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Clear Filters
                        </Button>

                        <div className="flex border border-gray-200 rounded-md overflow-hidden">
                            <Button
                                variant={viewMode === "grid" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className={viewMode === "grid" ? "bg-red-600 hover:bg-red-700 text-white" : "hover:bg-gray-100"}
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className={viewMode === "list" ? "bg-red-600 hover:bg-red-700 text-white" : "hover:bg-gray-100"}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
