export type ISubcategory = {
  id: string;
  name: string;
  subCateSlug: string;
  isActive: boolean;
};

export type ICategory = {
  id: string;
  name: string;
  cateSlug: string;
  isActive: boolean;
  subCategories?: ISubcategory[];
};

export type ISegment = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  categories?: ICategory[];
};
