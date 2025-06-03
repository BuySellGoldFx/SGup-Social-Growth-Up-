// User and Authentication Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'Básico' | 'Intermediário' | 'Influencer' | 'Profissional' | 'Expert'
  verified: boolean
  joinDate: string
  country?: string
}

export interface LoginData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  country: string
  agreeTerms: boolean
  newsletter?: boolean
}

// Payment Types
export interface PaymentMethod {
  type: 'stripe' | 'paypal' | 'crypto'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
}

export interface TransactionData {
  type: 'stripe' | 'paypal' | 'crypto'
  transactionId: string
  amount: number | string
  currency: string
  status: 'succeeded' | 'completed' | 'pending' | 'failed'
  paymentMethod: string
  orderId?: string
  payerEmail?: string
}

export interface OrderSummary {
  tier: string
  platform: string
  price: number
  addOns: AddOn[]
  total: number
  orderId: string
  customerEmail: string
}

export interface AddOn {
  id: string
  name: string
  price: number
  description: string
}

// Platform and Service Types
export type Platform = 'instagram' | 'tiktok' | 'youtube'

export interface ServiceTier {
  id: string
  name: string
  minFollowers: number
  maxFollowers: number
  price: number
  description: string
  features: string[]
  popular?: boolean
  platform?: Platform
}

export interface Order {
  id: string
  platform: Platform
  tier: string
  status: 'pending' | 'processing' | 'active' | 'completed' | 'paused' | 'cancelled'
  progress: number
  startDate: string
  completionDate?: string
  targetFollowers: number
  currentFollowers: number
  initialFollowers: number
  amount: number
  estimatedCompletion: string
  paymentMethod?: string
  transactionId?: string
}

// Currency Types
export interface CurrencyInfo {
  code: string
  symbol: string
  name: string
  rate: number
  flag: string
}

export interface CountryInfo {
  code: string
  name: string
  currency: CurrencyInfo
}

// Dashboard Types
export interface DashboardStats {
  totalOrders: number
  activeOrders: number
  totalFollowersGained: number
  totalSpent: number
  avgGrowthRate: number
  successRate: number
}

// Admin Types
export interface AdminOrder extends Order {
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  country: string
  lastUpdate: string
}

export interface AdminStats {
  totalOrders: number
  activeOrders: number
  completedOrders: number
  totalRevenue: number
  totalCustomers: number
  avgOrderValue: number
  completionRate: number
  dailyRevenue: number
}

// Email Types
export interface EmailTemplate {
  to: string
  subject: string
  html: string
  text?: string
}

export interface EmailOrderData {
  orderId: string
  customerName: string
  customerEmail: string
  platform: string
  tier: string
  amount: number
  transactionId: string
}

export interface EmailProgressData {
  orderId: string
  customerName: string
  customerEmail: string
  platform: string
  currentFollowers: number
  targetFollowers: number
  progress: number
}

// Backup System Types
export interface BackupData {
  id: string
  timestamp: string
  type: 'full' | 'incremental' | 'manual'
  size: number
  description: string
  checksum: string
  creator: string
}

export interface ActivityLog {
  id: string
  timestamp: string
  user: string
  action: string
  details: string
  ipAddress: string
  success: boolean
}

export interface SystemConfig {
  adminPassword: string
  lastBackup: string
  autoBackupEnabled: boolean
  backupRetentionDays: number
  securitySettings: {
    requirePasswordForChanges: boolean
    maxLoginAttempts: number
    sessionTimeout: number
  }
}

// Component Props Types
export interface AuthSystemProps {
  onLogin: (userData: User) => void
  onRegister: (userData: User) => void
}

export interface PaymentSystemProps {
  orderSummary: OrderSummary
  onPaymentSuccess: (transactionData: TransactionData) => void
  onPaymentError: (error: string) => void
}

export interface ROIMetrics {
  currentFollowers: number
  targetFollowers: number
  currentEngagementRate: number
  avgOrderValue: number
  conversionRate: number
  industry: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface StripePaymentIntent {
  client_secret: string
  payment_intent_id: string
}

export interface PayPalOrderResponse {
  orderID: string
  status: string
  links: Array<{
    href: string
    rel: string
    method: string
  }>
}

// Form Types
export interface OrderFormData {
  platform: Platform
  tier: string
  profileUrl: string
  email: string
  phone: string
  targetAudience: string
  urgency: 'standard' | 'priority' | 'express'
  addOns: string[]
  paymentMethod: 'card' | 'paypal' | 'crypto'
}

export interface CardData {
  number: string
  expiry: string
  cvc: string
  name: string
}

// Testimonial Types
export interface Testimonial {
  id: string
  name: string
  handle: string
  platform: Platform
  avatar: string
  verified: boolean
  tier: string
  beforeFollowers: number
  afterFollowers: number
  timeframe: string
  engagement: string
  revenue?: string
  quote: string
  rating: number
}

// Search and Filter Types
export interface SearchFilters {
  searchTerm: string
  statusFilter: string
  platformFilter: string
  dateRange?: {
    start: Date
    end: Date
  }
}

export type StatusFilter = 'all' | 'pending' | 'processing' | 'active' | 'completed' | 'paused' | 'cancelled'
export type PlatformFilter = 'all' | Platform

// Event Types
export interface PaymentEvent {
  type: 'payment_success' | 'payment_failed' | 'payment_pending'
  data: TransactionData
  timestamp: string
}

export interface OrderEvent {
  type: 'order_created' | 'order_updated' | 'order_completed'
  orderId: string
  data: Partial<Order>
  timestamp: string
}
