import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Text, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCurrentUser, useLogout } from '../hooks/useAuth';
import { useBizTheme } from '../hooks/useBizTheme';
import { withOpacity } from '../theme/theme';

export default function ProfileScreen() {
    const router = useRouter();
    const theme = useBizTheme();
    const { data: user } = useCurrentUser();
    const logoutMutation = useLogout();

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.empbizBackground,
        },
        content: {
            padding: 24,
        },
        header: {
            alignItems: 'center',
            marginBottom: 32,
        },
        avatar: {
            marginBottom: 16,
            backgroundColor: theme.colors.empbizPrimary,
        },
        name: {
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            marginBottom: 8,
            fontFamily: 'Inter',
        },
        email: {
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
        },
        section: {
            marginBottom: 32,
        },
        sectionTitle: {
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            marginBottom: 16,
            fontFamily: 'Inter',
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            backgroundColor: 'white',
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: theme.colors.empbizIconGray,
        },
        menuIcon: {
            marginRight: 16,
        },
        menuText: {
            flex: 1,
            color: theme.colors.empbizBlack,
            fontWeight: '500',
            fontFamily: 'Inter',
        },
        logoutButton: {
            marginTop: 16,
            backgroundColor: theme.colors.error,
            borderRadius: 12,
        },
        logoutButtonContent: {
            paddingVertical: 8,
        },
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Avatar.Text
                        size={80}
                        label={user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        style={styles.avatar}
                    />
                    <Text variant="headlineSmall" style={styles.name}>
                        {user?.name || 'User'}
                    </Text>
                    <Text variant="bodyLarge" style={styles.email}>
                        {user?.email || 'user@example.com'}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>
                        Account
                    </Text>

                    <TouchableRipple
                        style={styles.menuItem}
                        onPress={() => router.push('/profile/edit')}
                        rippleColor={withOpacity(theme.colors.primary, 0.1)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name="edit"
                                size={24}
                                color={theme.colors.onSurface}
                                style={styles.menuIcon}
                            />
                            <Text variant="bodyLarge" style={styles.menuText}>
                                Edit Profile
                            </Text>
                            <MaterialIcons
                                name="chevron-right"
                                size={24}
                                color={theme.colors.onSurfaceVariant}
                            />
                        </View>
                    </TouchableRipple>

                    <TouchableRipple
                        style={styles.menuItem}
                        onPress={() => router.push('/(screens)/orders')}
                        rippleColor={withOpacity(theme.colors.primary, 0.1)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name="shopping-bag"
                                size={24}
                                color={theme.colors.onSurface}
                                style={styles.menuIcon}
                            />
                            <Text variant="bodyLarge" style={styles.menuText}>
                                My Orders
                            </Text>
                            <MaterialIcons
                                name="chevron-right"
                                size={24}
                                color={theme.colors.onSurfaceVariant}
                            />
                        </View>
                    </TouchableRipple>

                    <TouchableRipple
                        style={styles.menuItem}
                        onPress={() => router.push('/settings')}
                        rippleColor={withOpacity(theme.colors.primary, 0.1)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name="settings"
                                size={24}
                                color={theme.colors.onSurface}
                                style={styles.menuIcon}
                            />
                            <Text variant="bodyLarge" style={styles.menuText}>
                                Settings
                            </Text>
                            <MaterialIcons
                                name="chevron-right"
                                size={24}
                                color={theme.colors.onSurfaceVariant}
                            />
                        </View>
                    </TouchableRipple>
                </View>

                <Button
                    mode="contained"
                    style={styles.logoutButton}
                    contentStyle={styles.logoutButtonContent}
                    icon="logout"
                    onPress={handleLogout}
                    loading={logoutMutation.isPending}>
                    Logout
                </Button>
            </View>
        </SafeAreaView>
    );
} 