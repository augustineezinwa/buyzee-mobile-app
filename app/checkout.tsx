import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaymentWebView from './components/PaymentWebView';
import { useCurrentUser } from './hooks/useAuth';
import { useBizTheme } from './hooks/useBizTheme';
import { useCart } from './hooks/useCart';
import { paystackService } from './services/paystack';
import { CheckoutFormData } from './types';

export default function CheckoutScreen() {
    const router = useRouter();
    const theme = useBizTheme();
    const { data: cart } = useCart();
    const { data: user } = useCurrentUser();
    const [loading, setLoading] = useState(false);
    const [showPaymentWebView, setShowPaymentWebView] = useState(false);
    const [authorizationUrl, setAuthorizationUrl] = useState('');
    const [formData, setFormData] = useState<CheckoutFormData>({
        email: user?.email || '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: '',
        deliveryAddress: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'Nigeria',
        },
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.empbizBackground,
        },
        content: {
            paddingHorizontal: 24,
            paddingBottom: 24,
        },
        title: {
            marginBottom: 16,
            textAlign: 'left',
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            fontFamily: 'Inter',
        },
        card: {
            marginBottom: 16,
            backgroundColor: theme.colors.surface,
            borderRadius: 12,
        },
        orderItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        divider: {
            marginVertical: 12,
            backgroundColor: theme.colors.empbizIconGray,
        },
        totalRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        input: {
            marginBottom: 12,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        halfInput: {
            flex: 1,
            marginHorizontal: 4,
        },
        button: {
            marginTop: 12,
            marginBottom: 24,
            backgroundColor: theme.colors.empbizPrimary,
            borderRadius: 12,
        },
        buttonContent: {
            paddingVertical: 12,
        },
        buttonLabel: {
            color: 'white',
            fontFamily: 'Inter',
            fontWeight: '600',
            fontSize: 16,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
            backgroundColor: theme.colors.empbizBackground,
        },
        emptyTitle: {
            marginBottom: 12,
            color: theme.colors.empbizBlack,
            fontWeight: '700',
            fontFamily: 'Inter',
        },
    });

    const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddressChange = (field: keyof CheckoutFormData['deliveryAddress'], value: string) => {
        setFormData(prev => ({
            ...prev,
            deliveryAddress: {
                ...prev.deliveryAddress,
                [field]: value,
            },
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.email) {
            Alert.alert('Error', 'Please enter your email address');
            return false;
        }

        if (!formData.deliveryAddress.street || !formData.deliveryAddress.city ||
            !formData.deliveryAddress.state || !formData.deliveryAddress.zipCode) {
            Alert.alert('Error', 'Please fill in all delivery address fields');
            return false;
        }

        return true;
    };

    const initializePayment = async () => {
        if (!validateForm() || !cart) return;

        setLoading(true);

        try {
            const reference = `order_${Date.now()}`;
            const amountInKobo = Math.round(cart.total * 100);

            const response = await paystackService.initializeTransaction({
                email: formData.email,
                amount: amountInKobo,
                reference,
                metadata: {
                    order_id: reference,
                    customer_name: user?.name,
                    delivery_address: formData.deliveryAddress,
                    cart_items: cart.items.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                },
            });

            if (response.status) {
                setAuthorizationUrl(response.data.authorization_url);
                setShowPaymentWebView(true);
            } else {
                Alert.alert('Error', response.message || 'Failed to initialize payment');
            }
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = async (reference: string) => {
        try {
            const verification = await paystackService.verifyPayment(reference);

            if (verification.success) {
                Alert.alert(
                    'Payment Successful',
                    'Your order has been placed successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                setShowPaymentWebView(false);
                                router.push('/(tabs)/orders');
                            },
                        },
                    ]
                );
            } else {
                Alert.alert('Error', 'Payment verification failed. Please contact support.');
                setShowPaymentWebView(false);
            }
        } catch (error) {
            Alert.alert('Error', 'Payment verification failed. Please contact support.');
            setShowPaymentWebView(false);
        }
    };

    const handlePaymentError = (error: string) => {
        Alert.alert('Payment Failed', error);
        setShowPaymentWebView(false);
    };

    const handleClosePayment = () => {
        setShowPaymentWebView(false);
    };

    if (showPaymentWebView) {
        return (
            <PaymentWebView
                authorizationUrl={authorizationUrl}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                onClose={handleClosePayment}
            />
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <Text variant="headlineSmall" style={styles.emptyTitle}>Your cart is empty</Text>
                <Button mode="contained" style={styles.button} contentStyle={styles.buttonContent} labelStyle={styles.buttonLabel} onPress={() => router.back()}>
                    Continue Shopping
                </Button>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text variant="headlineSmall" style={styles.title}>
                    Checkout
                </Text>

                <Card style={styles.card}>
                    <Card.Title title="Order Summary" />
                    <Card.Content>
                        {cart.items.map((item) => (
                            <View key={item.id} style={styles.orderItem}>
                                <Text variant="bodyMedium" style={{ color: theme.colors.empbizBlack }}>{item.name}</Text>
                                <Text variant="bodySmall" style={{ color: theme.colors.empbizTextDarkerGray }}>Qty: {item.quantity}</Text>
                                <Text variant="bodyMedium" style={{ color: theme.colors.empbizBlack }}>₦{(item.price * item.quantity).toFixed(2)}</Text>
                            </View>
                        ))}
                        <Divider style={styles.divider} />
                        <View style={styles.totalRow}>
                            <Text variant="titleMedium" style={{ color: theme.colors.empbizBlack }}>Total:</Text>
                            <Text variant="titleMedium" style={{ color: theme.colors.empbizBlack }}>₦{cart.total.toFixed(2)}</Text>
                        </View>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Title title="Customer Information" />
                    <Card.Content>
                        <TextInput
                            label="Email"
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                            mode="outlined"
                            style={styles.input}
                            keyboardType="email-address"
                            selectionColor={theme.colors.empbizPrimary}
                            activeOutlineColor={theme.colors.empbizPrimary}
                            theme={{
                                colors: {
                                    outline: theme.colors.empbizIconGray,
                                    onSurfaceVariant: theme.colors.empbizTextDarkerGray,
                                }
                            }}
                        />
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Title title="Delivery Address" />
                    <Card.Content>
                        <TextInput
                            label="Street Address"
                            value={formData.deliveryAddress.street}
                            onChangeText={(text) => handleAddressChange('street', text)}
                            mode="outlined"
                            style={styles.input}
                            selectionColor={theme.colors.empbizPrimary}
                            activeOutlineColor={theme.colors.empbizPrimary}
                            theme={{
                                colors: {
                                    outline: theme.colors.empbizIconGray,
                                    onSurfaceVariant: theme.colors.empbizTextDarkerGray,
                                }
                            }}
                        />
                        <TextInput
                            label="City"
                            value={formData.deliveryAddress.city}
                            onChangeText={(text) => handleAddressChange('city', text)}
                            mode="outlined"
                            style={styles.input}
                            selectionColor={theme.colors.empbizPrimary}
                            activeOutlineColor={theme.colors.empbizPrimary}
                            theme={{
                                colors: {
                                    outline: theme.colors.empbizIconGray,
                                    onSurfaceVariant: theme.colors.empbizTextDarkerGray,
                                }
                            }}
                        />
                        <View style={styles.row}>
                            <TextInput
                                label="State"
                                value={formData.deliveryAddress.state}
                                onChangeText={(text) => handleAddressChange('state', text)}
                                mode="outlined"
                                style={[styles.input, styles.halfInput]}
                                selectionColor={theme.colors.empbizPrimary}
                                activeOutlineColor={theme.colors.empbizPrimary}
                                theme={{
                                    colors: {
                                        outline: theme.colors.empbizIconGray,
                                        onSurfaceVariant: theme.colors.empbizTextDarkerGray,
                                    }
                                }}
                            />
                            <TextInput
                                label="ZIP Code"
                                value={formData.deliveryAddress.zipCode}
                                onChangeText={(text) => handleAddressChange('zipCode', text)}
                                mode="outlined"
                                style={[styles.input, styles.halfInput]}
                                keyboardType="numeric"
                                selectionColor={theme.colors.empbizPrimary}
                                activeOutlineColor={theme.colors.empbizPrimary}
                                theme={{
                                    colors: {
                                        outline: theme.colors.empbizIconGray,
                                        onSurfaceVariant: theme.colors.empbizTextDarkerGray,
                                    }
                                }}
                            />
                        </View>
                    </Card.Content>
                </Card>

                <Button
                    mode="contained"
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    onPress={initializePayment}
                    loading={loading}
                    disabled={loading}
                >
                    Pay ₦{cart.total.toFixed(2)}
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}