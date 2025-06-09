import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Chip,
    Divider,
    Text,
    useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAddToCart } from '../hooks/useCart';
import { useProduct } from '../hooks/useProducts';

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const theme = useTheme();
    const { data: product, isLoading } = useProduct(id as string);
    const addToCartMutation = useAddToCart();
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        scrollContent: {
            flexGrow: 1,
        },
        imageContainer: {
            width: width,
            height: width,
            backgroundColor: theme.colors.surfaceVariant,
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
            backgroundColor: theme.colors.onSurfaceVariant,
            marginHorizontal: 4,
        },
        paginationDotActive: {
            backgroundColor: theme.colors.primary,
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
            color: theme.colors.onBackground,
            fontWeight: '700',
            marginBottom: 8,
        },
        description: {
            color: theme.colors.onSurfaceVariant,
            marginBottom: 16,
        },
        priceRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
        },
        price: {
            color: theme.colors.onBackground,
            fontWeight: '700',
            marginRight: 8,
        },
        originalPrice: {
            textDecorationLine: 'line-through',
            color: theme.colors.onSurfaceVariant,
        },
        ratingRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
        },
        rating: {
            color: theme.colors.onSurfaceVariant,
            marginLeft: 4,
        },
        reviewCount: {
            color: theme.colors.onSurfaceVariant,
            marginLeft: 8,
        },
        section: {
            marginBottom: 24,
        },
        sectionTitle: {
            color: theme.colors.onBackground,
            fontWeight: '700',
            marginBottom: 16,
        },
        colorsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 16,
        },
        colorChip: {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
        },
        colorChipSelected: {
            backgroundColor: theme.colors.primaryContainer,
            borderColor: theme.colors.primary,
        },
        colorChipText: {
            color: theme.colors.onSurface,
        },
        colorChipTextSelected: {
            color: theme.colors.onPrimaryContainer,
        },
        sizesContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
        },
        sizeChip: {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
        },
        divider: {
            marginVertical: 24,
            backgroundColor: theme.colors.outline,
        },
        bottomBar: {
            padding: 24,
            backgroundColor: theme.colors.surface,
            borderTopWidth: 1,
            borderTopColor: theme.colors.outline,
        },
        addButton: {
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
        },
        buttonContent: {
            paddingVertical: 8,
        },
        buttonLabel: {
            color: theme.colors.onPrimary,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.background,
        },
    });

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            return;
        }

        addToCartMutation.mutate({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[currentImageIndex],
            color: selectedColor,
            size: selectedSize,
            quantity: 1,
        });
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
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
                            <MaterialIcons name="star" size={20} color={theme.colors.primary} />
                            <Text variant="titleMedium" style={styles.rating}>
                                {product.rating}
                            </Text>
                            <Text variant="bodyMedium" style={styles.reviewCount}>
                                ({product.reviewCount} reviews)
                            </Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Color
                        </Text>
                        <View style={styles.colorsContainer}>
                            {product.colors?.map((color) => (
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

                    <View style={styles.section}>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Size
                        </Text>
                        <View style={styles.sizesContainer}>
                            {product.sizes?.map((size) => (
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
                    disabled={!selectedColor || !selectedSize || addToCartMutation.isPending}
                    loading={addToCartMutation.isPending}>
                    Add to Cart
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetailScreen; 