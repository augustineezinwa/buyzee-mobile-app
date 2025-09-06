import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { useBizTheme } from '../hooks/useBizTheme';

interface PaymentWebViewProps {
    authorizationUrl: string;
    onPaymentSuccess: (reference: string) => void;
    onPaymentError: (error: string) => void;
    onClose: () => void;
}

export default function PaymentWebView({
    authorizationUrl,
    onPaymentSuccess,
    onPaymentError,
    onClose
}: PaymentWebViewProps) {
    const router = useRouter();
    const theme = useBizTheme();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleNavigationStateChange = (navState: any) => {
        const { url } = navState;

        // Check for success URL pattern
        if (url.includes('success') || url.includes('status=success')) {
            // Extract reference from URL or use a default
            const urlParams = new URL(url).searchParams;
            const reference = urlParams.get('reference') || 'payment_success';
            onPaymentSuccess(reference);
        }

        // Check for error URL pattern
        if (url.includes('error') || url.includes('status=error')) {
            onPaymentError('Payment was cancelled or failed');
        }
    };

    const handleLoadStart = () => {
        setLoading(true);
        setError(null);
    };

    const handleLoadEnd = () => {
        setLoading(false);
    };

    const handleError = (syntheticEvent: any) => {
        const { nativeEvent } = syntheticEvent;
        setError(nativeEvent.description);
        setLoading(false);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.empbizBackground,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.empbizIconGray,
        },
        headerTitle: {
            color: theme.colors.empbizBlack,
            fontWeight: '600',
            fontFamily: 'Inter',
            fontSize: 18,
        },
        closeButton: {
            backgroundColor: theme.colors.empbizPrimary,
            borderRadius: 8,
        },
        webviewContainer: {
            flex: 1,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        errorContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
        },
        errorText: {
            color: theme.colors.empbizBlack,
            textAlign: 'center',
            marginBottom: 16,
            fontFamily: 'Inter',
        },
        retryButton: {
            backgroundColor: theme.colors.empbizPrimary,
            borderRadius: 8,
        },
    });

    if (error) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Payment</Text>
                    <Button mode="contained" style={styles.closeButton} onPress={onClose}>
                        Close
                    </Button>
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                    <Button
                        mode="contained"
                        style={styles.retryButton}
                        onPress={() => setError(null)}
                    >
                        Retry
                    </Button>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Complete Payment</Text>
                <Button mode="contained" style={styles.closeButton} onPress={onClose}>
                    Close
                </Button>
            </View>

            <View style={styles.webviewContainer}>
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={theme.colors.empbizPrimary} />
                    </View>
                )}

                <WebView
                    source={{ uri: authorizationUrl }}
                    style={styles.webviewContainer}
                    onNavigationStateChange={handleNavigationStateChange}
                    onLoadStart={handleLoadStart}
                    onLoadEnd={handleLoadEnd}
                    onError={handleError}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                />
            </View>
        </View>
    );
}