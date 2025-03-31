const EApiTags = "cms";

const endPoint = {
  AUTH: {
    LOGIN: `auth/user-login`,
    LOGOUT: `auth/logout`,
  },
  SEGMENT: {
    LIST: `product/get-segments`,
  },
  PRODUCT: {
    CREATE: `${EApiTags}/product/create-product`,
    UPDATE: `${EApiTags}/product/update-product`,
    ALL: `${EApiTags}/product/all`,
    ARCHIVE: `${EApiTags}/product/archive`,
    DETAIL: `${EApiTags}/product`,
  },
  MASTER_DATA: {
    GET: `${EApiTags}/master-data`,
    UPDATE: `${EApiTags}/master-data/update`,
  },
};

export default endPoint;
