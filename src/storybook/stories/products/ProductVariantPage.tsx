import { storiesOf } from "@storybook/react";
import React from "react";

import placeholderImage from "@assets/images/placeholder60x60.png";
import { ProductErrorCode } from "@dastkari/types/globalTypes";
import { warehouseList } from "@dastkari/warehouses/fixtures";
import ProductVariantPage from "../../../products/components/ProductVariantPage";
import { variant as variantFixture } from "../../../products/fixtures";
import Decorator from "../../Decorator";

const variant = variantFixture(placeholderImage);

storiesOf("Views / Products / Product variant details", module)
  .addDecorator(Decorator)
  .add("when loaded data", () => (
    <ProductVariantPage
      defaultWeightUnit="kg"
      header={variant.name || variant.sku}
      errors={[]}
      variant={variant}
      onAdd={() => undefined}
      onBack={() => undefined}
      onDelete={undefined}
      onImageSelect={() => undefined}
      onSubmit={() => undefined}
      onVariantClick={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
    />
  ))
  .add("when loading data", () => (
    <ProductVariantPage
      defaultWeightUnit="kg"
      header={undefined}
      errors={[]}
      loading={true}
      onBack={() => undefined}
      placeholderImage={placeholderImage}
      onAdd={() => undefined}
      onDelete={undefined}
      onImageSelect={() => undefined}
      onSubmit={() => undefined}
      onVariantClick={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
    />
  ))
  .add("attribute errors", () => (
    <ProductVariantPage
      defaultWeightUnit="kg"
      header={variant.name || variant.sku}
      variant={variant}
      onAdd={() => undefined}
      onBack={() => undefined}
      onDelete={undefined}
      onImageSelect={() => undefined}
      onSubmit={() => undefined}
      onVariantClick={() => undefined}
      saveButtonBarState="default"
      errors={[
        {
          code: ProductErrorCode.REQUIRED,
          field: "attributes"
        },
        {
          code: ProductErrorCode.UNIQUE,
          field: "attributes"
        },
        {
          code: ProductErrorCode.ALREADY_EXISTS,
          field: "sku"
        }
      ].map(error => ({
        __typename: "ProductError",
        message: "Generic form error",
        ...error
      }))}
      warehouses={warehouseList}
    />
  ));
