// User types
export interface User {
    id: string;
    cognitoId: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    role: UserRole;
    stylePreferences?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export type UserRole = 'CUSTOMER' | 'ADMIN' | 'EDITOR';

// Product types
export interface Product {
    id: string;
    slug: string;
    name: string;
    tagline?: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    size: string;
    sku: string;
    stock: number;
    lowStockThreshold: number;
    isActive: boolean;
    isFeatured: boolean;
    isNew: boolean;
    isBestseller: boolean;
    benefits: string[];
    careInstructions: string;
    material?: string;
    stoneType?: string;
    isCustomizable: boolean;
    availabilityLabel?: string;
    collectionType?: string;
    images: string[];
    videoUrl?: string;
    metaTitle?: string;
    metaDescription?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Order types
export interface Order {
    id: string;
    orderNumber: string;
    userId?: string;
    guestEmail?: string;
    shippingAddressId?: string;
    shippingMethod: string;
    shippingCost: number;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    paymentMethod: string;
    paymentStatus: PaymentStatus;
    paymentId?: string;
    status: OrderStatus;
    trackingNumber?: string;
    couponCode?: string;
    customerNotes?: string;
    adminNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
}

// Cart types
export interface CartItem {
    productId: string;
    product: Product;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    subtotal: number;
    total: number;
}

// Address types
export interface Address {
    id?: string;
    userId?: string;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault?: boolean;
}

// Review types
export interface Review {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    title?: string;
    comment: string;
    images: string[];
    isVerified: boolean;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Material types
export interface Material {
    id: string;
    slug: string;
    name: string;
    description: string;
    benefits: string[];
    type?: string;
    origin?: string;
}

export interface ProductMaterial {
    productId: string;
    materialId: string;
    isPrimary: boolean;
    material?: Material;
}

// Quiz types
export interface QuizAnswer {
    styleType: string;
    occasions: string[];
    priceRange?: string;
    preferences?: {
        materials?: string[];
        colors?: string[];
    };
}

export interface QuizResult {
    id: string;
    userId?: string;
    styleType: string;
    occasions: string[];
    priceRange?: string;
    preferences?: any;
    recommendedProducts: string[];
    recommendedCollection?: string;
    createdAt: Date;
}

// Blog types
export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt?: string;
    content: string;
    featuredImage?: string;
    category?: string;
    tags: string[];
    isPublished: boolean;
    publishedAt?: Date;
    metaTitle?: string;
    metaDescription?: string;
    createdAt: Date;
    updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Filter types
export interface ProductFilters {
    category?: string;
    material?: string;
    stoneType?: string;
    collectionType?: string;
    priceMin?: number;
    priceMax?: number;
    sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'name';
    search?: string;
}
