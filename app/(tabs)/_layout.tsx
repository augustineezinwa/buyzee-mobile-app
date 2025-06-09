import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Badge, useTheme } from 'react-native-paper';
import { useCartItemCount } from '../hooks/useCart';

const CartTabIcon = ({ color, size }: { color: string; size: number }) => {
    const itemCount = useCartItemCount();
    const theme = useTheme();

    return (
        <View>
            <MaterialIcons name="shopping-bag" size={size} color={color} />
            {itemCount > 0 && (
                <Badge
                    size={18}
                    style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.onPrimary,
                    }}>
                    {itemCount > 99 ? '99+' : itemCount}
                </Badge>
            )}
        </View>
    );
};

export default function TabLayout() {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.outline,
                    height: 90,
                    paddingBottom: 20,
                    paddingTop: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <MaterialIcons name="explore" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: CartTabIcon,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <MaterialIcons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
} 