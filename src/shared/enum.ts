export enum UserType {
  ADMIN = 1,
  USER = 2,
}

export enum VoucherType {
  PERCENT = "PERCENT",
  FIXED = "FIXED",
}

export enum OrderStatusEnum {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethodEnum {
  COD = "COD",
  BANKING = "BANKING",
}

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  UNPAID = "UNPAID",
}

export enum RevenueType {
  MONTH = "MONTH",
  QUARTER = "QUARTER",
  YEAR = "YEAR",
  RANGE = "RANGE",
}

export enum SellerType {
  BEST = "BEST",
  LEAST = "LEAST",
}
