import { FontAwesome, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Text } from 'react-native-paper';
import { useBizTheme } from '../hooks/useBizTheme';
import { useCartItemCount } from '../hooks/useCart';

const CartTabIcon = ({ color, size }: { color: string; size: number }) => {
    const itemCount = useCartItemCount();
    const theme = useBizTheme();

    return (
        <View style={styles.tabItem}>
            <View style={styles.tabIconContainer}>
                <SimpleLineIcons name="handbag" size={size} color={color} />
                {itemCount > 0 && (
                    <Badge
                        size={18}
                        style={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            backgroundColor: theme.colors.empbizPrimary,
                            color: theme.colors.onPrimary,
                        }}>
                        {itemCount > 99 ? '99+' : itemCount}
                    </Badge>
                )}
            </View>
            <Text style={[styles.tabLabel, { color }]}>Cart</Text>
        </View>
    );
};

export default function TabLayout() {
    const theme = useBizTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.empbizPrimary,
                tabBarInactiveTintColor: theme.colors.empbizTextDarkerGray,
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.outline,
                    height: 100,
                    paddingBottom: 20,
                    paddingTop: 12,
                    paddingHorizontal: 16,
                },
                tabBarLabel: () => null, // Hide default label
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <View style={styles.tabItem}>
                            <View style={styles.tabIconContainer}>
                                <MaterialIcons name="home" size={size} color={color} />
                            </View>
                            <Text style={[styles.tabLabel, { color }]}>Home</Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    tabBarIcon: CartTabIcon,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <View style={styles.tabItem}>
                            <View style={styles.tabIconContainer}>
                                <FontAwesome name="user-o" size={size} color={color} />
                            </View>
                            <Text style={[styles.tabLabel, { color }]}>Me</Text>
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabItem: {
        flexDirection: 'row',
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8, // Reduced gap to prevent wrapping
        // paddingHorizontal: 4, // Add some horizontal padding
    },
    tabIconContainer: {
        position: 'relative', // For badge positioning
    },
    tabLabel: {
        fontSize: 14, // Slightly reduced font size
        fontWeight: '500',
        fontFamily: 'Inter',
        marginTop: 0,
        includeFontPadding: true,
    },
}); 