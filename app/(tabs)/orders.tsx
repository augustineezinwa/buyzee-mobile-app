import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrdersScreen() {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        content: {
            flex: 1,
            padding: 24,
        },
        header: {
            marginBottom: 32,
        },
        title: {
            color: theme.colors.onBackground,
            fontWeight: '700',
            marginBottom: 8,
        },
        subtitle: {
            color: theme.colors.onSurfaceVariant,
        },
        emptyState: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        emptyIcon: {
            marginBottom: 24,
        },
        emptyTitle: {
            color: theme.colors.onBackground,
            fontWeight: '700',
            marginBottom: 8,
            textAlign: 'center',
        },
        emptySubtitle: {
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            marginBottom: 32,
        },
        orderCard: {
            backgroundColor: theme.colors.surface,
            borderRadius: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: theme.colors.outline,
            overflow: 'hidden',
        },
        orderHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.outline,
        },
        orderNumber: {
            color: theme.colors.onSurface,
            fontWeight: '600',
        },
        orderDate: {
            color: theme.colors.onSurfaceVariant,
        },
        orderStatus: {
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
            backgroundColor: theme.colors.primaryContainer,
        },
        orderStatusText: {
            color: theme.colors.onPrimaryContainer,
            fontWeight: '500',
        },
        orderContent: {
            padding: 16,
        },
        orderItem: {
            flexDirection: 'row',
            marginBottom: 12,
        },
        orderItemImage: {
            width: 60,
            height: 60,
            borderRadius: 8,
            backgroundColor: theme.colors.surfaceVariant,
        },
        orderItemDetails: {
            flex: 1,
            marginLeft: 12,
        },
        orderItemName: {
            color: theme.colors.onSurface,
            fontWeight: '500',
            marginBottom: 4,
        },
        orderItemPrice: {
            color: theme.colors.onSurfaceVariant,
        },
        orderTotal: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: theme.colors.outline,
        },
        totalLabel: {
            color: theme.colors.onSurface,
            fontWeight: '600',
        },
        totalValue: {
            color: theme.colors.onSurface,
            fontWeight: '700',
        },
    });

    // Mock data for demonstration
    const orders = [
        {
            id: '1',
            number: '#ORD-2024-001',
            date: 'Mar 15, 2024',
            status: 'Delivered',
            items: [
                {
                    id: '1',
                    name: 'Product Name',
                    price: 99.99,
                    image: 'https://example.com/image.jpg',
                },
            ],
            total: 99.99,
        },
    ];

    if (orders.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text variant="headlineMedium" style={styles.title}>
                            My Orders
                        </Text>
                        <Text variant="bodyLarge" style={styles.subtitle}>
                            View and manage your orders
                        </Text>
                    </View>

                    <View style={styles.emptyState}>
                        <MaterialIcons
                            name="shopping-bag"
                            size={80}
                            color={theme.colors.outline}
                            style={styles.emptyIcon}
                        />
                        <Text variant="headlineSmall" style={styles.emptyTitle}>
                            No Orders Yet
                        </Text>
                        <Text variant="bodyLarge" style={styles.emptySubtitle}>
                            When you place orders, they will appear here
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text variant="headlineMedium" style={styles.title}>
                        My Orders
                    </Text>
                    <Text variant="bodyLarge" style={styles.subtitle}>
                        View and manage your orders
                    </Text>
                </View>

                {orders.map((order) => (
                    <View key={order.id} style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                            <View>
                                <Text variant="bodyLarge" style={styles.orderNumber}>
                                    {order.number}
                                </Text>
                                <Text variant="bodySmall" style={styles.orderDate}>
                                    {order.date}
                                </Text>
                            </View>
                            <View style={styles.orderStatus}>
                                <Text variant="labelMedium" style={styles.orderStatusText}>
                                    {order.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.orderContent}>
                            {order.items.map((item) => (
                                <View key={item.id} style={styles.orderItem}>
                                    <View style={styles.orderItemImage} />
                                    <View style={styles.orderItemDetails}>
                                        <Text variant="bodyMedium" style={styles.orderItemName}>
                                            {item.name}
                                        </Text>
                                        <Text variant="bodySmall" style={styles.orderItemPrice}>
                                            ${item.price.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={styles.orderTotal}>
                            <Text variant="bodyLarge" style={styles.totalLabel}>
                                Total
                            </Text>
                            <Text variant="titleMedium" style={styles.totalValue}>
                                ${order.total.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
} 