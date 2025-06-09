import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCategories } from '../hooks/useProducts';

const { width } = Dimensions.get('window');
const CATEGORY_WIDTH = (width - 48 - 16) / 2;

export default function CategoriesScreen() {
    const router = useRouter();
    const theme = useTheme();
    const { data: categories, isLoading } = useCategories();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        content: {
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
        categoriesGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 16,
        },
        categoryCard: {
            width: CATEGORY_WIDTH,
            marginBottom: 16,
            backgroundColor: theme.colors.surface,
            borderRadius: 16,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: theme.colors.outline,
        },
        categoryImage: {
            width: '100%',
            height: 120,
            backgroundColor: theme.colors.surfaceVariant,
        },
        categoryContent: {
            padding: 16,
        },
        categoryName: {
            color: theme.colors.onSurface,
            fontWeight: '600',
            marginBottom: 4,
        },
        categoryCount: {
            color: theme.colors.onSurfaceVariant,
            fontSize: 12,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
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
            color: theme.colors.onBackground,
            fontWeight: '700',
            marginBottom: 8,
            textAlign: 'center',
        },
        emptySubtitle: {
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
        },
    });

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            </SafeAreaView>
        );
    }

    if (!categories || categories.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text variant="headlineMedium" style={styles.title}>
                            Categories
                        </Text>
                        <Text variant="bodyLarge" style={styles.subtitle}>
                            Browse products by category
                        </Text>
                    </View>

                    <View style={styles.emptyState}>
                        <MaterialIcons
                            name="category"
                            size={80}
                            color={theme.colors.outline}
                            style={styles.emptyIcon}
                        />
                        <Text variant="headlineSmall" style={styles.emptyTitle}>
                            No Categories Found
                        </Text>
                        <Text variant="bodyLarge" style={styles.emptySubtitle}>
                            Check back later for new categories
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
                        Categories
                    </Text>
                    <Text variant="bodyLarge" style={styles.subtitle}>
                        Browse products by category
                    </Text>
                </View>

                <View style={styles.categoriesGrid}>
                    {categories.map((category) => (
                        <TouchableRipple
                            key={category}
                            style={styles.categoryCard}
                            onPress={() => router.push(`/categories/${category}`)}
                            rippleColor={theme.colors.primary + '1A'}>
                            <View>
                                <View style={styles.categoryImage} />
                                <View style={styles.categoryContent}>
                                    <Text variant="titleMedium" style={styles.categoryName}>
                                        {category}
                                    </Text>
                                    <Text variant="bodySmall" style={styles.categoryCount}>
                                        24 products
                                    </Text>
                                </View>
                            </View>
                        </TouchableRipple>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
} 