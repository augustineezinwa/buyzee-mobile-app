export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    sizes?: string[];
    colors?: string[];
    tags: string[];
}

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size?: string;
    color?: string;
    category: string;
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    itemCount: number;
    updatedAt: string;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    deliveryAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
}

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends AuthCredentials {
    name: string;
    confirmPassword: string;
}

export interface PaymentData {
    email: string;
    amount: number;
    reference: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
    metadata?: {
        [key: string]: any;
    };
}

export interface PaymentResult {
    success: boolean;
    reference?: string;
    error?: string;
}

export interface CheckoutFormData {
    email: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
    deliveryAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}
