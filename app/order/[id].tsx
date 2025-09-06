import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBizTheme } from '../hooks/useBizTheme';

interface OrderStage {
    id: string;
    title: string;
    description: string;
    location?: string;
    timestamp: string;
    status: 'completed' | 'current' | 'upcoming';
}

export default function OrderDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const theme = useBizTheme();

    // Mock order data - in real app, fetch by ID
    const order = {
        id: id || '1',
        items: [
            {
                id: '1',
                name: 'Wireless Headphones',
                price: 199.99,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                quantity: 1,
                size: undefined,
                color: 'Black',
            },
            {
                id: '2',
                name: 'Running Shoes',
                price: 89.99,
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                quantity: 1,
                size: '9',
                color: 'Black',
            },
        ],
        total: 289.98,
        status: 'processing',
        createdAt: '2024-03-15T10:30:00Z',
        deliveryAddress: {
            street: '123 Main Street',
            city: 'Lagos',
            state: 'Lagos',
            zipCode: '100001',
            country: 'Nigeria',
        },
        paymentMethod: 'Paystack',
    };

    const orderStages: OrderStage[] = [
        {
            id: '1',
            title: 'Order Placed',
            description: 'Your order has been received',
            timestamp: 'Mar 15, 2024 • 10:30 AM',
            status: 'completed',
        },
        {
            id: '2',
            title: 'Payment Confirmed',
            description: 'Payment has been processed successfully',
            timestamp: 'Mar 15, 2024 • 10:32 AM',
            status: 'completed',
        },
        {
            id: '3',
            title: 'Processing',
            description: 'Your order is being prepared',
            location: 'Ikeja Shipping Centre',
            timestamp: 'Mar 15, 2024 • 2:15 PM',
            status: 'current',
        },
        {
            id: '4',
            title: 'Shipped',
            description: 'Your order is on its way',
            location: 'Lagos Distribution Hub',
            timestamp: 'Mar 16, 2024 • 9:00 AM',
            status: 'upcoming',
        },
        {
            id: '5',
            title: 'Out for Delivery',
            description: 'Your order is out for delivery',
            location: 'Lagos, Nigeria',
            timestamp: 'Mar 17, 2024 • 8:00 AM',
            status: 'upcoming',
        },
        {
            id: '6',
            title: 'Delivered',
            description: 'Your order has been delivered',
            location: '123 Main Street, Lagos',
            timestamp: 'Mar 17, 2024 • 2:30 PM',
            status: 'upcoming',
        },
    ];

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.empbizBackground,
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
        content: {
            flex: 1,
            paddingHorizontal: 24,
        },
        orderCard: {
            backgroundColor: 'white',
            borderRadius: 12,
            marginBottom: 16,
            overflow: 'hidden',
        },
        orderHeader: {
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.empbizIconGray,
        },
        orderNumber: {
            color: theme.colors.empbizBlack,
            fontWeight: '600',
            fontFamily: 'Inter',
            fontSize: 18,
            marginBottom: 4,
        },
        orderDate: {
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
            fontSize: 14,
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
        timelineCard: {
            backgroundColor: 'white',
            borderRadius: 12,
            marginBottom: 16,
            overflow: 'hidden',
        },
        timelineHeader: {
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.empbizIconGray,
        },
        timelineTitle: {
            color: theme.colors.empbizBlack,
            fontWeight: '600',
            fontFamily: 'Inter',
            fontSize: 16,
        },
        timelineContent: {
            padding: 16,
        },
        timelineItem: {
            flexDirection: 'row',
            marginBottom: 24,
        },
        timelineLeft: {
            width: 40,
            alignItems: 'center',
        },
        timelineDot: {
            width: 12,
            height: 12,
            borderRadius: 6,
            borderWidth: 2,
        },
        timelineLine: {
            width: 2,
            flex: 1,
            marginTop: 8,
        },
        timelineRight: {
            flex: 1,
            marginLeft: 16,
            paddingTop: 2,
        },
        timelineTitle: {
            color: theme.colors.empbizBlack,
            fontWeight: '600',
            fontFamily: 'Inter',
            fontSize: 14,
            marginBottom: 4,
        },
        timelineDescription: {
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
            fontSize: 13,
            marginBottom: 2,
        },
        timelineLocation: {
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
            fontSize: 12,
            fontStyle: 'italic',
            marginBottom: 4,
        },
        timelineTimestamp: {
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
            fontSize: 12,
        },
        etaCard: {
            backgroundColor: 'white',
            borderRadius: 12,
            marginBottom: 24,
            overflow: 'hidden',
        },
        etaHeader: {
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.empbizIconGray,
        },
        etaTitle: {
            color: theme.colors.empbizBlack,
            fontWeight: '600',
            fontFamily: 'Inter',
            fontSize: 16,
        },
        etaContent: {
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
        },
        etaIcon: {
            marginRight: 12,
        },
        etaText: {
            flex: 1,
        },
        etaLabel: {
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
            fontSize: 13,
            marginBottom: 2,
        },
        etaValue: {
            color: theme.colors.empbizBlack,
            fontWeight: '600',
            fontFamily: 'Inter',
            fontSize: 16,
        },
    });

    const getStageColor = (stage: OrderStage) => {
        switch (stage.status) {
            case 'completed':
                return theme.colors.empbizPrimary;
            case 'current':
                return theme.colors.empbizPrimary;
            case 'upcoming':
                return theme.colors.empbizIconGray;
            default:
                return theme.colors.empbizIconGray;
        }
    };

    const renderOrderItem = ({ item }: { item: any }) => (
        <View style={styles.orderItem} key={item.id}>
            <Image
                source={{ uri: item.image }}
                style={styles.orderItemImage}
                defaultSource={{ uri: 'https://via.placeholder.com/60x60/EBECF3/9CA1A4?text=IMG' }}
            />
            <View style={styles.orderItemDetails}>
                <Text style={styles.orderItemName}>
                    {item.name}
                </Text>
                <Text style={styles.orderItemPrice}>
                    Qty: {item.quantity} • ₦{item.price.toFixed(2)}
                </Text>
            </View>
        </View>
    );

    const renderTimelineItem = ({ item, index }: { item: OrderStage; index: number }) => (
        <View style={styles.timelineItem} key={item.id}>
            <View style={styles.timelineLeft}>
                <View style={[
                    styles.timelineDot,
                    {
                        backgroundColor: getStageColor(item),
                        borderColor: getStageColor(item),
                    }
                ]} />
                {index < orderStages.length - 1 && (
                    <View style={[
                        styles.timelineLine,
                        { backgroundColor: getStageColor(item) }
                    ]} />
                )}
            </View>
            <View style={styles.timelineRight}>
                <Text style={[
                    styles.timelineTitle,
                    { color: getStageColor(item) }
                ]}>
                    {item.title}
                </Text>
                <Text style={styles.timelineDescription}>
                    {item.description}
                </Text>
                {item.location && (
                    <Text style={styles.timelineLocation}>
                        📍 {item.location}
                    </Text>
                )}
                <Text style={styles.timelineTimestamp}>
                    {item.timestamp}
                </Text>
            </View>
        </View>
    );
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Button
                    mode="text"
                    icon="arrow-left"
                    onPress={() => router.back()}
                    style={styles.backButton}
                    textColor={theme.colors.empbizBlack}
                />
                <Text style={styles.headerTitle}>Order Details</Text>
            </View>

            <FlatList
                data={[1]} // Single item to render all sections
                renderItem={() => (
                    <>
                        {/* Order Summary */}
                        <View style={styles.orderCard}>
                            <View style={styles.orderHeader}>
                                <Text style={styles.orderNumber}>
                                    Order #{order.id}
                                </Text>
                                <Text style={styles.orderDate}>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </Text>
                            </View>
                            <View style={styles.orderContent}>
                                {order.items.map((item) => renderOrderItem({ item }))}
                            </View>
                            <View style={styles.orderTotal}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>₦{order.total.toFixed(2)}</Text>
                            </View>
                        </View>

                        {/* Timeline */}
                        <View style={styles.timelineCard}>
                            <View style={styles.timelineHeader}>
                                <Text style={styles.timelineTitle}>Order Timeline</Text>
                            </View>
                            <View style={styles.timelineContent}>
                                {orderStages.map((stage, index) => renderTimelineItem({ item: stage, index }))}
                            </View>
                        </View>

                        {/* Estimated Time of Arrival */}
                        <View style={styles.etaCard}>
                            <View style={styles.etaHeader}>
                                <Text style={styles.etaTitle}>Estimated Delivery</Text>
                            </View>
                            <View style={styles.etaContent}>
                                <MaterialIcons
                                    name="schedule"
                                    size={24}
                                    color={theme.colors.empbizPrimary}
                                    style={styles.etaIcon}
                                />
                                <View style={styles.etaText}>
                                    <Text style={styles.etaLabel}>Expected delivery time</Text>
                                    <Text style={styles.etaValue}>Mar 17, 2024 • 2:30 PM</Text>
                                </View>
                            </View>
                        </View>
                    </>
                )}
                keyExtractor={() => 'order-details'}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
                showsVerticalScrollIndicator={true}
                bounces={true}
                alwaysBounceVertical={false}
                style={{ flex: 1 }}
            />
        </SafeAreaView>
    );
}