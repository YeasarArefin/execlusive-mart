import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Product } from '@/types/types';
import { Edit, Eye, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function GridView({ products, getTypeColor }: { products: Product[], getTypeColor: (type: string) => string; }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <Card
                    key={product._id}
                    className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                    <div className="relative h-48 bg-gray-50">
                        {product.images && product.images.length > 0 ? (
                            <Image
                                src={product.images[0].image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                        )}
                        {product.featured && (
                            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">Featured</Badge>
                        )}
                        {product.discount > 0 && (
                            <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">-{product.discount}%</Badge>
                        )}
                    </div>
                    <CardContent className="p-4">
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-semibold text-black line-clamp-1">{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.brand}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className={getTypeColor(product.type)}>
                                    {product.type}
                                </Badge>
                                <span className="text-xs text-gray-500">{product.colors.length} colors</span>
                            </div>

                            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex gap-1">
                                    {product.colors.slice(0, 3).map((color) => (
                                        <div
                                            key={color._id}
                                            className="w-4 h-4 rounded-full border border-gray-300"
                                            style={{ backgroundColor: color.color_code }}
                                            title={color.color_name}
                                        />
                                    ))}
                                    {product.colors.length > 3 && (
                                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
                                            <span className="text-xs text-gray-600">+{product.colors.length - 3}</span>
                                        </div>
                                    )}
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <div className="flex flex-col gap-0.5">
                                                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit Product
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete Product
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
