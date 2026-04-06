import { useRouter } from 'expo-router';
import { useCurrentUser } from './useAuth';

export const useAuthGuard = () => {
    const { data: user, isLoading } = useCurrentUser();
    const router = useRouter();

    const requireAuth = (fallbackRoute?: string) => {
        if (!isLoading && !user) {
            if (fallbackRoute) {
                router.push(`/(auth)/login-prompt?fallback=${encodeURIComponent(fallbackRoute)}`);
            } else {
                router.push('/(auth)/login-prompt');
            }
            return false;
        }
        return true;
    };

    return {
        isAuthenticated: !!user,
        isLoading,
        requireAuth,
    };
};
