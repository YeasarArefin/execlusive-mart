import { ApiResponse } from "@/types/ApiResponse";

export default async function getQuery(url: string, cache?: 'force-cache' | 'no-cache' | 'no-store'): Promise<ApiResponse> {
    const response = await fetch(url, { cache: cache || 'no-cache' });
    // const response = await fetch(url, { cache: 'no-cache' });
    return response.json();
}