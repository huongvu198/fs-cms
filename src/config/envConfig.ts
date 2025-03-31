export const config = {
  server: {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  },
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
  },
};
