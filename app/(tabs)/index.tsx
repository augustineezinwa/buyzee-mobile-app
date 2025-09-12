import { Entypo, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
import { useFeaturedProducts } from '../hooks/useProducts';
import { withOpacity } from '../theme/theme';
import { Product } from '../types';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = width * 0.6;
const PRODUCT_CARD_PADDING = 12;
const PRODUCT_CARD_BORDER_RADIUS = 5;

const categories = ['All', 'Food items', 'Clothes', 'Foot wears', 'Bags'];

export default function HomeScreen() {
    const router = useRouter();
    const theme = useBizTheme();
    const { data: featuredProducts, isLoading: loadingProducts } = useFeaturedProducts();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push('/search');
        }
    };

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
        cartButton: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: theme.colors.empbizSecondary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        searchBar: {
            backgroundColor: theme.colors.surface,
            elevation: 0,
            borderRadius: 5,
        },
        searchInput: {
            fontSize: 16,
            color: theme.colors.empbizBlack,
            fontFamily: 'Inter',
        },
        advertBanner: {
            marginHorizontal: 24,
            backgroundColor: theme.colors.empbizPrimary,
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
        },
        advertText: {
            flex: 1,
            color: 'white',
            fontSize: 20,
            fontWeight: 500,
            lineHeight: 26,
            fontFamily: 'Inter',
            marginRight: 12,
        },
        advertImage: {
            width: '33%',
            aspectRatio: 1,
            borderRadius: 5,
            backgroundColor: 'white',
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
        viewAllButton: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        viewAllText: {
            color: theme.colors.empbizTextDarkerGray,
            marginRight: 8,
            fontFamily: 'Inter',
            fontSize: 16,
            fontWeight: 500,
        },
        viewAllIcon: {
            width: 38,
            height: 38,
            borderRadius: 38,
            backgroundColor: theme.colors.empbizSecondary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        categoriesList: {
            paddingLeft: 24,
        },
        categoryChip: {
            marginRight: 12,
            padding: 1.5,
            backgroundColor: selectedCategory === 'All' ? theme.colors.empbizPrimary : theme.colors.empbizSecondary,
            borderColor: theme.colors.empbizSecondary,
        },
        categoryText: {
            color: selectedCategory === 'All' ? 'white' : theme.colors.empbizBlack,
            fontWeight: '400',
            fontFamily: 'Inter',
            fontSize: 16,
        },
        productsContainer: {
            paddingLeft: 24,
        },
        productWrapper: {
            width: PRODUCT_WIDTH,
            marginRight: 16,
        },
        productCard: {
            backgroundColor: theme.colors.surface,
            borderRadius: PRODUCT_CARD_BORDER_RADIUS,
            overflow: 'hidden',
            padding: PRODUCT_CARD_PADDING,
        },
        productImageContainer: {
            position: 'relative',
            width: '100%',
            aspectRatio: 1,
            borderRadius: PRODUCT_CARD_BORDER_RADIUS,
            overflow: 'hidden',
            marginBottom: PRODUCT_CARD_PADDING,
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
            backgroundColor: withOpacity(theme.colors.empbizBlack, 0.6),
            justifyContent: 'center',
            alignItems: 'center',
        },
        productInfo: {
            padding: 8,
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
        loader: {
            margin: 20,
        },
        bottomPadding: {
            height: 20,
        },
    });

    const renderProduct = ({ item }: { item: Product }) => (
        <TouchableRipple
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
            onPress={() => {
                setSelectedCategory(item);
                if (item === 'All') {
                    router.push('/(screens)/products');
                } else {
                    router.push(`/(screens)/products?category=${item}`);
                }
            }}>
            {item}
        </Chip>
    );

    if (loadingProducts) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.empbizPrimary} />
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
                            <Text variant="headlineSmall" style={{ fontFamily: 'Inter' }}>
                                Good morning
                            </Text>
                        </View>
                        <TouchableRipple
                            style={styles.cartButton}
                            onPress={() => router.push('/(tabs)/cart')}
                            rippleColor={withOpacity(theme.colors.empbizPrimary, 0.1)}>
                            <SimpleLineIcons name="handbag" size={24} color={theme.colors.empbizBlack} />
                        </TouchableRipple>
                    </View>

                    <Searchbar
                        placeholder="Search the entire store"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        onSubmitEditing={handleSearch}
                        onIconPress={handleSearch}
                        style={styles.searchBar}
                        inputStyle={styles.searchInput}
                        iconColor={theme.colors.empbizTextDarkerGray}
                    />
                </View>

                {/* Advert Banner */}
                <View style={styles.advertBanner}>
                    <Text style={styles.advertText}>Delivery is 30% cheaper with us!</Text>
                    <Image
                        source={{ uri: 'https://example.com/happy-customer.jpg' }}
                        style={styles.advertImage}
                    />
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <TouchableRipple
                            style={styles.viewAllButton}
                            onPress={() => router.push('/(screens)/categories')}
                            rippleColor={withOpacity(theme.colors.empbizPrimary, 0.1)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.viewAllText}>See all</Text>
                                <View style={styles.viewAllIcon}>
                                    <Entypo name="chevron-right" size={16} color={theme.colors.empbizBlack} />
                                </View>
                            </View>
                        </TouchableRipple>
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

                {/* All Products */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>All Products</Text>
                    </View>
                    <FlatList
                        data={featuredProducts}
                        renderItem={renderProduct}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.productsContainer}
                        snapToInterval={PRODUCT_WIDTH + 16}
                        decelerationRate="fast"
                        snapToAlignment="start"
                    />
                </View>

                {/* Latest Addition */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Latest Addition</Text>
                    </View>
                    <FlatList
                        data={featuredProducts?.slice(0, 4)}
                        renderItem={renderProduct}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.productsContainer}
                        snapToInterval={PRODUCT_WIDTH + 16}
                        decelerationRate="fast"
                        snapToAlignment="start"
                    />
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>
        </SafeAreaView>
    );
}
