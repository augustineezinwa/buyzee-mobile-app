import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Chip,
    Searchbar,
    Text,
    TouchableRipple,
    useTheme
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCategories, useFeaturedProducts } from '../hooks/useProducts';
import { Product } from '../types';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 48 - 16) / 2;

export default function HomeScreen() {
    const router = useRouter();
    const theme = useTheme();
    const { data: featuredProducts, isLoading: loadingProducts } = useFeaturedProducts();
    const { data: categories, isLoading: loadingCategories } = useCategories();
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push('/search');
        }
    };

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
        header: {
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: 24,
        },
        headerContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
        },
        greeting: {
            fontWeight: '700',
            color: theme.colors.onBackground,
        },
        subtitle: {
            color: theme.colors.onSurfaceVariant,
            marginTop: 4,
        },
        profileButton: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: theme.colors.surfaceVariant,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.outline,
        },
        searchBar: {
            backgroundColor: theme.colors.surfaceVariant,
            elevation: 0,
            borderWidth: 1,
            borderColor: theme.colors.outline,
        },
        searchInput: {
            fontSize: 16,
            color: theme.colors.onSurface,
        },
        section: {
            marginBottom: 32,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
            marginBottom: 16,
        },
        sectionTitle: {
            fontWeight: '700',
            color: theme.colors.onBackground,
        },
        viewAllText: {
            color: theme.colors.onSurfaceVariant,
            fontSize: 14,
        },
        categoriesList: {
            paddingLeft: 24,
        },
        categoryChip: {
            marginRight: 12,
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
        },
        categoryText: {
            color: theme.colors.onSurface,
            fontWeight: '500',
        },
        productsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 24,
            gap: 16,
        },
        productWrapper: {
            width: PRODUCT_WIDTH,
            marginBottom: 20,
        },
        productCard: {
            backgroundColor: theme.colors.surface,
            borderRadius: 16,
            overflow: 'hidden',
        },
        productImageContainer: {
            position: 'relative',
            backgroundColor: theme.colors.surfaceVariant,
        },
        productImage: {
            width: '100%',
            height: 180,
            resizeMode: 'cover',
        },
        saleTag: {
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
        },
        saleText: {
            color: theme.colors.onPrimary,
            fontSize: 10,
            fontWeight: '700',
        },
        productInfo: {
            padding: 16,
        },
        productName: {
            color: theme.colors.onSurface,
            marginBottom: 8,
            minHeight: 40,
            fontWeight: '500',
        },
        priceRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        price: {
            color: theme.colors.onSurface,
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
        },
        rating: {
            color: theme.colors.onSurfaceVariant,
            marginLeft: 4,
        },
        quickActions: {
            flexDirection: 'row',
            paddingHorizontal: 24,
            gap: 16,
            marginBottom: 32,
        },
        actionCard: {
            flex: 1,
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: theme.colors.outline,
        },
        actionContent: {
            alignItems: 'center',
        },
        actionText: {
            color: theme.colors.onSurfaceVariant,
            marginTop: 8,
            fontWeight: '500',
        },
        loader: {
            margin: 20,
        },
        bottomPadding: {
            height: 20,
        },
    });

    const renderProduct = ({ item }: { item: Product }) => (
        <TouchableRipple
            style={styles.productCard}
            onPress={() => router.push(`/product/${item.id}`)}
            rippleColor={theme.colors.primary + '1A'}>
            <View>
                <View style={styles.productImageContainer}>
                    <Image source={{ uri: item.images[0] }} style={styles.productImage} />
                    {item.originalPrice && (
                        <View style={styles.saleTag}>
                            <Text style={styles.saleText}>SALE</Text>
                        </View>
                    )}
                </View>
                <View style={styles.productInfo}>
                    <Text variant="bodyMedium" numberOfLines={2} style={styles.productName}>
                        {item.name}
                    </Text>
                    <View style={styles.priceRow}>
                        <Text variant="titleMedium" style={styles.price}>
                            ${item.price}
                        </Text>
                        {item.originalPrice && (
                            <Text variant="bodySmall" style={styles.originalPrice}>
                                ${item.originalPrice}
                            </Text>
                        )}
                    </View>
                    <View style={styles.ratingRow}>
                        <MaterialIcons name="star" size={16} color={theme.colors.primary} />
                        <Text variant="bodySmall" style={styles.rating}>
                            {item.rating}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableRipple>
    );

    const renderCategory = ({ item }: { item: string }) => (
        <Chip
            mode="outlined"
            style={styles.categoryChip}
            textStyle={styles.categoryText}
            onPress={() => router.push(`/categories/${item}`)}>
            {item}
        </Chip>
    );

    if (loadingProducts && loadingCategories) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View>
                            <Text variant="headlineSmall" style={styles.greeting}>
                                Good morning
                            </Text>
                            <Text variant="bodyLarge" style={styles.subtitle}>
                                What are you looking for?
                            </Text>
                        </View>
                        <TouchableRipple
                            style={styles.profileButton}
                            onPress={() => router.push('/(tabs)/profile')}
                            rippleColor={theme.colors.primary + '1A'}>
                            <MaterialIcons name="person-outline" size={24} color={theme.colors.onSurface} />
                        </TouchableRipple>
                    </View>

                    <Searchbar
                        placeholder="Search products..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        onSubmitEditing={handleSearch}
                        onIconPress={handleSearch}
                        style={styles.searchBar}
                        inputStyle={styles.searchInput}
                        iconColor={theme.colors.onSurfaceVariant}
                    />
                </View>

                {/* Categories */}
                {categories && categories.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text variant="titleLarge" style={styles.sectionTitle}>
                                Categories
                            </Text>
                        </View>
                        <FlatList
                            data={categories}
                            renderItem={renderCategory}
                            keyExtractor={(item) => item}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoriesList}
                        />
                    </View>
                )}

                {/* Featured Products */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text variant="titleLarge" style={styles.sectionTitle}>
                            Featured
                        </Text>
                        <Button
                            mode="text"
                            onPress={() => router.push('/search')}
                            labelStyle={styles.viewAllText}>
                            View All
                        </Button>
                    </View>

                    {loadingProducts ? (
                        <ActivityIndicator style={styles.loader} color={theme.colors.primary} />
                    ) : (
                        <View style={styles.productsGrid}>
                            {featuredProducts?.map((product) => (
                                <View key={product.id} style={styles.productWrapper}>
                                    {renderProduct({ item: product })}
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableRipple
                        style={styles.actionCard}
                        onPress={() => router.push('/(tabs)/orders')}
                        rippleColor={theme.colors.primary + '1A'}>
                        <View style={styles.actionContent}>
                            <MaterialIcons name="local-shipping" size={24} color={theme.colors.onSurface} />
                            <Text variant="bodyMedium" style={styles.actionText}>
                                My Orders
                            </Text>
                        </View>
                    </TouchableRipple>

                    <TouchableRipple
                        style={styles.actionCard}
                        onPress={() => router.push('/(tabs)/cart')}
                        rippleColor={theme.colors.primary + '1A'}>
                        <View style={styles.actionContent}>
                            <MaterialIcons name="shopping-bag" size={24} color={theme.colors.onSurface} />
                            <Text variant="bodyMedium" style={styles.actionText}>
                                My Cart
                            </Text>
                        </View>
                    </TouchableRipple>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>
        </SafeAreaView>
    );
}
