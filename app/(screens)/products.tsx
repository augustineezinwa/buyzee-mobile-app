import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
    Chip,
    Searchbar,
    Text,
    TouchableRipple
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBizTheme } from '../hooks/useBizTheme';
import { useProducts, useProductsByCategory } from '../hooks/useProducts';
import { withOpacity } from '../theme/theme';
import { Product } from '../types';

const { width } = Dimensions.get('window');
const SCREEN_PADDING = 4;
const CARD_GAP = 8;
const PRODUCT_WIDTH = (width - (SCREEN_PADDING * 2) - CARD_GAP) / 2;
const PRODUCT_CARD_PADDING = 12;
const PRODUCT_CARD_BORDER_RADIUS = 5;

export default function ProductsScreen() {
    const router = useRouter();
    const theme = useBizTheme();
    const { category } = useLocalSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(category as string || 'All');

    // Use category-specific products if category is provided, otherwise use all products
    const { data: products, isLoading } = category && category !== 'All'
        ? useProductsByCategory(category as string)
        : useProducts();

    const categories = ['All', 'Food items', 'Clothes', 'Foot wears', 'Bags'];

    // Create masonry layout by distributing products to columns
    const createMasonryLayout = (products: Product[]) => {
        const leftColumn: Product[] = [];
        const rightColumn: Product[] = [];

        // Estimate heights and distribute to shortest column
        let leftHeight = 0;
        let rightHeight = 0;

        products.forEach((product) => {
            // Estimate card height based on content
            const imageHeight = PRODUCT_WIDTH * 0.75;
            const textHeight = 100; // Approximate height for text content
            const estimatedHeight = imageHeight + textHeight + PRODUCT_CARD_PADDING * 2;

            // Add to shorter column
            if (leftHeight <= rightHeight) {
                leftColumn.push(product);
                leftHeight += estimatedHeight + CARD_GAP;
            } else {
                rightColumn.push(product);
                rightHeight += estimatedHeight + CARD_GAP;
            }
        });

        return { leftColumn, rightColumn };
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push('/search');
        }
    };

    const handleCategoryPress = (selectedCat: string) => {
        setSelectedCategory(selectedCat);
        if (selectedCat === 'All') {
            router.replace('/(screens)/products');
        } else {
            router.replace(`/(screens)/products?category=${selectedCat}`);
        }
    };

    const renderProduct = (item: Product) => (
        <TouchableRipple
            key={item.id}
            style={styles.productWrapper}
            onPress={() => router.push(`/product/${item.id}`)}
            rippleColor={withOpacity(theme.colors.empbizPrimary, 0.1)}>
            <View style={styles.productCard}>
                <View style={styles.productImageContainer}>
                    <Image source={{ uri: item.images[0] }} style={styles.productImage} />
                    <TouchableRipple
                        style={styles.favoriteButton}
                        onPress={() => { }}
                        rippleColor={withOpacity(theme.colors.empbizPrimary, 0.1)}>
                        <MaterialIcons name="favorite-border" size={20} color="white" />
                    </TouchableRipple>
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>
                        {item.name}
                    </Text>
                    <Text style={styles.productDescription} numberOfLines={2}>
                        {item.description}
                    </Text>
                    <Text style={styles.productPrice}>
                        N{item.price.toLocaleString()}
                    </Text>
                </View>
            </View>
        </TouchableRipple>
    );

    const renderCategory = ({ item }: { item: string }) => (
        <Chip
            mode="outlined"
            style={[
                styles.categoryChip,
                { backgroundColor: selectedCategory === item ? theme.colors.empbizPrimary : theme.colors.empbizSecondary }
            ]}
            textStyle={[
                styles.categoryText,
                { color: selectedCategory === item ? 'white' : theme.colors.empbizBlack }
            ]}
            onPress={() => handleCategoryPress(item)}>
            {item}
        </Chip>
    );

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
        backButton: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: theme.colors.empbizSecondary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            color: theme.colors.empbizBlack,
            fontWeight: '500',
            fontSize: 20,
            fontFamily: 'Inter',
        },
        searchBar: {
            backgroundColor: theme.colors.empbizDarkerBackground,
            elevation: 0,
            borderRadius: 5,
        },
        searchInput: {
            fontSize: 16,
            color: theme.colors.empbizTextDarkerGray,
            fontFamily: 'Inter',
        },
        section: {
            marginTop: 16,
            marginBottom: 16,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
            marginBottom: 16,
        },
        sectionTitle: {
            color: theme.colors.empbizBlack,
            fontWeight: '500',
            fontSize: 20,
            fontFamily: 'Inter',
        },
        categoriesList: {
            paddingLeft: 24,
        },
        categoryChip: {
            marginRight: 12,
            padding: 1.5,
            height: 36,
            backgroundColor: selectedCategory === 'All' ? theme.colors.empbizPrimary : theme.colors.empbizSecondary,
            borderColor: theme.colors.empbizSecondary,
        },
        categoryText: {
            color: selectedCategory === 'All' ? 'white' : theme.colors.empbizBlack,
            fontWeight: '400',
            fontFamily: 'Inter',
            fontSize: 16,
        },
        masonryContainer: {
            flexDirection: 'row',
            paddingHorizontal: SCREEN_PADDING,
            paddingBottom: 400,
        },
        column: {
            flex: 1,
        },
        leftColumn: {
            marginRight: CARD_GAP / 2,
        },
        rightColumn: {
            marginLeft: CARD_GAP / 2,
        },
        productWrapper: {
            width: '100%',
            marginBottom: CARD_GAP,
        },
        productCard: {
            backgroundColor: 'white',
            borderRadius: PRODUCT_CARD_BORDER_RADIUS,
            overflow: 'hidden',
        },
        productImageContainer: {
            position: 'relative',
            width: '100%',
            height: PRODUCT_WIDTH * 0.75,
            borderRadius: PRODUCT_CARD_BORDER_RADIUS,
            overflow: 'hidden',
        },
        productImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        favoriteButton: {
            position: 'absolute',
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: theme.colors.empbizIconGray,
            justifyContent: 'center',
            alignItems: 'center',
        },
        productInfo: {
            padding: PRODUCT_CARD_PADDING,
        },
        productName: {
            color: theme.colors.empbizBlack,
            fontWeight: '500',
            fontFamily: 'Inter',
            fontSize: 18,
            marginBottom: 8,
        },
        productDescription: {
            color: theme.colors.empbizTextGray,
            fontWeight: '400',
            fontFamily: 'Inter',
            marginBottom: 13,
        },
        productPrice: {
            color: theme.colors.empbizBlack,
            fontWeight: '500',
            fontFamily: 'Inter',
            fontSize: 18,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
            marginTop: -60,
        },
        emptyIcon: {
            marginBottom: 16,
        },
        emptyTitle: {
            color: theme.colors.empbizBlack,
            fontWeight: '500',
            marginBottom: 8,
            textAlign: 'center',
            fontFamily: 'Inter',
            fontSize: 20,
        },
        emptySubtitle: {
            color: theme.colors.empbizTextDarkerGray,
            textAlign: 'center',
            fontFamily: 'Inter',
            fontSize: 16,
        },
    });

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.empbizPrimary} />
            </View>
        );
    }

    const { leftColumn, rightColumn } = products ? createMasonryLayout(products) : { leftColumn: [], rightColumn: [] };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <TouchableRipple
                            style={styles.backButton}
                            onPress={() => router.back()}
                            rippleColor={withOpacity(theme.colors.empbizPrimary, 0.1)}>
                            <MaterialIcons name="arrow-back" size={24} color={theme.colors.empbizBlack} />
                        </TouchableRipple>
                        <Text style={styles.title}>
                            {category && category !== 'All' ? category : 'All Products'}
                        </Text>
                        <View style={{ width: 44 }} />
                    </View>

                    <Searchbar
                        placeholder="Search products"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        onSubmitEditing={handleSearch}
                        onIconPress={handleSearch}
                        style={styles.searchBar}
                        inputStyle={styles.searchInput}
                        iconColor={theme.colors.empbizTextDarkerGray}
                    />
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
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

                {/* Products Masonry Grid or Empty State */}
                {products && products.length > 0 ? (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                            </Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.masonryContainer}>
                                {/* Left Column */}
                                <View style={[styles.column, styles.leftColumn]}>
                                    {leftColumn.map(renderProduct)}
                                </View>

                                {/* Right Column */}
                                <View style={[styles.column, styles.rightColumn]}>
                                    {rightColumn.map(renderProduct)}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                ) : (
                    <View style={styles.emptyContainer}>
                        <MaterialIcons
                            name="inventory"
                            size={80}
                            color={theme.colors.empbizIconGray}
                            style={styles.emptyIcon}
                        />
                        <Text style={styles.emptyTitle}>
                            No Products Found
                        </Text>
                        <Text style={styles.emptySubtitle}>
                            {category && category !== 'All'
                                ? `No products found in ${category} category`
                                : 'No products available at the moment'
                            }
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
} 