import { z } from 'zod';

// User validation schemas
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const passwordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const newPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Post validation schemas
export const createPostSchema = z.object({
  content: z.string().min(1, 'Content is required').max(2200, 'Content too long'),
  mediaUrls: z.array(z.string().url('Invalid media URL')).optional(),
  platform: z.enum(['INSTAGRAM', 'TWITTER', 'LINKEDIN', 'TIKTOK', 'FACEBOOK', 'YOUTUBE']),
  socialAccountId: z.string().optional(),
  scheduledAt: z.string().datetime().optional(),
});

export const updatePostSchema = z.object({
  content: z.string().min(1, 'Content is required').max(2200, 'Content too long').optional(),
  mediaUrls: z.array(z.string().url('Invalid media URL')).optional(),
  scheduledAt: z.string().datetime().optional(),
  status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'FAILED', 'CANCELLED']).optional(),
});

// Social account validation schemas
export const connectSocialAccountSchema = z.object({
  platform: z.enum(['INSTAGRAM', 'TWITTER', 'LINKEDIN', 'TIKTOK', 'FACEBOOK', 'YOUTUBE']),
  accessToken: z.string().min(1, 'Access token is required'),
  platformUserId: z.string().min(1, 'Platform user ID is required'),
  platformUsername: z.string().min(1, 'Platform username is required'),
});

// Analytics validation schemas
export const analyticsQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  platform: z.enum(['INSTAGRAM', 'TWITTER', 'LINKEDIN', 'TIKTOK', 'FACEBOOK', 'YOUTUBE']).optional(),
  metric: z.string().optional(),
});

// Team validation schemas
export const createTeamSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
  description: z.string().optional(),
});

export const inviteTeamMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['ADMIN', 'MEMBER', 'VIEWER']).default('MEMBER'),
});

// Profile validation schemas
export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
});

// API usage validation schemas
export const apiUsageQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  endpoint: z.string().optional(),
  method: z.string().optional(),
});

// Subscription validation schemas
export const createSubscriptionSchema = z.object({
  plan: z.enum(['FREE', 'PRO', 'BUSINESS', 'ENTERPRISE']),
  stripePriceId: z.string().min(1, 'Stripe price ID is required'),
});

// API validation schemas
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  filters: z.record(z.any()).optional(),
});

// File upload validation schemas
export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  maxSize: z.number().default(10 * 1024 * 1024), // 10MB
  allowedTypes: z.array(z.string()).default(['image/jpeg', 'image/png', 'image/gif', 'video/mp4']),
});

// Webhook validation schemas
export const stripeWebhookSchema = z.object({
  type: z.string(),
  data: z.record(z.any()),
});

export const socialMediaWebhookSchema = z.object({
  platform: z.enum(['INSTAGRAM', 'TWITTER', 'LINKEDIN', 'TIKTOK', 'FACEBOOK', 'YOUTUBE']),
  event: z.string(),
  data: z.record(z.any()),
});

// Rate limiting validation schemas
export const rateLimitSchema = z.object({
  userId: z.string(),
  endpoint: z.string(),
  maxRequests: z.number().default(100),
  windowMs: z.number().default(15 * 60 * 1000), // 15 minutes
});

// Export types
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type ConnectSocialAccountInput = z.infer<typeof connectSocialAccountSchema>;
export type AnalyticsQueryInput = z.infer<typeof analyticsQuerySchema>;
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type InviteTeamMemberInput = z.infer<typeof inviteTeamMemberSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ApiUsageQueryInput = z.infer<typeof apiUsageQuerySchema>;
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type FileUploadInput = z.infer<typeof fileUploadSchema>; 