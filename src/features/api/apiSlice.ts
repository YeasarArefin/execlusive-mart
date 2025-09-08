import { appUrl } from '@/constants/appUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${appUrl}api`,
    }),
    tagTypes: ['Wishlists', 'Brands', 'Orders'],
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: '/signup',
                method: 'POST',
                body: data
            })
        }),
        verifyCode: builder.mutation({
            query: (data) => ({
                url: '/verify-code',
                method: 'POST',
                body: data
            })
        }),
        toggleWishlistsApi: builder.mutation({
            query: (data) => ({
                url: `/wishlists`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Wishlists']
        }),
        getWishLists: builder.query({
            query: (email) => `/wishlists?email=${email}&property=false`,
            // keepUnusedDataFor: 300,
        }),
        getWishListsWithDetails: builder.query({
            query: (email) => `/wishlists?email=${email}&property=true`,
            // keepUnusedDataFor: 300,
            providesTags: ['Wishlists']
        }),
        addToCartApi: builder.mutation({
            query: (data) => ({
                url: `/cart`,
                method: `POST`,
                body: data
            })
        }),
        getCart: builder.query({
            query: (email) => `/cart?email=${email}&property=false`,
        }),
        getCartWithDetails: builder.query({
            query: (email) => `/cart?email=${email}&property=true`,
        }),
        getCoupon: builder.query({
            query: ({ code, email }) => `/coupons?code=${code}&email=${email}`
        }),
        getProducts: builder.query({
            query: (query) => `/products?${query}`
        }),
        searchProducts: builder.query({
            query: (name) => `/products?name=${name}`
        }),
        getProductsCount: builder.query({
            query: () => `/products?count=true`
        }),
        getOrderCount: builder.query({
            query: () => `/orders?count=true`
        }),
        getOrders: builder.query({
            query: (query) => `/orders?${query}`,
            providesTags: ['Orders'],
        }),
        getOrder: builder.query({
            query: (oid) => `/orders?oid=${oid}`,
            providesTags: ['Orders'],
        }),
        updateOrderStatus: builder.mutation({
            query: (data) => ({
                url: '/order-status',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Orders'],
        }),
        payment: builder.mutation({
            query: (data) => ({
                url: '/payment/request',
                method: 'POST',
                body: data
            })
        }),
        uploadProduct: builder.mutation({
            query: (data) => ({
                url: '/products',
                method: 'POST',
                body: data
            })
        }),
        uploadBrand: builder.mutation({
            query: (data) => ({
                url: '/brands',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Brands'],
        }),
        getBrands: builder.query({
            query: () => `/brands`,
            providesTags: ['Brands'],
        }),
        getBrand: builder.query({
            query: (id) => `/brands`,
            providesTags: ['Brands'],
        }),
        updateBrand: builder.mutation({
            query: (data) => ({
                url: '/brands',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Brands'],
        }),
        deleteBrand: builder.mutation({
            query: ({ id }) => ({
                url: '/brands',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: ['Brands'],
        }),
        getBanners: builder.query({
            query: () => "/banners",
        }),
        uploadBanner: builder.mutation({
            query: (data) => ({
                url: '/banners',
                method: 'POST',
                body: data
            }),
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: '/banners',
                method: 'DELETE',
                body: { id },
            }),
        }),
    }),

});
export const {
    useSignUpMutation,
    useVerifyCodeMutation,
    useToggleWishlistsApiMutation,
    useGetWishListsQuery,
    useGetWishListsWithDetailsQuery,
    useAddToCartApiMutation,
    useGetCartQuery,
    useGetCartWithDetailsQuery,
    useGetCouponQuery,
    useLazyGetCouponQuery,
    useGetProductsQuery,
    useSearchProductsQuery,
    useGetProductsCountQuery,
    useGetOrdersQuery,
    useGetOrderCountQuery,
    useGetOrderQuery,
    useLazyGetOrderQuery,
    usePaymentMutation,
    useUploadProductMutation,
    useGetBrandsQuery,
    useUploadBrandMutation,
    useGetBrandQuery,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
    useUpdateOrderStatusMutation,
    useGetBannersQuery,
    useUploadBannerMutation,
    useDeleteBannerMutation,
} = apiSlice;