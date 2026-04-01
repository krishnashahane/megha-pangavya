import type {
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Address,
  Review,
  Coupon,
  BlogPost,
  WishlistItem,
  LoyaltyPoints,
} from "@prisma/client";

export type { User, Product, Category, Cart, CartItem, Order, OrderItem, Address, Review, Coupon, BlogPost, WishlistItem, LoyaltyPoints };

export interface ProductWithCategory extends Product {
  category: Category;
}

export interface CartWithItems extends Cart {
  items: (CartItem & {
    product: Product;
  })[];
}

export interface OrderWithDetails extends Order {
  items: (OrderItem & {
    product: Product;
  })[];
  address: Address;
  user: Pick<User, "id" | "name" | "email">;
  coupon: Coupon | null;
}

export interface ReviewWithUser extends Review {
  user: Pick<User, "id" | "name" | "image">;
}

export interface SessionUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "USER" | "ADMIN";
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  lowStockProducts: number;
  recentOrders: OrderWithDetails[];
  monthlySales: { month: string; revenue: number; orders: number }[];
}

export interface CheckoutData {
  addressId: string;
  paymentMethod: "RAZORPAY" | "COD";
  couponCode?: string;
  deliverySlot?: string;
  notes?: string;
}
