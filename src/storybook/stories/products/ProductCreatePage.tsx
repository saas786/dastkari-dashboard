import { storiesOf } from "@storybook/react";
import React from "react";

import { fetchMoreProps } from "@dastkari/fixtures";
import { ProductErrorCode } from "@dastkari/types/globalTypes";
import { warehouseList } from "@dastkari/warehouses/fixtures";
import ProductCreatePage, {
  ProductCreatePageSubmitData
} from "../../../products/components/ProductCreatePage";
import { product as productFixture } from "../../../products/fixtures";
import { productTypes } from "../../../productTypes/fixtures";
import Decorator from "../../Decorator";

const product = productFixture("");

storiesOf("Views / Products / Create product", module)
  .addDecorator(Decorator)
  .add("default", () => (
    <ProductCreatePage
      currency="USD"
      disabled={false}
      errors={[]}
      header="Add product"
      collections={product.collections}
      fetchCategories={() => undefined}
      fetchCollections={() => undefined}
      fetchProductTypes={() => undefined}
      fetchMoreCategories={fetchMoreProps}
      fetchMoreCollections={fetchMoreProps}
      fetchMoreProductTypes={fetchMoreProps}
      productTypes={productTypes}
      categories={[product.category]}
      onBack={() => undefined}
      onSubmit={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
      weightUnit="kg"
    />
  ))
  .add("When loading", () => (
    <ProductCreatePage
      currency="USD"
      disabled={true}
      errors={[]}
      header="Add product"
      collections={product.collections}
      fetchCategories={() => undefined}
      fetchCollections={() => undefined}
      fetchProductTypes={() => undefined}
      fetchMoreCategories={fetchMoreProps}
      fetchMoreCollections={fetchMoreProps}
      fetchMoreProductTypes={fetchMoreProps}
      productTypes={productTypes}
      categories={[product.category]}
      onBack={() => undefined}
      onSubmit={() => undefined}
      saveButtonBarState="default"
      warehouses={undefined}
      weightUnit="kg"
    />
  ))
  .add("form errors", () => (
    <ProductCreatePage
      currency="USD"
      disabled={false}
      errors={(["name", "productType", "category", "sku"] as Array<
        keyof ProductCreatePageSubmitData
      >).map(field => ({
        __typename: "ProductError",
        code: ProductErrorCode.INVALID,
        field
      }))}
      header="Add product"
      collections={product.collections}
      fetchCategories={() => undefined}
      fetchCollections={() => undefined}
      fetchProductTypes={() => undefined}
      fetchMoreCategories={fetchMoreProps}
      fetchMoreCollections={fetchMoreProps}
      fetchMoreProductTypes={fetchMoreProps}
      productTypes={productTypes}
      categories={[product.category]}
      onBack={() => undefined}
      onSubmit={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
      weightUnit="kg"
    />
  ));
