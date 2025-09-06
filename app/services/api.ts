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
        category: 'Foot wears',
        rating: 4.3,
        reviewCount: 256,
        inStock: true,
        sizes: ['7', '8', '9', '10', '11'],
        colors: ['Black', 'White', 'Red'],
        tags: ['running', 'sports', 'comfort'],
    },
    // NEW PRODUCTS
    {
        id: '4',
        name: 'Organic Honey',
        description: 'Pure organic honey sourced from local beekeepers. Rich in antioxidants and natural enzymes, this golden honey is perfect for sweetening your tea or enjoying on toast.',
        price: 15.99,
        originalPrice: 19.99,
        images: [
            'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
            'https://images.unsplash.com/photo-1558642891-54be180ea339?w=400',
            'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?w=400',
        ],
        category: 'Food items',
        rating: 4.8,
        reviewCount: 94,
        inStock: true,
        tags: ['organic', 'natural', 'healthy'],
    },
    {
        id: '5',
        name: 'Cotton T-Shirt',
        description: 'Soft and comfortable 100% cotton t-shirt. Perfect for casual wear with a relaxed fit and breathable fabric. Available in multiple colors and sizes.',
        price: 24.99,
        originalPrice: 34.99,
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400',
            'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400',
        ],
        category: 'Clothes',
        rating: 4.4,
        reviewCount: 167,
        inStock: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Navy', 'Gray', 'Red'],
        tags: ['cotton', 'casual', 'comfortable'],
    },
    {
        id: '6',
        name: 'Leather Handbag',
        description: 'Elegant genuine leather handbag with multiple compartments. Perfect for work or special occasions. Features premium craftsmanship and timeless design.',
        price: 149.99,
        originalPrice: 199.99,
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
        ],
        category: 'Bags',
        rating: 4.6,
        reviewCount: 73,
        inStock: true,
        colors: ['Brown', 'Black', 'Tan'],
        tags: ['leather', 'elegant', 'professional'],
    },
    {
        id: '7',
        name: 'Fresh Avocados',
        description: 'Premium fresh avocados, perfectly ripe and ready to eat. Rich in healthy fats and nutrients. Great for salads, toast, or smoothies.',
        price: 8.99,
        images: [
            'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',
            'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        ],
        category: 'Food items',
        rating: 4.7,
        reviewCount: 142,
        inStock: true,
        tags: ['fresh', 'healthy', 'organic'],
    },
    {
        id: '8',
        name: 'Denim Jeans',
        description: 'Classic blue denim jeans with a modern slim fit. Made from premium denim fabric with stretch for comfort. Perfect for everyday wear.',
        price: 79.99,
        originalPrice: 99.99,
        images: [
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
            'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
        ],
        category: 'Clothes',
        rating: 4.5,
        reviewCount: 203,
        inStock: true,
        sizes: ['28', '30', '32', '34', '36', '38'],
        colors: ['Blue', 'Dark Blue', 'Black'],
        tags: ['denim', 'casual', 'classic'],
    },
    {
        id: '9',
        name: 'Canvas Sneakers',
        description: 'Stylish canvas sneakers perfect for casual outings. Lightweight and comfortable with a classic design that never goes out of style.',
        price: 59.99,
        images: [
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
            'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400',
        ],
        category: 'Foot wears',
        rating: 4.2,
        reviewCount: 189,
        inStock: true,
        sizes: ['6', '7', '8', '9', '10', '11', '12'],
        colors: ['White', 'Black', 'Red', 'Navy'],
        tags: ['canvas', 'casual', 'comfortable'],
    },
    {
        id: '10',
        name: 'Backpack',
        description: 'Durable and spacious backpack perfect for school, work, or travel. Multiple compartments and padded laptop sleeve. Water-resistant material.',
        price: 69.99,
        originalPrice: 89.99,
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
            'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400',
            'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400',
        ],
        category: 'Bags',
        rating: 4.4,
        reviewCount: 156,
        inStock: true,
        colors: ['Black', 'Gray', 'Navy', 'Green'],
        tags: ['travel', 'school', 'laptop'],
    },
    {
        id: '11',
        name: 'Artisan Coffee Beans',
        description: 'Premium artisan coffee beans roasted to perfection. Single origin beans with rich flavor notes and aromatic profile. Perfect for coffee enthusiasts.',
        price: 18.99,
        images: [
            'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
            'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400',
            'https://images.unsplash.com/photo-1542990253-a781e04c0082?w=400',
        ],
        category: 'Food items',
        rating: 4.9,
        reviewCount: 87,
        inStock: true,
        tags: ['coffee', 'artisan', 'premium'],
    },
    {
        id: '12',
        name: 'Wool Sweater',
        description: 'Cozy wool sweater perfect for cold weather. Soft and warm with a classic knit pattern. Available in various colors and sizes.',
        price: 89.99,
        originalPrice: 119.99,
        images: [
            'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
            'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400',
        ],
        category: 'Clothes',
        rating: 4.6,
        reviewCount: 124,
        inStock: true,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Cream', 'Gray', 'Navy', 'Burgundy'],
        tags: ['wool', 'warm', 'winter'],
    },
    {
        id: '13',
        name: 'Hiking Boots',
        description: 'Sturdy hiking boots built for outdoor adventures. Waterproof and durable with excellent grip and ankle support. Perfect for trails and rough terrain.',
        price: 159.99,
        images: [
            'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400',
            'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        ],
        category: 'Foot wears',
        rating: 4.7,
        reviewCount: 98,
        inStock: true,
        sizes: ['7', '8', '9', '10', '11', '12'],
        colors: ['Brown', 'Black', 'Tan'],
        tags: ['hiking', 'outdoor', 'waterproof'],
    },
    {
        id: '14',
        name: 'Travel Duffel Bag',
        description: 'Large capacity travel duffel bag perfect for weekend trips or gym sessions. Durable construction with multiple pockets and comfortable handles.',
        price: 79.99,
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
            'https://images.unsplash.com/photo-1586295166042-b182c4d60b0b?w=400',
            'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400',
        ],
        category: 'Bags',
        rating: 4.3,
        reviewCount: 76,
        inStock: true,
        colors: ['Black', 'Navy', 'Gray', 'Olive'],
        tags: ['travel', 'gym', 'durable'],
    },
    {
        id: '15',
        name: 'Organic Quinoa',
        description: 'Premium organic quinoa grain, perfect for healthy meals. High in protein and fiber, gluten-free superfood that cooks quickly and versatilely.',
        price: 12.99,
        images: [
            'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
            'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400',
            'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
        ],
        category: 'Food items',
        rating: 4.5,
        reviewCount: 134,
        inStock: true,
        tags: ['organic', 'superfood', 'gluten-free'],
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
