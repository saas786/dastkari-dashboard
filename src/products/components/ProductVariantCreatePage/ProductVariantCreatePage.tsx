import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import CardSpacer from "@dastkari/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import useFormset, {
  FormsetChange,
  FormsetData
} from "@dastkari/hooks/useFormset";
import { getVariantAttributeInputFromProduct } from "@dastkari/products/utils/data";
import { ProductErrorFragment } from "@dastkari/attributes/types/ProductErrorFragment";
import { SearchWarehouses_search_edges_node } from "@dastkari/searches/types/SearchWarehouses";
import { maybe } from "../../../misc";
import { ProductVariantCreateData_product } from "../../types/ProductVariantCreateData";
import ProductShipping from "../ProductShipping/ProductShipping";
import ProductVariantAttributes, {
  VariantAttributeInputData
} from "../ProductVariantAttributes";
import ProductVariantNavigation from "../ProductVariantNavigation";
import ProductVariantPrice from "../ProductVariantPrice";
import ProductStocks, { ProductStockInput } from "../ProductStocks";

interface ProductVariantCreatePageFormData {
  costPrice: string;
  images: string[];
  priceOverride: string;
  quantity: string;
  sku: string;
  trackInventory: boolean;
  weight: string;
}

export interface ProductVariantCreatePageSubmitData
  extends ProductVariantCreatePageFormData {
  attributes: FormsetData<VariantAttributeInputData>;
  stocks: ProductStockInput[];
}

interface ProductVariantCreatePageProps {
  currencySymbol: string;
  disabled: boolean;
  errors: ProductErrorFragment[];
  header: string;
  product: ProductVariantCreateData_product;
  saveButtonBarState: ConfirmButtonTransitionState;
  warehouses: SearchWarehouses_search_edges_node[];
  weightUnit: string;
  onBack: () => void;
  onSubmit: (data: ProductVariantCreatePageSubmitData) => void;
  onVariantClick: (variantId: string) => void;
}

const ProductVariantCreatePage: React.FC<ProductVariantCreatePageProps> = ({
  currencySymbol,
  disabled,
  errors,
  header,
  product,
  saveButtonBarState,
  warehouses,
  weightUnit,
  onBack,
  onSubmit,
  onVariantClick
}) => {
  const intl = useIntl();
  const attributeInput = React.useMemo(
    () => getVariantAttributeInputFromProduct(product),
    [product]
  );
  const { change: changeAttributeData, data: attributes } = useFormset(
    attributeInput
  );
  const {
    add: addStock,
    change: changeStockData,
    data: stocks,
    remove: removeStock
  } = useFormset<null, string>([]);

  const initialForm: ProductVariantCreatePageFormData = {
    costPrice: "",
    images: maybe(() => product.images.map(image => image.id)),
    priceOverride: "",
    quantity: "0",
    sku: "",
    trackInventory: true,
    weight: ""
  };

  const handleSubmit = (data: ProductVariantCreatePageFormData) =>
    onSubmit({
      ...data,
      attributes,
      stocks
    });

  return (
    <Form initial={initialForm} onSubmit={handleSubmit}>
      {({ change, data, hasChanged, submit, triggerChange }) => {
        const handleAttributeChange: FormsetChange = (id, value) => {
          changeAttributeData(id, value);
          triggerChange();
        };

        return (
          <Container>
            <AppHeader onBack={onBack}>{maybe(() => product.name)}</AppHeader>
            <PageHeader title={header} />
            <Grid variant="inverted">
              <div>
                <ProductVariantNavigation
                  fallbackThumbnail={maybe(() => product.thumbnail.url)}
                  variants={maybe(() => product.variants)}
                  onRowClick={(variantId: string) => {
                    if (product && product.variants) {
                      return onVariantClick(variantId);
                    }
                  }}
                />
              </div>
              <div>
                <ProductVariantAttributes
                  attributes={attributes}
                  disabled={disabled}
                  errors={errors}
                  onChange={handleAttributeChange}
                />
                <CardSpacer />
                <ProductVariantPrice
                  errors={errors}
                  priceOverride={data.priceOverride}
                  currencySymbol={currencySymbol}
                  costPrice={data.costPrice}
                  loading={disabled}
                  onChange={change}
                />
                <CardSpacer />
                <ProductShipping
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  weightUnit={weightUnit}
                  onChange={change}
                />
                <CardSpacer />
                <ProductStocks
                  data={data}
                  disabled={disabled}
                  onFormDataChange={change}
                  errors={errors}
                  stocks={stocks}
                  warehouses={warehouses}
                  onChange={(id, value) => {
                    triggerChange();
                    changeStockData(id, value);
                  }}
                  onWarehouseStockAdd={id => {
                    triggerChange();
                    addStock({
                      data: null,
                      id,
                      label: warehouses.find(warehouse => warehouse.id === id)
                        .name,
                      value: "0"
                    });
                  }}
                  onWarehouseStockDelete={id => {
                    triggerChange();
                    removeStock(id);
                  }}
                />
              </div>
            </Grid>
            <SaveButtonBar
              disabled={disabled || !onSubmit || !hasChanged}
              labels={{
                delete: intl.formatMessage({
                  defaultMessage: "Delete Variant",
                  description: "button"
                }),
                save: intl.formatMessage({
                  defaultMessage: "Save variant",
                  description: "button"
                })
              }}
              state={saveButtonBarState}
              onCancel={onBack}
              onSave={submit}
            />
          </Container>
        );
      }}
    </Form>
  );
};
ProductVariantCreatePage.displayName = "ProductVariantCreatePage";
export default ProductVariantCreatePage;
