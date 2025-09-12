import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Chip,
    Divider,
    Snackbar,
    Text,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useBizTheme } from '../hooks/useBizTheme';
import { useAddToCart } from '../hooks/useCart';
import { useProduct } from '../hooks/useProducts';

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const theme = useBizTheme();
    const { data: product, isLoading } = useProduct(id as string);
    const addToCartMutation = useAddToCart();
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const { isAuthenticated, requireAuth } = useAuthGuard();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.empbizBackground,
        },
        scrollContent: {
            flexGrow: 1,
        },
        imageContainer: {
            width: width,
            height: width,
            backgroundColor: theme.colors.empbizDarkerBackground,
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        imageSlider: {
            position: 'relative',
        },
        paginationContainer: {
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
        },
        paginationDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.colors.empbizIconGray,
            marginHorizontal: 4,
        },
        paginationDotActive: {
            backgroundColor: theme.colors.empbizPrimary,
            width: 12,
            height: 12,
            borderRadius: 6,
        },
        content: {
            padding: 24,
        },
        header: {
            marginBottom: 24,
        },
        title: {
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            marginBottom: 8,
            fontFamily: 'Inter',
        },
        description: {
            color: theme.colors.empbizTextDarkerGray,
            marginBottom: 16,
            fontFamily: 'Inter',
        },
        priceRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
        },
        price: {
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            marginRight: 8,
            fontFamily: 'Inter',
        },
        originalPrice: {
            textDecorationLine: 'line-through',
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
        },
        ratingRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
        },
        rating: {
            color: theme.colors.empbizTextDarkerGray,
            marginLeft: 4,
            fontFamily: 'Inter',
        },
        reviewCount: {
            color: theme.colors.empbizTextDarkerGray,
            marginLeft: 8,
            fontFamily: 'Inter',
        },
        section: {
            marginBottom: 24,
        },
        sectionTitle: {
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            marginBottom: 16,
            fontFamily: 'Inter',
        },
        colorsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 16,
        },
        colorChip: {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.empbizIconGray,
        },
        colorChipSelected: {
            backgroundColor: theme.colors.empbizSecondary,
            borderColor: theme.colors.empbizPrimary,
        },
        colorChipText: {
            color: theme.colors.empbizBlack,
            fontFamily: 'Inter',
        },
        colorChipTextSelected: {
            color: theme.colors.empbizBlack,
            fontFamily: 'Inter',
        },
        sizesContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
        },
        sizeChip: {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.empbizIconGray,
        },
        divider: {
            marginVertical: 24,
            backgroundColor: theme.colors.empbizIconGray,
        },
        bottomBar: {
            padding: 24,
            paddingBottom: 60,
            backgroundColor: theme.colors.surface,
            borderTopWidth: 1,
            borderTopColor: theme.colors.empbizIconGray,
        },
        addButton: {
            backgroundColor: theme.colors.empbizPrimary,
            borderRadius: 12,
        },
        buttonContent: {
            paddingVertical: 8,
        },
        buttonLabel: {
            color: 'white',
            fontFamily: 'Inter',
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.empbizBackground,
        },
    });

    const handleAddToCart = () => {
        if (!product) return;

        // Check authentication first
        if (!requireAuth(`/product/${id}`)) {
            return;
        }

        // Check if product has colors and require selection
        if (product.colors && product.colors.length > 0 && !selectedColor) {
            return;
        }

        // Check if product has sizes and require selection  
        if (product.sizes && product.sizes.length > 0 && !selectedSize) {
            return;
        }

        addToCartMutation.mutate({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[currentImageIndex],
            color: selectedColor || undefined,
            size: selectedSize || undefined,
            quantity: 1,
            category: product.category,
        }, {
            onSuccess: () => {
                setShowSuccessSnackbar(true);
            },
            onError: (error) => {
                console.error('Failed to add to cart:', error);
            }
        });
    };

    const isAddToCartDisabled = () => {
        if (!product) return true;

        // If product has colors, color must be selected
        if (product.colors && product.colors.length > 0 && !selectedColor) {
            return true;
        }

        // If product has sizes, size must be selected
        if (product.sizes && product.sizes.length > 0 && !selectedSize) {
            return true;
        }

        return addToCartMutation.isPending;
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.empbizPrimary} />
                </View>
            </SafeAreaView>
        );
    }

    if (!product) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <View style={styles.imageSlider}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(event) => {
                            const newIndex = Math.round(
                                event.nativeEvent.contentOffset.x / width
                            );
                            setCurrentImageIndex(newIndex);
                        }}>
                        {product.images.map((image, index) => (
                            <View key={index} style={styles.imageContainer}>
                                <Image source={{ uri: image }} style={styles.image} />
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.paginationContainer}>
                        {product.images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    currentImageIndex === index && styles.paginationDotActive,
                                ]}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text variant="headlineMedium" style={styles.title}>
                            {product.name}
                        </Text>
                        <Text variant="bodyLarge" style={styles.description}>
                            {product.description}
                        </Text>

                        <View style={styles.priceRow}>
                            <Text variant="headlineSmall" style={styles.price}>
                                ${product.price}
                            </Text>
                            {product.originalPrice && (
                                <Text variant="titleMedium" style={styles.originalPrice}>
                                    ${product.originalPrice}
                                </Text>
                            )}
                        </View>

                        <View style={styles.ratingRow}>
                            <MaterialIcons name="star" size={20} color={theme.colors.empbizPrimary} />
                            <Text variant="titleMedium" style={styles.rating}>
                                {product.rating}
                            </Text>
                            <Text variant="bodyMedium" style={styles.reviewCount}>
                                ({product.reviewCount} reviews)
                            </Text>
                        </View>
                    </View>

                    {product.colors && product.colors.length > 0 && (
                        <View style={styles.section}>
                            <Text variant="titleMedium" style={styles.sectionTitle}>
                                Color
                            </Text>
                            <View style={styles.colorsContainer}>
                                {product.colors.map((color) => (
                                    <Chip
                                        key={color}
                                        selected={selectedColor === color}
                                        onPress={() => setSelectedColor(color)}
                                        style={[
                                            styles.colorChip,
                                            selectedColor === color && styles.colorChipSelected,
                                        ]}
                                        textStyle={[
                                            styles.colorChipText,
                                            selectedColor === color && styles.colorChipTextSelected,
                                        ]}
                                        showSelectedOverlay>
                                        {color}
                                    </Chip>
                                ))}
                            </View>
                        </View>
                    )}

                    {product.sizes && product.sizes.length > 0 && (
                        <View style={styles.section}>
                            <Text variant="titleMedium" style={styles.sectionTitle}>
                                Size
                            </Text>
                            <View style={styles.sizesContainer}>
                                {product.sizes.map((size) => (
                                    <Chip
                                        key={size}
                                        selected={selectedSize === size}
                                        onPress={() => setSelectedSize(size)}
                                        style={[
                                            styles.sizeChip,
                                            selectedSize === size && styles.colorChipSelected,
                                        ]}
                                        textStyle={[
                                            styles.colorChipText,
                                            selectedSize === size && styles.colorChipTextSelected,
                                        ]}
                                        showSelectedOverlay>
                                        {size}
                                    </Chip>
                                ))}
                            </View>
                        </View>
                    )}

                    <Divider style={styles.divider} />

                    <View style={styles.section}>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Description
                        </Text>
                        <Text variant="bodyLarge" style={styles.description}>
                            {product.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <Button
                    mode="contained"
                    onPress={handleAddToCart}
                    style={styles.addButton}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    disabled={isAddToCartDisabled()}
                    loading={addToCartMutation.isPending}>
                    Add to Cart
                </Button>
            </View>

            <Snackbar
                visible={showSuccessSnackbar}
                onDismiss={() => setShowSuccessSnackbar(false)}
                duration={3000}
                action={{
                    label: 'View Cart',
                    onPress: () => {
                        setShowSuccessSnackbar(false);
                        router.push('/(tabs)/cart');
                    },
                }}>
                Item added to cart!
            </Snackbar>
        </SafeAreaView>
    );
};

export default ProductDetailScreen; 