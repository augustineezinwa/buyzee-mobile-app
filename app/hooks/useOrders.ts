import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersAPI } from '../services/api';
import { Order } from '../types';
import { useCurrentUser } from './useAuth';
import { cartKeys } from './useCart';

// Query keys
export const orderKeys = {
    all: ['orders'] as const,
    lists: (userId: string) => [...orderKeys.all, 'list', userId] as const,
    details: () => [...orderKeys.all, 'detail'] as const,
    detail: (userId: string, orderId: string) => [...orderKeys.details(), userId, orderId] as const,
};

// Get user orders
export const useOrders = () => {
    const { data: user } = useCurrentUser();

    return useQuery({
        queryKey: orderKeys.lists(user?.id || ''),
        queryFn: () => ordersAPI.getOrders(user?.id || ''),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Get single order
export const useOrder = (orderId: string) => {
    const { data: user } = useCurrentUser();

    return useQuery({
        queryKey: orderKeys.detail(user?.id || '', orderId),
        queryFn: () => ordersAPI.getOrder(user?.id || '', orderId),
        enabled: !!user?.id && !!orderId,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

// Create order mutation
export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();

    return useMutation({
        mutationFn: (orderData: Omit<Order, 'id' | 'userId' | 'createdAt'>) => {
            if (!user?.id) throw new Error('User not authenticated');
            return ordersAPI.createOrder(user.id, orderData);
        },
        onSuccess: (newOrder) => {
            if (user?.id) {
                // Update orders list
                queryClient.invalidateQueries({
                    queryKey: orderKeys.lists(user.id),
                });

                // Clear cart since order was successful
                queryClient.invalidateQueries({
                    queryKey: cartKeys.detail(user.id),
                });

                // Set the new order in cache
                queryClient.setQueryData(
                    orderKeys.detail(user.id, newOrder.id),
                    newOrder
                );
            }
        },
    });
};
