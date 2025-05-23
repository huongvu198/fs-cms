const endPoint = {
  AUTH: {
    LOGIN: `auth/email/login`,
    LOGOUT: `auth/logout`,
  },
  SEGMENT: {
    LIST: `products-public/segments`,
    LIST_PAGING: `products/segments-paging`,
    CREATE: "products/create-segment",
    UPDATE: "products/update-segment/:id",
  },
  CATEGORY: {
    CREATE: "products/create-category",
    UPDATE: "products/update-category/:id",
  },
  SUBCATEGORY: {
    CREATE: "products/create-subcategory",
    UPDATE: "products/update-subcategory/:id",
  },
  PRODUCT: {
    CREATE: `products/create-product`,
    UPDATE: `products/update-product`,
    ALL: `products/all`,
    ARCHIVE: `products/archive`,
    DETAIL: `products`,
  },
  MASTER_DATA: {
    GET: `masters-data`,
    UPDATE: `masters-data/update`,
  },
  USER: {
    GET_LIST: "users",
    DELETE: "users",
    CREATE_BY_ADMIN: "users/by-admin",
    UPDATE: "users",
  },
  VOUCHER: {
    GET_LIST: "vouchers/all",
    DELETE: "vouchers",
    CREATE: "vouchers",
    UPDATE: "vouchers",
  },
  BANK: {
    GET_LIST: "bank",
    DELETE: "bank",
    CREATE: "bank",
    UPDATE: "bank",
  },
  VIETQR: {
    GENERATE: "viet-qr/generate",
  },
  ORDERS: {
    LIST: "orders",
    UPDATE: "orders/update",
  },
  ANALYTICS: {
    BASIC: "analytics",
    REVENUE: "analytics/revenue",
    PRODUCTS: "analytics/product",
    INVENTORY: "analytics/inventory",
  },
  CHAT: {
    CONVERSATIONS: "chat/conversations",
    GET_MESSAGES: "chat/:id/messages",
  },
  NEW: {
    GET: `news`,
    UPDATE: `news/update`,
  },
};

export default endPoint;
