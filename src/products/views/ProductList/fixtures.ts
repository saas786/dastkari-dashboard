import {
  ProductListFilterOpts,
  ProductStatus
} from "@dastkari/products/components/ProductListPage";
import { attributes } from "@dastkari/attributes/fixtures";
import { fetchMoreProps, searchPageProps } from "@dastkari/fixtures";
import { categories } from "@dastkari/categories/fixtures";
import { collections } from "@dastkari/collections/fixtures";
import { productTypes } from "@dastkari/productTypes/fixtures";
import { StockAvailability } from "@dastkari/types/globalTypes";

export const productListFilterOpts: ProductListFilterOpts = {
  attributes: attributes.map(attr => ({
    active: false,
    choices: attr.values.map(val => ({
      label: val.name,
      value: val.slug
    })),
    name: attr.name,
    slug: attr.slug,
    value: [attr.values[0].slug, attr.values.length > 2 && attr.values[2].slug]
  })),
  categories: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    choices: categories.slice(5).map(category => ({
      label: category.name,
      value: category.id
    })),
    displayValues: [
      {
        label: categories[5].name,
        value: categories[5].id
      }
    ],
    value: [categories[5].id]
  },
  collections: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    choices: collections.slice(5).map(category => ({
      label: category.name,
      value: category.id
    })),
    displayValues: [
      {
        label: collections[5].name,
        value: collections[5].id
      }
    ],
    value: [collections[5].id]
  },
  price: {
    active: false,
    value: {
      max: "20",
      min: "10"
    }
  },
  productType: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    choices: productTypes.slice(3).map(category => ({
      label: category.name,
      value: category.id
    })),
    displayValues: [
      {
        label: productTypes[3].name,
        value: productTypes[3].id
      }
    ],
    value: [productTypes[4].id]
  },
  status: {
    active: false,
    value: ProductStatus.PUBLISHED
  },
  stockStatus: {
    active: false,
    value: StockAvailability.IN_STOCK
  }
};
