import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCurrentUser } from '../hooks/useAuth';
import { useBizTheme } from '../hooks/useBizTheme';
import { useOrders } from '../hooks/useOrders';

// Mock data for demonstration
const mockOrders = [
    {
        id: '1',
        userId: '1',
        items: [
            {
                id: '1',
                productId: '1',
                name: 'Wireless Headphones',
                price: 199.99,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                quantity: 1,
                size: undefined,
                color: 'Black',
                category: 'Electronics',
            },
            {
                id: '2',
                productId: '3',
                name: 'Running Shoes',
                price: 89.99,
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                quantity: 1,
                size: '9',
                color: 'Black',
                category: 'Foot wears',
            },
        ],
        total: 289.98,
        status: 'delivered',
        createdAt: '2024-03-15T10:30:00Z',
        deliveryAddress: {
            street: '123 Main Street',
            city: 'Lagos',
            state: 'Lagos',
            zipCode: '100001',
            country: 'Nigeria',
        },
        paymentMethod: 'Paystack',
    },
    {
        id: '2',
        userId: '1',
        items: [
            {
                id: '3',
                productId: '2',
                name: 'Smart Watch',
                price: 299.99,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                quantity: 1,
                size: undefined,
                color: 'Silver',
                category: 'Electronics',
            },
        ],
        total: 299.99,
        status: 'shipped',
        createdAt: '2024-03-20T14:15:00Z',
        deliveryAddress: {
            street: '456 Oak Avenue',
            city: 'Abuja',
            state: 'FCT',
            zipCode: '900001',
            country: 'Nigeria',
        },
        paymentMethod: 'Paystack',
    },
    {
        id: '3',
        userId: '1',
        items: [
            {
                id: '4',
                productId: '5',
                name: 'Cotton T-Shirt',
                price: 24.99,
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                quantity: 2,
                size: 'M',
                color: 'White',
                category: 'Clothes',
            },
            {
                id: '5',
                productId: '8',
                name: 'Denim Jeans',
                price: 79.99,
                image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
                quantity: 1,
                size: '32',
                color: 'Blue',
                category: 'Clothes',
            },
        ],
        total: 129.97,
        status: 'processing',
        createdAt: '2024-03-22T09:45:00Z',
        deliveryAddress: {
            street: '789 Pine Road',
            city: 'Port Harcourt',
            state: 'Rivers',
            zipCode: '500001',
            country: 'Nigeria',
        },
        paymentMethod: 'Paystack',
    },
];

// Use mock data if no real orders


