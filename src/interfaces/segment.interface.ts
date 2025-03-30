export type ISubcategory = {
  _id: string;
  name: string;
  subCateSlug: string;
  isActive: boolean;
};

export type ICategory = {
  _id: string;
  name: string;
  cateSlug: string;
  isActive: boolean;
  subcategories?: ISubcategory[];
};

export type ISegment = {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  categories?: ICategory[];
};
