import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList, Image, StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Divider,
    IconButton,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useBizTheme } from '../hooks/useBizTheme';
import { useCart, useRemoveFromCart, useUpdateCartItem } from '../hooks/useCart';
import { withOpacity } from '../theme/theme';
import { CartItem } from '../types';

export default function CartScreen() {
    const router = useRouter();
    const theme = useBizTheme();
    const { isAuthenticated, requireAuth } = useAuthGuard();
    const { data: cart, isLoading } = useCart();
    const updateCartItemMutation = useUpdateCartItem();
    const removeFromCartMutation = useRemoveFromCart();
    const [animatedValues] = useState(new Map<string, Animated.Value>());

    // Check authentication when component mounts
    useEffect(() => {
        if (!requireAuth('/(tabs)/cart')) {
            return;
        }
    }, [isAuthenticated]);

    // Don't render anything if not authenticated - the auth guard will redirect
    if (!isAuthenticated) {
        return null;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.empbizBackground,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.empbizBackground,
        },
        emptyContainer: {
            flex: 1,
            backgroundColor: theme.colors.empbizBackground,
        },
        emptyContent: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
        },
        emptyTitle: {
            marginTop: 24,
            marginBottom: 8,
            color: theme.colors.empbizBlack,
            fontWeight: '700',
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
        headerTitleContainer: {
            flex: 1,
        },
        headerTitle: {
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            fontFamily: 'Inter',
            fontSize: 20,
        },
        itemCount: {
            color: theme.colors.empbizTextDarkerGray,
            marginTop: 2,
            fontFamily: 'Inter',
            fontSize: 14,
        },
        cartList: {
            paddingHorizontal: 24,
        },
        cartItemContainer: {
            marginBottom: 8,
        },
        cartItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingVertical: 8,
        },
        itemImage: {
            width: 100,
            height: 100,
            borderRadius: 8,
            backgroundColor: theme.colors.empbizDarkerBackground,
        },
        itemDetails: {
            flex: 1,
            marginLeft: 12,
            height: 100, // Match image height
            justifyContent: 'space-between',
        },
        productInfo: {
            flex: 1,
        },
        itemName: {
            color: theme.colors.empbizBlack,
            fontFamily: 'Inter',
            fontWeight: '500',
            fontSize: 16,
            marginBottom: 4,
        },
        itemCategory: {
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
            fontWeight: '400',
            fontSize: 13,
            marginBottom: 4,
        },
        itemPrice: {
            color: theme.colors.empbizBlack,
            fontWeight: '600',
            fontFamily: 'Inter',
            fontSize: 18,
        },
        rightSection: {
            width: 60,
            height: 100, // Match image height
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },
        closeButton: {
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
        },
        quantityControls: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        quantityButton: {
            width: 36,
            height: 36,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        minusButton: {
            borderWidth: 1,
            borderColor: theme.colors.empbizIconGray,
            backgroundColor: theme.colors.empbizDarkerBackground,
        },
        plusButton: {
            borderWidth: 1,
            borderColor: theme.colors.empbizPrimary,
            backgroundColor: theme.colors.empbizDarkerBackground,
        },
        quantity: {
            color: theme.colors.empbizBlack,
            marginHorizontal: 3,
            fontFamily: 'Inter',
            fontWeight: '500',
            fontSize: 16,
            minWidth: 28,
            textAlign: 'center',
        },
        divider: {
            height: 1,
            backgroundColor: '#F1F2F2',
        },
        checkoutSection: {
            padding: 24,
            borderTopWidth: 1,
            borderTopColor: theme.colors.empbizIconGray,
            backgroundColor: theme.colors.surface,
        },
        summary: {
            marginBottom: 24,
        },
        summaryRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
        },
        summaryLabel: {
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
            fontSize: 16,
        },
        summaryValue: {
            color: theme.colors.empbizBlack,
            fontWeight: '600',
            fontFamily: 'Inter',
            fontSize: 16,
        },
        summaryDivider: {
            marginVertical: 12,
            backgroundColor: theme.colors.empbizIconGray,
        },
        totalLabel: {
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            fontFamily: 'Inter',
            fontSize: 18,
        },
        totalValue: {
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            fontFamily: 'Inter',
            fontSize: 18,
        },
        checkoutButton: {
            backgroundColor: theme.colors.empbizPrimary,
            borderRadius: 12,
        },
        checkoutButtonContent: {
            paddingVertical: 12,
        },
        checkoutButtonLabel: {
            color: 'white',
            fontFamily: 'Inter',
            fontWeight: '600',
            fontSize: 16,
        },
    });

    const getAnimatedValue = (itemId: string) => {
        if (!animatedValues.has(itemId)) {
            animatedValues.set(itemId, new Animated.Value(1));
        }
        return animatedValues.get(itemId)!;
    };

    const handleUpdateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveItem(itemId);
        } else {
            updateCartItemMutation.mutate({ itemId, quantity });
        }
    };

    const handleRemoveItem = (itemId: string) => {
        const animatedValue = getAnimatedValue(itemId);

        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            removeFromCartMutation.mutate(itemId);
        });
    };

    const renderCartItem = ({ item }: { item: CartItem }) => {
        const animatedValue = getAnimatedValue(item.id);

        return (
            <Animated.View
                style={[
                    styles.cartItemContainer,
                    {
                        opacity: animatedValue,
                        transform: [
                            {
                                scaleY: animatedValue,
                            },
                        ],
                    },
                ]}
            >
                <View style={styles.cartItem}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />

                    <View style={styles.itemDetails}>
                        <View style={styles.productInfo}>
                            <Text numberOfLines={2} style={styles.itemName}>
                                {item.name}
                            </Text>

                            <Text style={styles.itemCategory}>
                                {item.category}
                            </Text>
                        </View>

                        <Text style={styles.itemPrice}>
                            ${item.price.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.rightSection}>
                        <TouchableRipple
                            style={styles.closeButton}
                            onPress={() => handleRemoveItem(item.id)}
                            rippleColor={withOpacity('#727993', 0.3)}>
                            <MaterialIcons name="close" size={20} color="#727993" />
                        </TouchableRipple>

                        <View style={styles.quantityControls}>
                            <TouchableRipple
                                style={[styles.quantityButton, styles.minusButton]}
                                onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                rippleColor={withOpacity('#D9D9D9', 0.3)}>
                                <MaterialIcons name="remove" size={16} color="#727993" />
                            </TouchableRipple>

                            <Text style={styles.quantity}>
                                {item.quantity}
                            </Text>

                            <TouchableRipple
                                style={[styles.quantityButton, styles.plusButton]}
                                onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                rippleColor={withOpacity('#00D073', 0.3)}>
                                <MaterialIcons name="add" size={16} color="#00D073" />
                            </TouchableRipple>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />
            </Animated.View>
        );
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.empbizPrimary} />
            </SafeAreaView>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <View style={styles.header}>
                    <IconButton
                        icon="arrow-left"
                        size={24}
                        iconColor={theme.colors.empbizBlack}
                        style={styles.backButton}
                        onPress={() => router.back()}
                    />
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>Shopping Cart</Text>
                        <Text style={styles.itemCount}>0 items</Text>
                    </View>
                </View>

                <View style={styles.emptyContent}>
                    <MaterialIcons name="shopping-bag" size={80} color={theme.colors.empbizIconGray} />
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
                <IconButton
                    icon="arrow-left"
                    size={24}
                    iconColor={theme.colors.empbizBlack}
                    style={styles.backButton}
                    onPress={() => router.back()}
                />
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Shopping Cart</Text>
                    <Text style={styles.itemCount}>
                        {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
                    </Text>
                </View>
            </View>

            <FlatList
                data={cart.items}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.cartList}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.checkoutSection}>
                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Subtotal
                        </Text>
                        <Text style={styles.summaryValue}>
                            ${cart.total.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Shipping
                        </Text>
                        <Text style={styles.summaryValue}>
                            Free
                        </Text>
                    </View>

                    <Divider style={styles.summaryDivider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>
                            Total
                        </Text>
                        <Text style={styles.totalValue}>
                            ${cart.total.toFixed(2)}
                        </Text>
                    </View>
                </View>

                <Button
                    mode="contained"
                    style={styles.checkoutButton}
                    contentStyle={styles.checkoutButtonContent}
                    labelStyle={styles.checkoutButtonLabel}
                    onPress={() => router.push('/checkout')}>
                    Checkout
                </Button>
            </View>
        </SafeAreaView>
    );
} 