import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartAPI } from '../services/api';
import { CartItem } from '../types';
import { useCurrentUser } from './useAuth';

// Query keys
export const cartKeys = {
    all: ['cart'] as const,
    detail: (userId: string) => [...cartKeys.all, userId] as const,
};

// Get cart
export const useCart = () => {
    const { data: user } = useCurrentUser();

    return useQuery({
        queryKey: cartKeys.detail(user?.id || ''),
        queryFn: () => cartAPI.getCart(user?.id || ''),
        enabled: !!user?.id,
        staleTime: 0, // Always fresh for cart data
    });
};

// Add to cart mutation
export const useAddToCart = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();

    return useMutation({
        mutationFn: (item: Omit<CartItem, 'id'>) => {
            if (!user?.id) throw new Error('User not authenticated');
            return cartAPI.addToCart(user.id, item);
        },
        onSuccess: (updatedCart) => {
            if (user?.id) {
                queryClient.setQueryData(cartKeys.detail(user.id), updatedCart);
            }
        },
    });
};

// Update cart item mutation
export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();

    return useMutation({
        mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) => {
            if (!user?.id) throw new Error('User not authenticated');
            return cartAPI.updateCartItem(user.id, itemId, quantity);
        },
        onSuccess: (updatedCart) => {
            if (user?.id) {
                queryClient.setQueryData(cartKeys.detail(user.id), updatedCart);
            }
        },
    });
};

// Remove from cart mutation
export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();

    return useMutation({
        mutationFn: (itemId: string) => {
            if (!user?.id) throw new Error('User not authenticated');
            return cartAPI.removeFromCart(user.id, itemId);
        },
        onSuccess: (updatedCart) => {
            if (user?.id) {
                queryClient.setQueryData(cartKeys.detail(user.id), updatedCart);
            }
        },
    });
};

// Clear cart mutation
export const useClearCart = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();

    return useMutation({
        mutationFn: () => {
            if (!user?.id) throw new Error('User not authenticated');
            return cartAPI.clearCart(user.id);
        },
        onSuccess: (updatedCart) => {
            if (user?.id) {
                queryClient.setQueryData(cartKeys.detail(user.id), updatedCart);
            }
        },
    });
};

// Helper hook to get cart item count
export const useCartItemCount = () => {
    const { data: cart } = useCart();
    return cart?.itemCount || 0;
};
