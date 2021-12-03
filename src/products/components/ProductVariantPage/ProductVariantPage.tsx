import React from "react";
import { diff } from "fast-array-diff";

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
import { VariantUpdate_productVariantUpdate_errors } from "@dastkari/products/types/VariantUpdate";
import {
  getAttributeInputFromVariant,
  getStockInputFromVariant
} from "@dastkari/products/utils/data";
import { WarehouseFragment } from "@dastkari/warehouses/types/WarehouseFragment";
import { maybe } from "../../../misc";
import { ProductVariant } from "../../types/ProductVariant";
import ProductShipping from "../ProductShipping/ProductShipping";
import ProductVariantAttributes, {
  VariantAttributeInputData
} from "../ProductVariantAttributes";
import ProductVariantImages from "../ProductVariantImages";
import ProductVariantImageSelectDialog from "../ProductVariantImageSelectDialog";
import ProductVariantNavigation from "../ProductVariantNavigation";
import ProductVariantPrice from "../ProductVariantPrice";
import ProductStocks, { ProductStockInput } from "../ProductStocks";

export interface ProductVariantPageFormData {
  costPrice: string;
  priceOverride: string;
  sku: string;
  trackInventory: boolean;
  weight: string;
}

export interface ProductVariantPageSubmitData
  extends ProductVariantPageFormData {
  attributes: FormsetData<VariantAttributeInputData, string>;
  addStocks: ProductStockInput[];
  updateStocks: ProductStockInput[];
  removeStocks: string[];
}

interface ProductVariantPageProps {
  defaultWeightUnit: string;
  variant?: ProductVariant;
  errors: VariantUpdate_productVariantUpdate_errors[];
  saveButtonBarState: ConfirmButtonTransitionState;
  loading?: boolean;
  placeholderImage?: string;
  header: string;
  warehouses: WarehouseFragment[];
  onAdd();
  onBack();
  onDelete();
  onSubmit(data: ProductVariantPageSubmitData);
  onImageSelect(id: string);
  onVariantClick(variantId: string);
}

const ProductVariantPage: React.FC<ProductVariantPageProps> = ({
  defaultWeightUnit,
  errors,
  loading,
  header,
  placeholderImage,
  saveButtonBarState,
  variant,
  warehouses,
  onAdd,
  onBack,
  onDelete,
  onImageSelect,
  onSubmit,
  onVariantClick
}) => {
  const attributeInput = React.useMemo(
    () => getAttributeInputFromVariant(variant),
    [variant]
  );
  const stockInput = React.useMemo(() => getStockInputFromVariant(variant), [
    variant
  ]);
  const { change: changeAttributeData, data: attributes } = useFormset(
    attributeInput
  );
  const {
    add: addStock,
    change: changeStockData,
    data: stocks,
    remove: removeStock
  } = useFormset(stockInput);

  const [isModalOpened, setModalStatus] = React.useState(false);
  const toggleModal = () => setModalStatus(!isModalOpened);

  const variantImages = maybe(() => variant.images.map(image => image.id), []);
  const productImages = maybe(() =>
    variant.product.images.sort((prev, next) =>
      prev.sortOrder > next.sortOrder ? 1 : -1
    )
  );
  const images = maybe(() =>
    productImages
      .filter(image => variantImages.indexOf(image.id) !== -1)
      .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1))
  );

  const initialForm: ProductVariantPageFormData = {
    costPrice: maybe(() => variant.costPrice.amount.toString(), ""),
    priceOverride: maybe(() => variant.priceOverride.amount.toString(), ""),
    sku: maybe(() => variant.sku, ""),
    trackInventory: variant?.trackInventory,
    weight: variant?.weight?.value.toString() || ""
  };

  const handleSubmit = (data: ProductVariantPageFormData) => {
    const dataStocks = stocks.map(stock => stock.id);
    const variantStocks = variant.stocks.map(stock => stock.warehouse.id);
    const stockDiff = diff(variantStocks, dataStocks);

    onSubmit({
      ...data,
      addStocks: stocks.filter(stock =>
        stockDiff.added.some(addedStock => addedStock === stock.id)
      ),
      attributes,
      removeStocks: stockDiff.removed,
      updateStocks: stocks.filter(
        stock => !stockDiff.added.some(addedStock => addedStock === stock.id)
      )
    });
  };

  return (
    <>
      <Container>
        <AppHeader onBack={onBack}>
          {maybe(() => variant.product.name)}
        </AppHeader>
        <PageHeader title={header} />
        <Form initial={initialForm} onSubmit={handleSubmit} confirmLeave>
          {({ change, data, hasChanged, submit, triggerChange }) => {
            const handleAttributeChange: FormsetChange = (id, value) => {
              changeAttributeData(id, value);
              triggerChange();
            };

            return (
              <>
                <Grid variant="inverted">
                  <div>
                    <ProductVariantNavigation
                      current={variant ? variant.id : undefined}
                      fallbackThumbnail={maybe(
                        () => variant.product.thumbnail.url
                      )}
                      variants={maybe(() => variant.product.variants)}
                      onAdd={onAdd}
                      onRowClick={(variantId: string) => {
                        if (variant) {
                          return onVariantClick(variantId);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <ProductVariantAttributes
                      attributes={attributes}
                      disabled={loading}
                      errors={errors}
                      onChange={handleAttributeChange}
                    />
                    <CardSpacer />
                    <ProductVariantImages
                      disabled={loading}
                      images={images}
                      placeholderImage={placeholderImage}
                      onImageAdd={toggleModal}
                    />
                    <CardSpacer />
                    <ProductVariantPrice
                      errors={errors}
                      priceOverride={data.priceOverride}
                      currencySymbol={
                        variant && variant.priceOverride
                          ? variant.priceOverride.currency
                          : variant && variant.costPrice
                          ? variant.costPrice.currency
                          : ""
                      }
                      costPrice={data.costPrice}
                      loading={loading}
                      onChange={change}
                    />
                    <CardSpacer />
                    <ProductShipping
                      data={data}
                      disabled={loading}
                      errors={errors}
                      weightUnit={variant?.weight?.unit || defaultWeightUnit}
                      onChange={change}
                    />
                    <CardSpacer />
                    <ProductStocks
                      data={data}
                      disabled={loading}
                      errors={errors}
                      stocks={stocks}
                      warehouses={warehouses}
                      onChange={(id, value) => {
                        triggerChange();
                        changeStockData(id, value);
                      }}
                      onFormDataChange={change}
                      onWarehouseStockAdd={id => {
                        triggerChange();
                        addStock({
                          data: null,
                          id,
                          label: warehouses.find(
                            warehouse => warehouse.id === id
                          ).name,
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
                  disabled={loading || !hasChanged}
                  state={saveButtonBarState}
                  onCancel={onBack}
                  onDelete={onDelete}
                  onSave={submit}
                />
              </>
            );
          }}
        </Form>
      </Container>
      {variant && (
        <ProductVariantImageSelectDialog
          onClose={toggleModal}
          onImageSelect={onImageSelect}
          open={isModalOpened}
          images={productImages}
          selectedImages={maybe(() => variant.images.map(image => image.id))}
        />
      )}
    </>
  );
};
ProductVariantPage.displayName = "ProductVariantPage";
export default ProductVariantPage;
