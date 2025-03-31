export interface IProduct {
  categoryId: string;
  subCategoryId: string;
  segmentId: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  discount: number;
  variants: IVariant[];
}

export interface IVariant {
  color: string;
  image: string;
  isActive: boolean;
  sizes: ISize[];
}

export interface ISize {
  size: string;
  isActive: boolean;
  quantity: number;
  inventory?: number;
  soldQuantity?: number;
}

export interface DataProductBasic {
  categoryId: string;
  subCategoryId: string;
  segmentId: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

export interface DataProductSale {
  discount?: number;
  variants?: IVariant[];
}

export interface IProductResponse {
  _id: string;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
  isArchived: boolean;
  segment: ISegment;
  discount: number;
  totalQuantity: number;
  totalSoldQuantity: number;
  totalInventory: number;
  variants: IVariant[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISegment {
  id: string;
  name: string;
  slug: string;
  categories: ICategory;
}

export interface ICategory {
  id: string;
  name: string;
  cateSlug: string;
  subcategories: ISubCategory;
}

export interface ISubCategory {
  id: string;
  name: string;
  subCateSlug: string;
}

export interface IVariant {
  color: string;
  isActive: boolean;
  image: string;
  sizes: ISize[];
}

export interface IProductResponse {
  _id: string;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
  isArchived: boolean;
  segment: ISegment;
  discount: number;
  totalQuantity: number;
  totalSoldQuantity: number;
  totalInventory: number;
  variants: IVariant[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISegment {
  id: string;
  name: string;
  slug: string;
  categories: ICategory;
}

export interface ICategory {
  id: string;
  name: string;
  cateSlug: string;
  subcategories: ISubCategory;
}

export interface ISubCategory {
  id: string;
  name: string;
  subCateSlug: string;
}

export interface IVariant {
  color: string;
  isActive: boolean;
  image: string;
  sizes: ISize[];
}
