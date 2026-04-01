import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const addressSchema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
  landmark: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export const reviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export const couponSchema = z.object({
  code: z.string().min(3).toUpperCase(),
  description: z.string().optional(),
  type: z.enum(["percentage", "flat"]),
  value: z.number().positive(),
  minOrder: z.number().min(0).optional(),
  maxDiscount: z.number().positive().optional(),
  usageLimit: z.number().positive().optional(),
  expiresAt: z.string().datetime(),
});

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  ingredients: z.string().optional(),
  usage: z.string().optional(),
  benefits: z.string().optional(),
  price: z.number().positive(),
  mrp: z.number().positive(),
  sku: z.string().min(2),
  stock: z.number().int().min(0),
  categoryId: z.string().min(1),
  images: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  bestSeller: z.boolean().optional(),
  isNew: z.boolean().optional(),
  weight: z.string().optional(),
});

export const checkoutSchema = z.object({
  addressId: z.string().min(1),
  paymentMethod: z.enum(["RAZORPAY", "COD"]),
  couponCode: z.string().optional(),
  deliverySlot: z.string().optional(),
  notes: z.string().optional(),
});
