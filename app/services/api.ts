import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthCredentials, Cart, CartItem, Order, Product, RegisterCredentials, User } from '../types';

// Mock API base URL - replace with your actual API
const API_BASE_URL = 'https://api.example.com';

// Mock data for development
const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Wireless Headphones',
        description: 'Premium quality wireless headphones with noise cancellation. Experience crystal clear sound and ultimate comfort with our latest wireless headphones. Perfect for music lovers and professionals alike.',
        price: 199.99,
        originalPrice: 299.99,
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
            'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400',
        ],
        category: 'Electronics',
        rating: 4.5,
        reviewCount: 128,
        inStock: true,
        colors: ['Black', 'White', 'Blue'],
        tags: ['wireless', 'audio', 'premium'],
    },
    {
        id: '2',
        name: 'Smart Watch',
        description: 'Advanced smartwatch with health monitoring features. Track your fitness goals, monitor your heart rate, and stay connected with this state-of-the-art smartwatch. Water-resistant and long battery life.',
        price: 299.99,
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
            'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
            'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
            'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400',
        ],
        category: 'Electronics',
        rating: 4.7,
        reviewCount: 89,
        inStock: true,
        colors: ['Silver', 'Gold', 'Black'],
        tags: ['smart', 'health', 'fitness'],
    },
    {
        id: '3',
        name: 'Running Shoes',
        description: 'Comfortable running shoes for daily workouts. Designed for maximum comfort and performance, these running shoes feature advanced cushioning technology and breathable materials.',
        price: 89.99,
        originalPrice: 129.99,
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
            'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
            'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400',
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400',
        ],
        category: 'Sports',
        rating: 4.3,
        reviewCount: 256,
        inStock: true,
        sizes: ['7', '8', '9', '10', '11'],
        colors: ['Black', 'White', 'Red'],
        tags: ['running', 'sports', 'comfort'],
    },
];

const mockUser: User = {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
};

// Utility function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
    login: async (credentials: AuthCredentials): Promise<{ user: User; token: string }> => {
        await delay(1000);

        // Mock validation
        if (credentials.email === 'user@example.com' && credentials.password === 'password') {
            const token = 'mock-jwt-token';
            await AsyncStorage.setItem('auth_token', token);
            return { user: mockUser, token };
        }

        throw new Error('Invalid credentials');
    },

    register: async (credentials: RegisterCredentials): Promise<{ user: User; token: string }> => {
        await delay(1000);

        const newUser: User = {
            id: Date.now().toString(),
            email: credentials.email,
            name: credentials.name,
        };

        const token = 'mock-jwt-token';
        await AsyncStorage.setItem('auth_token', token);
        return { user: newUser, token };
    },

    logout: async (): Promise<void> => {
        await AsyncStorage.removeItem('auth_token');
    },

    getCurrentUser: async (): Promise<User | null> => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
            await delay(500);
            return mockUser;
        }
        return null;
    },
};

// Products API
export const productsAPI = {
    getProducts: async (): Promise<Product[]> => {
        await delay(1000);
        return mockProducts;
    },

    getProduct: async (id: string): Promise<Product> => {
        await delay(500);
        const product = mockProducts.find(p => p.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    },

    getFeaturedProducts: async (): Promise<Product[]> => {
        await delay(800);
        return mockProducts.slice(0, 2);
    },

    searchProducts: async (query: string): Promise<Product[]> => {
        await delay(600);
        return mockProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
    },

    getProductsByCategory: async (category: string): Promise<Product[]> => {
        await delay(600);
        return mockProducts.filter(product => product.category === category);
    },

    getCategories: async (): Promise<string[]> => {
        await delay(400);
        return [...new Set(mockProducts.map(product => product.category))];
    },
};

// Cart API
export const cartAPI = {
    getCart: async (userId: string): Promise<Cart> => {
        await delay(500);
        const cartData = await AsyncStorage.getItem(`cart_${userId}`);
        if (cartData) {
            return JSON.parse(cartData);
        }

        const emptyCart: Cart = {
            id: `cart_${userId}`,
            userId,
            items: [],
            total: 0,
            itemCount: 0,
            updatedAt: new Date().toISOString(),
        };

        return emptyCart;
    },

    addToCart: async (userId: string, item: Omit<CartItem, 'id'>): Promise<Cart> => {
        await delay(300);
        const cart = await cartAPI.getCart(userId);

        const existingItemIndex = cart.items.findIndex(
            cartItem =>
                cartItem.productId === item.productId &&
                cartItem.size === item.size &&
                cartItem.color === item.color
        );

        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += item.quantity;
        } else {
            const newItem: CartItem = {
                ...item,
                id: `${item.productId}_${Date.now()}`,
            };
            cart.items.push(newItem);
        }

        // Recalculate totals
        cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.updatedAt = new Date().toISOString();

        await AsyncStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        return cart;
    },

    updateCartItem: async (userId: string, itemId: string, quantity: number): Promise<Cart> => {
        await delay(300);
        const cart = await cartAPI.getCart(userId);

        const itemIndex = cart.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
        }

        // Recalculate totals
        cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.updatedAt = new Date().toISOString();

        await AsyncStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        return cart;
    },

    removeFromCart: async (userId: string, itemId: string): Promise<Cart> => {
        await delay(300);
        const cart = await cartAPI.getCart(userId);

        cart.items = cart.items.filter(item => item.id !== itemId);

        // Recalculate totals
        cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.updatedAt = new Date().toISOString();

        await AsyncStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        return cart;
    },

    clearCart: async (userId: string): Promise<Cart> => {
        await delay(300);
        const emptyCart: Cart = {
            id: `cart_${userId}`,
            userId,
            items: [],
            total: 0,
            itemCount: 0,
            updatedAt: new Date().toISOString(),
        };

        await AsyncStorage.setItem(`cart_${userId}`, JSON.stringify(emptyCart));
        return emptyCart;
    },
};

// Orders API
export const ordersAPI = {
    getOrders: async (userId: string): Promise<Order[]> => {
        await delay(800);
        const ordersData = await AsyncStorage.getItem(`orders_${userId}`);
        return ordersData ? JSON.parse(ordersData) : [];
    },

    createOrder: async (userId: string, orderData: Omit<Order, 'id' | 'userId' | 'createdAt'>): Promise<Order> => {
        await delay(1000);

        const newOrder: Order = {
            ...orderData,
            id: `order_${Date.now()}`,
            userId,
            createdAt: new Date().toISOString(),
        };

        const orders = await ordersAPI.getOrders(userId);
        orders.unshift(newOrder);

        await AsyncStorage.setItem(`orders_${userId}`, JSON.stringify(orders));

        // Clear cart after successful order
        await cartAPI.clearCart(userId);

        return newOrder;
    },

    getOrder: async (userId: string, orderId: string): Promise<Order> => {
        await delay(500);
        const orders = await ordersAPI.getOrders(userId);
        const order = orders.find(o => o.id === orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        return order;
    },
};
