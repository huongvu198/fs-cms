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
};

export default endPoint;
