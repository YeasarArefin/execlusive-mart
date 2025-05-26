import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Product } from '@/types/types';
import { Edit, Eye, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function ListView({ products, getTypeColor }: { products: Product[], getTypeColor: (type: string) => string; }) {
    return (
        <Card className="border-gray-200">
            <CardHeader>
                <CardTitle className="text-lg">Products List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-gray-200 bg-gray-50">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-900">Product</th>
                                <th className="text-left p-4 font-medium text-gray-900">Type</th>
                                <th className="text-left p-4 font-medium text-gray-900">Brand</th>
                                <th className="text-left p-4 font-medium text-gray-900">Colors</th>
                                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                                {product.images && product.images.length > 0 ? (
                                                    <Image
                                                        src={product.images[0].image || "/placeholder.svg"}
                                                        alt={product.name}
                                                        width={48}
                                                        height={48}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200"></div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-black">{product.name}</p>
                                                <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant="outline" className={getTypeColor(product.type)}>
                                            {product.type}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-gray-900">{product.brand}</td>
                                    <td className="p-4">
                                        <div className="flex gap-1">
                                            {product.colors.slice(0, 4).map((color) => (
                                                <div
                                                    key={color._id}
                                                    className="w-4 h-4 rounded-full border border-gray-300"
                                                    style={{ backgroundColor: color.color_code }}
                                                    title={color.color_name}
                                                />
                                            ))}
                                            {product.colors.length > 4 && (
                                                <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 4}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-1">
                                            {product.featured && (
                                                <Badge className="bg-red-100 text-red-800 border-red-200">Featured</Badge>
                                            )}
                                            {product.discount > 0 && (
                                                <Badge className="bg-green-100 text-green-800 border-green-200">-{product.discount}%</Badge>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
