import { Paystack } from 'react-native-paystack';

// Paystack configuration
const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Replace with your actual public key

export interface PaystackPaymentData {
    email: string;
    amount: number; // Amount in kobo (smallest currency unit)
    reference: string;
    metadata?: {
        [key: string]: any;
    };
}

export interface PaystackInitializeData {
    email: string;
    amount: number; // Amount in kobo (smallest currency unit)
    reference?: string;
    metadata?: {
        [key: string]: any;
    };
}

export interface PaystackInitializeResponse {
    status: boolean;
    message: string;
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    };
}

export const paystackService = {
    // Initialize Paystack
    initialize: () => {
        Paystack.initialize({
            publicKey: PAYSTACK_PUBLIC_KEY,
        });
    },

    // Process payment
    processPayment: async (paymentData: PaystackPaymentData): Promise<{ success: boolean; reference?: string; error?: string }> => {
        try {
            const response = await Paystack.chargeCard({
                cardNumber: paymentData.cardNumber,
                expiryMonth: paymentData.expiryMonth,
                expiryYear: paymentData.expiryYear,
                cvc: paymentData.cvc,
                email: paymentData.email,
                amount: paymentData.amount,
                reference: paymentData.reference,
                metadata: paymentData.metadata,
            });

            if (response.status === 'success') {
                return {
                    success: true,
                    reference: response.reference,
                };
            } else {
                return {
                    success: false,
                    error: response.message || 'Payment failed',
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Payment failed',
            };
        }
    },

    // Initialize Paystack transaction
    initializeTransaction: async (data: PaystackInitializeData): Promise<PaystackInitializeResponse> => {
        try {
            const response = await fetch('https://api.paystack.co/transaction/initialize', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${PAYSTACK_PUBLIC_KEY}`, // Changed from PAYSTACK_SECRET_KEY to PAYSTACK_PUBLIC_KEY
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    amount: data.amount,
                    reference: data.reference || `order_${Date.now()}`,
                    metadata: data.metadata,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to initialize transaction');
            }

            return result;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Failed to initialize transaction');
        }
    },

    // Verify payment
    verifyPayment: async (reference: string): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
            const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
                headers: {
                    'Authorization': `Bearer ${PAYSTACK_PUBLIC_KEY}`, // Changed from PAYSTACK_SECRET_KEY to PAYSTACK_PUBLIC_KEY
                },
            });

            const data = await response.json();

            if (data.status && data.data.status === 'success') {
                return {
                    success: true,
                    data: data.data,
                };
            } else {
                return {
                    success: false,
                    error: data.message || 'Payment verification failed',
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Payment verification failed',
            };
        }
    },
};
