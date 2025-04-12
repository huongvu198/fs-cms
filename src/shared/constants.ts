import { VoucherType } from "./enum";

export const VoucherTypeLabel: Record<VoucherType, string> = {
  [VoucherType.PERCENT]: "Giảm theo %",
  [VoucherType.FIXED]: "Giảm số tiền",
};

export const formatDateTime = "DD/MM/YYYY HH:mm:ss";
