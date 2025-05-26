import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function PageSearchBar({ searchTerm, setSearchTerm, handleSearch }: {
    searchTerm: string; setSearchTerm: (value: string) => void, handleSearch: () => void;
}) {
    return (
        <div className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                    className="pl-10 border-gray-200 focus:border-red-300 focus:ring-red-200"
                />
            </div>
            <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                <Button
                    onClick={handleSearch}
                    className="bg-red-600 hover:bg-red-700 text-white"
                >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                </Button>
                {searchTerm && (
                    <Button
                        variant="outline"
                        onClick={() => setSearchTerm("")}
                        className="border-gray-200 hover:bg-gray-50"
                    >
                        Clear
                    </Button>
                )}
            </div>
        </div>


    );
}
