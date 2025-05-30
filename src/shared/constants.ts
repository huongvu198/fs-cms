import { DiscountEventEnum, VoucherType } from "./enum";

export const VoucherTypeLabel: Record<VoucherType, string> = {
  [VoucherType.PERCENT]: "Giảm theo %",
  [VoucherType.FIXED]: "Giảm số tiền",
};

export const formatDateTime = "DD/MM/YYYY HH:mm:ss";
export const BankMap: Record<number, string> = {
  422589: "Ngân hàng TNHH MTV CIMB Việt Nam (CIMB)",
  458761: "Ngân hàng TNHH MTV HSBC (Việt Nam) (HSBC)",
  546034: "Ngân hàng số CAKE by VPBank (CAKE)",
  546035: "Ngân hàng số Ubank by VPBank (Ubank)",
  668888: "Ngân hàng Đại chúng TNHH Kasikornbank (KBank)",
  796500: "DBS Bank Ltd - Chi nhánh TP. Hồ Chí Minh (DBSBank)",
  801011: "Ngân hàng Nonghyup - Chi nhánh Hà Nội (Nonghyup)",
  970400: "Ngân hàng TMCP Sài Gòn Công Thương (SaigonBank)",
  970403: "Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank)",
  970405: "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam (Agribank)",
  970406: "Ngân hàng TMCP Đông Á (DongABank)",
  970407: "Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)",
  970408: "Ngân hàng Thương mại TNHH MTV Dầu Khí Toàn Cầu (GPBank)",
  970409: "Ngân hàng TMCP Bắc Á (BacABank)",
  970410: "Ngân hàng Standard Chartered Việt Nam (Standard Chartered)",
  970412: "Ngân hàng TMCP Đại Chúng Việt Nam (PVcomBank)",
  970414: "Ngân hàng Thương mại TNHH MTV Đại Dương (Oceanbank)",
  970415: "Ngân hàng TMCP Công thương Việt Nam (VietinBank)",
  970416: "Ngân hàng TMCP Á Châu (ACB)",
  970418: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)",
  970419: "Ngân hàng TMCP Quốc Dân (NCB)",
  970421: "Ngân hàng Liên doanh Việt - Nga (VRB)",
  970422: "Ngân hàng TMCP Quân đội (MBBank)",
  970423: "Ngân hàng TMCP Tiên Phong (TPBank)",
  970424: "Ngân hàng TNHH MTV Shinhan Việt Nam (ShinhanBank)",
  970425: "Ngân hàng TMCP An Bình (ABBANK)",
  970426: "Ngân hàng TMCP Hàng Hải (MSB)",
  970427: "Ngân hàng TMCP Việt Á (VietABank)",
  970428: "Ngân hàng TMCP Nam Á (NamABank)",
  970429: "Ngân hàng TMCP Sài Gòn (SCB)",
  970430: "Ngân hàng TMCP Xăng dầu Petrolimex (PGBank)",
  970431: "Ngân hàng TMCP Xuất Nhập khẩu Việt Nam (Eximbank)",
  970432: "Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank)",
  970433: "Ngân hàng TMCP Việt Nam Thương Tín (VietBank)",
  970434: "Ngân hàng TNHH Indovina (IndovinaBank)",
  970436: "Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)",
  970437: "Ngân hàng TMCP PT Thành phố Hồ Chí Minh (HDBank)",
  970438: "Ngân hàng TMCP Bảo Việt (BaoVietBank)",
  970439: "Ngân hàng TNHH MTV Public Việt Nam (PublicBank)",
  970440: "Ngân hàng TMCP Đông Nam Á (SeABank)",
  970441: "Ngân hàng TMCP Quốc tế Việt Nam (VIB)",
  970442: "Ngân hàng TNHH MTV Hong Leong Việt Nam (HongLeong)",
  970443: "Ngân hàng TMCP Sài Gòn - Hà Nội (SHB)",
  970444: "Ngân hàng TM TNHH MTV Xây dựng Việt Nam (CBBank)",
  970446: "Ngân hàng Hợp tác xã Việt Nam (COOPBANK)",
  970448: "Ngân hàng TMCP Phương Đông (OCB)",
  970449: "Ngân hàng TMCP Bưu Điện Liên Việt (LienVietPostBank)",
  970452: "Ngân hàng TMCP Kiên Long (KienLongBank)",
  970454: "Ngân hàng TMCP Bản Việt (VietCapitalBank)",
  970455: "Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh Hà Nội (IBKHN)",
  970456: "Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh TP. Hồ Chí Minh (IBKHCM)",
  970457: "Ngân hàng TNHH MTV Woori Việt Nam (Woori)",
  970458:
    "Ngân hàng United Overseas - Chi nhánh TP. Hồ Chí Minh (United Overseas)",
  970462: "Ngân hàng Kookmin - Chi nhánh Hà Nội (KookminHN)",
  970463: "Ngân hàng Kookmin - Chi nhánh Tp. Hồ Chí Minh (KookminHCM)",
};

export const BankShortNameMap: Record<number, string> = {
  422589: "CIMB",
  458761: "HSBC",
  546034: "CAKE",
  546035: "Ubank",
  668888: "KBank",
  796500: "DBSBank",
  801011: "Nonghyup",
  970400: "SaigonBank",
  970403: "Sacombank",
  970405: "Agribank",
  970406: "DongABank",
  970407: "Techcombank",
  970408: "GPBank",
  970409: "BacABank",
  970410: "Standard Chartered",
  970412: "PVcomBank",
  970414: "Oceanbank",
  970415: "VietinBank",
  970416: "ACB",
  970418: "BIDV",
  970419: "NCB",
  970421: "VRB",
  970422: "MBBank",
  970423: "TPBank",
  970424: "ShinhanBank",
  970425: "ABBANK",
  970426: "MSB",
  970427: "VietABank",
  970428: "NamABank",
  970429: "SCB",
  970430: "PGBank",
  970431: "Eximbank",
  970432: "VPBank",
  970433: "VietBank",
  970434: "IndovinaBank",
  970436: "Vietcombank",
  970437: "HDBank",
  970438: "BaoVietBank",
  970439: "PublicBank",
  970440: "SeABank",
  970441: "VIB",
  970442: "HongLeong",
  970443: "SHB",
  970444: "CBBank",
  970446: "COOPBANK",
  970448: "OCB",
  970449: "LienVietPostBank",
  970452: "KienLongBank",
  970454: "VietCapitalBank",
  970455: "IBKHN",
  970456: "IBKHCM",
  970457: "Woori",
  970458: "United Overseas",
  970462: "KookminHN",
  970463: "KookminHCM",
};

export const EventTypeLabel: Record<DiscountEventEnum, string> = {
  [DiscountEventEnum.ALL_SHOP]: "Toàn bộ sản phẩm",
  [DiscountEventEnum.CATEGORY]: "Danh mục",
  [DiscountEventEnum.SUBCATEGORY]: "Danh mục phụ",
};
