const endPoint = {
  AUTH: {
    LOGIN: `auth/user-login`,
    LOGOUT: `auth/logout`,
  },
  SEGMENT: {
    LIST: `products-public/segments`,
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
};

export default endPoint;