export default function OrdersScreen() {
    const router = useRouter();
    const theme = useBizTheme();

    const { data: user } = useCurrentUser();
    const { data: orders, isLoading } = useOrders(user?.id || '');

    const displayOrders = orders && orders.length > 0 ? orders : mockOrders;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.empbizBackground,
        },
        content: {
            flex: 1,
            paddingHorizontal: 24,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: theme.colors.empbizBackground,
        },
        backButton: {
            marginRight: 8,
        },
        headerTitle: {
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            fontFamily: 'Inter',
            fontSize: 20,
        },
        emptyState: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
        },
        emptyIcon: {
            marginBottom: 24,
        },
        emptyTitle: {
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            marginBottom: 8,
            textAlign: 'center',
            fontFamily: 'Inter',
        },
        emptySubtitle: {
            color: theme.colors.empbizTextDarkerGray,
            textAlign: 'center',
            marginBottom: 32,
            fontFamily: 'Inter',
        },
        shopButton: {
            backgroundColor: theme.colors.empbizPrimary,
            borderRadius: 12,
        },
        shopButtonContent: {
            paddingVertical: 8,
        },
        shopButtonLabel: {
            color: 'white',
            fontFamily: 'Inter',
            fontWeight: '600',
        },
        orderCard: {
            backgroundColor: 'white',
            borderRadius: 12,
            marginBottom: 16,
            overflow: 'hidden',
        },
        orderHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.empbizIconGray,
        },
        orderInfo: {
            flex: 1,
        },
        orderNumber: {
            color: theme.colors.empbizBlack,
            fontWeight: '600',
            fontFamily: 'Inter',
            fontSize: 16,
            marginBottom: 4,
        },
        orderDate: {
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
            fontSize: 14,
        },
        orderStatus: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
            backgroundColor: theme.colors.empbizSecondary,
        },
        orderStatusText: {
            color: theme.colors.empbizBlack,
            fontWeight: '500',
            fontFamily: 'Inter',
            fontSize: 12,
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
            backgroundColor: theme.colors.empbizDarkerBackground,
        },
        orderItemDetails: {
            flex: 1,
            marginLeft: 12,
            justifyContent: 'center',
        },
        orderItemName: {
            color: theme.colors.empbizBlack,
            fontWeight: '500',
            marginBottom: 4,
            fontFamily: 'Inter',
            fontSize: 14,
        },
        orderItemPrice: {
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
            fontSize: 13,
        },
        orderTotal: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: theme.colors.empbizIconGray,
            backgroundColor: theme.colors.empbizBackground,
        },
        totalLabel: {
            color: theme.colors.empbizBlack,
            fontWeight: '600',
            fontFamily: 'Inter',
            fontSize: 16,
        },
        totalValue: {
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            fontFamily: 'Inter',
            fontSize: 18,
        },
        orderFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: theme.colors.empbizIconGray,
            backgroundColor: theme.colors.empbizBackground,
        },
        viewSection: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        viewText: {
            color: theme.colors.empbizPrimary,
            fontFamily: 'Inter',
            fontWeight: '600',
            fontSize: 14,
            marginRight: 4,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return theme.colors.empbizPrimary;
            case 'shipped':
                return '#FFA500';
            case 'processing':
                return '#2196F3';
            case 'pending':
                return '#FF9800';
            case 'cancelled':
                return '#F44336';
            default:
                return theme.colors.empbizTextDarkerGray;
        }
    };

    const renderOrderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.orderCard}
            onPress={() => router.push(`/order/${item.id}`)}
            activeOpacity={0.7}
        >
            <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                    <Text style={styles.orderNumber}>
                        Order #{item.id}
                    </Text>
                    <Text style={styles.orderDate}>
                        {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
                </View>
                <View style={[styles.orderStatus, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Text style={[styles.orderStatusText, { color: getStatusColor(item.status) }]}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Text>
                </View>
            </View>

            <View style={styles.orderContent}>
                {item.items.map((orderItem: any) => (
                    <View key={orderItem.id} style={styles.orderItem}>
                        <Image
                            source={{ uri: orderItem.image }}
                            style={styles.orderItemImage}
                            defaultSource={{ uri: 'https://via.placeholder.com/60x60/EBECF3/9CA1A4?text=IMG' }}
                        />
                        <View style={styles.orderItemDetails}>
                            <Text style={styles.orderItemName}>
                                {orderItem.name}
                            </Text>
                            <Text style={styles.orderItemPrice}>
                                Qty: {orderItem.quantity} • ₦{orderItem.price.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.orderFooter}>
                <Text style={styles.totalValue}>
                    ₦{item.total.toFixed(2)}
                </Text>
                <View style={styles.viewSection}>
                    <Text style={styles.viewText}>View</Text>
                    <MaterialIcons name="arrow-forward-ios" size={16} color={theme.colors.empbizPrimary} />
                </View>
            </View>
        </TouchableOpacity>
    );
    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.empbizPrimary} />
                </View>
            </SafeAreaView>
        );
    }

    if (!displayOrders || displayOrders.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Orders</Text>
                </View>
                <View style={styles.emptyState}>
                    <MaterialIcons
                        name="shopping-bag"
                        size={80}
                        color={theme.colors.empbizIconGray}
                        style={styles.emptyIcon}
                    />
                    <Text variant="headlineSmall" style={styles.emptyTitle}>
                        No Orders Yet
                    </Text>
                    <Text variant="bodyLarge" style={styles.emptySubtitle}>
                        When you place orders, they will appear here
                    </Text>
                    <Button
                        mode="contained"
                        style={styles.shopButton}
                        contentStyle={styles.shopButtonContent}
                        labelStyle={styles.shopButtonLabel}
                        onPress={() => router.push('/(tabs)')}>
                        Start Shopping
                    </Button>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Orders</Text>
            </View>
            <FlatList
                data={displayOrders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
                showsVerticalScrollIndicator={true}
                bounces={true}
                alwaysBounceVertical={false}
                style={{ flex: 1 }}
            />
        </SafeAreaView>
    );
}