import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { authAPI } from '../services/api';

// Query keys
export const authKeys = {
    currentUser: ['auth', 'currentUser'] as const,
};

// Get current user
export const useCurrentUser = () => {
    return useQuery({
        queryKey: authKeys.currentUser,
        queryFn: authAPI.getCurrentUser,
        staleTime: 1000 * 60 * 30, // 30 minutes
        retry: false,
    });
};


// Login mutation
export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authAPI.login,
        onSuccess: (data) => {
            // Update the current user in cache
            queryClient.setQueryData(authKeys.currentUser, data.user);
        },
    });
}

// Register mutation
export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authAPI.register,
        onSuccess: (data) => {
            // Update the current user in cache
            queryClient.setQueryData(authKeys.currentUser, data.user);
        },
    });
};

// Logout mutation
export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: authAPI.logout,
        onSuccess: () => {
            // Clear all cached data on logout
            queryClient.clear();
            queryClient.setQueryData(authKeys.currentUser, null);
            // Redirect to auth screen
            router.replace('/(auth)/login');
        },
    });
}

// Helper hook to check authentication status
export const useIsAuthenticated = () => {
    const { data: user } = useCurrentUser();
    return !!user;
};
