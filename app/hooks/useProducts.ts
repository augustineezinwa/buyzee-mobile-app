import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '../services/api';

// Query keys
export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...productKeys.lists(), { filters }] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: string) => [...productKeys.details(), id] as const,
    featured: () => [...productKeys.all, 'featured'] as const,
    categories: () => [...productKeys.all, 'categories'] as const,
    search: (query: string) => [...productKeys.all, 'search', query] as const,
    byCategory: (category: string) => [...productKeys.all, 'category', category] as const,
};

// Get all products
export const useProducts = () => {
    return useQuery({
        queryKey: productKeys.lists(),
        queryFn: productsAPI.getProducts,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

// Get single product
export const useProduct = (id: string) => {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: () => productsAPI.getProduct(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 15, // 15 minutes
    });
};

// Get featured products
export const useFeaturedProducts = () => {
    return useQuery({
        queryKey: productKeys.featured(),
        queryFn: productsAPI.getFeaturedProducts,
        staleTime: 1000 * 60 * 15, // 15 minutes
    });
};

// Get categories
export const useCategories = () => {
    return useQuery({
        queryKey: productKeys.categories(),
        queryFn: productsAPI.getCategories,
        staleTime: 1000 * 60 * 30, // 30 minutes
    });
};

// Search products
export const useSearchProducts = (query: string) => {
    return useQuery({
        queryKey: productKeys.search(query),
        queryFn: () => productsAPI.searchProducts(query),
        enabled: query.length > 2, // Only search if query is more than 2 characters
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Get products by category
export const useProductsByCategory = (category: string) => {
    return useQuery({
        queryKey: productKeys.byCategory(category),
        queryFn: () => productsAPI.getProductsByCategory(category),
        enabled: !!category,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};
