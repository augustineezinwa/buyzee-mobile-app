import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Divider,
    Text,
    TouchableRipple,
    useTheme
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart, useRemoveFromCart, useUpdateCartItem } from '../hooks/useCart';
import { CartItem } from '../types';

export default function CartScreen() {
    const router = useRouter();
    const theme = useTheme();
    const { data: cart, isLoading } = useCart();
    const updateCartItemMutation = useUpdateCartItem();
    const removeFromCartMutation = useRemoveFromCart();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.background,
        },
        emptyContainer: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        emptyContent: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        emptyTitle: {
            marginTop: 24,
            marginBottom: 8,
            color: theme.colors.onBackground,
            fontWeight: '700',
        },
        emptySubtitle: {
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            marginBottom: 32,
        },
        shopButton: {
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
        },
        shopButtonContent: {
            paddingVertical: 8,
        },
        header: {
            padding: 20,
        },
        headerTitle: {
            color: theme.colors.onBackground,
            fontWeight: '700',
        },
        itemCount: {
            color: theme.colors.onSurfaceVariant,
            marginTop: 4,
        },
        cartList: {
            padding: 20,
        },
        cartItem: {
            flexDirection: 'row',
            marginBottom: 20,
        },
        itemImage: {
            width: 100,
            height: 100,
            borderRadius: 12,
            backgroundColor: theme.colors.surfaceVariant,
        },
        itemDetails: {
            flex: 1,
            marginLeft: 16,
        },
        itemName: {
            color: theme.colors.onSurface,
            marginBottom: 4,
        },
        variants: {
            flexDirection: 'row',
            marginBottom: 8,
        },
        variant: {
            color: theme.colors.onSurfaceVariant,
            marginRight: 12,
        },
        itemPrice: {
            color: theme.colors.onSurface,
            fontWeight: '700',
        },
        quantitySection: {
            alignItems: 'flex-end',
            justifyContent: 'space-between',
        },
        quantityControls: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: 8,
            padding: 4,
        },
        quantityButton: {
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
        },
        quantity: {
            color: theme.colors.onSurface,
            marginHorizontal: 12,
        },
        removeButton: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
        },
        separator: {
            height: 1,
            backgroundColor: theme.colors.outline,
            marginVertical: 20,
        },
        checkoutSection: {
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: theme.colors.outline,
            backgroundColor: theme.colors.surface,
        },
        summary: {
            marginBottom: 20,
        },
        summaryRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
        },
        summaryLabel: {
            color: theme.colors.onSurfaceVariant,
        },
        summaryValue: {
            color: theme.colors.onSurface,
            fontWeight: '500',
        },
        divider: {
            marginVertical: 12,
            backgroundColor: theme.colors.outline,
        },
        totalLabel: {
            color: theme.colors.onSurface,
            fontWeight: '700',
        },
        totalValue: {
            color: theme.colors.onSurface,
            fontWeight: '700',
        },
        checkoutButton: {
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
        },
        checkoutButtonContent: {
            paddingVertical: 8,
        },
    });

    const handleUpdateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCartMutation.mutate(itemId);
        } else {
            updateCartItemMutation.mutate({ itemId, quantity });
        }
    };

    const handleRemoveItem = (itemId: string) => {
        removeFromCartMutation.mutate(itemId);
    };

    const renderCartItem = ({ item }: { item: CartItem }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />

            <View style={styles.itemDetails}>
                <Text variant="bodyLarge" numberOfLines={2} style={styles.itemName}>
                    {item.name}
                </Text>

                {(item.size || item.color) && (
                    <View style={styles.variants}>
                        {item.size && (
                            <Text variant="bodySmall" style={styles.variant}>
                                Size: {item.size}
                            </Text>
                        )}
                        {item.color && (
                            <Text variant="bodySmall" style={styles.variant}>
                                Color: {item.color}
                            </Text>
                        )}
                    </View>
                )}

                <Text variant="titleMedium" style={styles.itemPrice}>
                    ${item.price}
                </Text>
            </View>

            <View style={styles.quantitySection}>
                <View style={styles.quantityControls}>
                    <TouchableRipple
                        style={styles.quantityButton}
                        onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        rippleColor={theme.colors.primary + '1A'}>
                        <MaterialIcons name="remove" size={16} color={theme.colors.onSurface} />
                    </TouchableRipple>

                    <Text variant="bodyLarge" style={styles.quantity}>
                        {item.quantity}
                    </Text>

                    <TouchableRipple
                        style={styles.quantityButton}
                        onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        rippleColor={theme.colors.primary + '1A'}>
                        <MaterialIcons name="add" size={16} color={theme.colors.onSurface} />
                    </TouchableRipple>
                </View>

                <TouchableRipple
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id)}
                    rippleColor={theme.colors.error + '1A'}>
                    <MaterialIcons name="delete-outline" size={20} color={theme.colors.error} />
                </TouchableRipple>
            </View>
        </View>
    );

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </SafeAreaView>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <View style={styles.emptyContent}>
                    <MaterialIcons name="shopping-bag" size={80} color={theme.colors.outline} />
                    <Text variant="headlineSmall" style={styles.emptyTitle}>
                        Your cart is empty
                    </Text>
                    <Text variant="bodyLarge" style={styles.emptySubtitle}>
                        Add some products to get started
                    </Text>
                    <Button
                        mode="contained"
                        style={styles.shopButton}
                        contentStyle={styles.shopButtonContent}
                        onPress={() => router.push('/(tabs)')}>
                        Start Shopping
                    </Button>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text variant="headlineSmall" style={styles.headerTitle}>
                    Shopping Cart
                </Text>
                <Text variant="bodyMedium" style={styles.itemCount}>
                    {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
                </Text>
            </View>

            <FlatList
                data={cart.items}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.cartList}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

            <View style={styles.checkoutSection}>
                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text variant="bodyLarge" style={styles.summaryLabel}>
                            Subtotal
                        </Text>
                        <Text variant="bodyLarge" style={styles.summaryValue}>
                            ${cart.total.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text variant="bodyLarge" style={styles.summaryLabel}>
                            Shipping
                        </Text>
                        <Text variant="bodyLarge" style={styles.summaryValue}>
                            Free
                        </Text>
                    </View>

                    <Divider style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text variant="titleLarge" style={styles.totalLabel}>
                            Total
                        </Text>
                        <Text variant="titleLarge" style={styles.totalValue}>
                            ${cart.total.toFixed(2)}
                        </Text>
                    </View>
                </View>

                <Button
                    mode="contained"
                    style={styles.checkoutButton}
                    contentStyle={styles.checkoutButtonContent}
                    onPress={() => router.push('/checkout')}>
                    Checkout
                </Button>
            </View>
        </SafeAreaView>
    );
} 