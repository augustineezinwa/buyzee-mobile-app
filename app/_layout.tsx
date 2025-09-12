// Instructions: Create modern App.tsx with Expo and StatusBar (Original comment, retained)

import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack as StackRouter } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'; // Removed DefaultTheme, ThemeProvider imports from here
import { useCurrentUser } from './hooks/useAuth'; // Assuming useCurrentUser is in this path
import { darkTheme, lightTheme } from './theme/theme';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    },
  },
});

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function RootNavigatorContent() {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const [hasSkippedAuth, setHasSkippedAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSkipPreference = async () => {
      try {
        const skipValue = await AsyncStorage.getItem('userSkippedAuth');
        setHasSkippedAuth(skipValue === 'true');
      } catch (error) {
        console.error('Error checking skip preference:', error);
        setHasSkippedAuth(false);
      }
    };

    checkSkipPreference();
  }, []);

  // Show loading while checking user auth and skip preference
  if (isUserLoading || hasSkippedAuth === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If user is authenticated OR has skipped auth, show the main app
  const shouldShowMainApp = user || hasSkippedAuth;

  return (
    <StackRouter screenOptions={{ headerShown: false }}>
      {shouldShowMainApp ? (
        <StackRouter.Screen name="(tabs)" />
      ) : (
        <StackRouter.Screen name="(auth)" />
      )}
      <StackRouter.Screen name="+not-found" />
      {/* Other root-level screens like product details or checkout can be added here if they are not part of (tabs) or (auth) groups */}
      {/* e.g., <StackRouter.Screen name="product/[id]" /> */}
      {/* e.g., <StackRouter.Screen name="checkout" /> */}
    </StackRouter>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'), // Path relative to app/_layout.tsx
  });

  useEffect(() => {
    if (error) {
      // You might want to log the error or show an error screen
      console.error('Font loading error:', error);
      throw error; // Expo Router's ErrorBoundary will catch this
    }
  }, [error]);

  if (!loaded) {
    // While fonts are loading. Can return null or a custom loading component.
    // For a brief moment, this might be shown before isUserLoading takes over if fonts load fast.
    return null;
  }

  // const currentNavigationTheme = colorScheme === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;
  // // appPaperTheme is imported. If it needs to adapt to colorScheme,
  // // that logic should be within theme.ts or handled here by selecting/creating an adapted theme.
  // // For this rewrite, we assume appPaperTheme is either static or handles adaptation internally.

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>

        <RootNavigatorContent />
        <StatusBar style="auto" />

      </QueryClientProvider>
    </PaperProvider>

  );
}