import { ContentState, convertToRaw, RawDraftContentState } from "draft-js";
import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import CardSpacer from "@dastkari/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import { MultiAutocompleteChoiceType } from "@dastkari/components/MultiAutocompleteSelectField";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import SeoForm from "@dastkari/components/SeoForm";
import VisibilityCard from "@dastkari/components/VisibilityCard";
import useDateLocalize from "@dastkari/hooks/useDateLocalize";
import useFormset from "@dastkari/hooks/useFormset";
import useStateFromProps from "@dastkari/hooks/useStateFromProps";
import { sectionNames } from "@dastkari/intl";
import {
  getChoices,
  ProductAttributeValueChoices,
  ProductType
} from "@dastkari/products/utils/data";
import { SearchCategories_search_edges_node } from "@dastkari/searches/types/SearchCategories";
import { SearchCollections_search_edges_node } from "@dastkari/searches/types/SearchCollections";
import { SearchProductTypes_search_edges_node_productAttributes } from "@dastkari/searches/types/SearchProductTypes";
import createMultiAutocompleteSelectHandler from "@dastkari/utils/handlers/multiAutocompleteSelectChangeHandler";
import createSingleAutocompleteSelectHandler from "@dastkari/utils/handlers/singleAutocompleteSelectChangeHandler";
import { ProductErrorFragment } from "@dastkari/attributes/types/ProductErrorFragment";
import { SearchWarehouses_search_edges_node } from "@dastkari/searches/types/SearchWarehouses";
import { FetchMoreProps } from "../../../types";
import {
  createAttributeChangeHandler,
  createAttributeMultiChangeHandler,
  createProductTypeSelectHandler
} from "../../utils/handlers";
import ProductAttributes, {
  ProductAttributeInput,
  ProductAttributeInputData
} from "../ProductAttributes";
import ProductDetailsForm from "../ProductDetailsForm";
import ProductOrganization from "../ProductOrganization";
import ProductPricing from "../ProductPricing";
import ProductStocks, { ProductStockInput } from "../ProductStocks";
import ProductShipping from "../ProductShipping/ProductShipping";

interface FormData {
  basePrice: number;
  publicationDate: string;
  category: string;
  collections: string[];
  chargeTaxes: boolean;
  description: RawDraftContentState;
  isPublished: boolean;
  name: string;
  productType: string;
  seoDescription: string;
  seoTitle: string;
  sku: string;
  stockQuantity: number;
  trackInventory: boolean;
  weight: string;
}
export interface ProductCreatePageSubmitData extends FormData {
  attributes: ProductAttributeInput[];
  stocks: ProductStockInput[];
}

interface ProductCreatePageProps {
  errors: ProductErrorFragment[];
  collections: SearchCollections_search_edges_node[];
  categories: SearchCategories_search_edges_node[];
  currency: string;
  disabled: boolean;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  fetchMoreProductTypes: FetchMoreProps;
  productTypes?: Array<{
    id: string;
    name: string;
    hasVariants: boolean;
    productAttributes: SearchProductTypes_search_edges_node_productAttributes[];
  }>;
  header: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  weightUnit: string;
  warehouses: SearchWarehouses_search_edges_node[];
  fetchCategories: (data: string) => void;
  fetchCollections: (data: string) => void;
  fetchProductTypes: (data: string) => void;
  onBack?();
  onSubmit?(data: ProductCreatePageSubmitData);
}

export const ProductCreatePage: React.FC<ProductCreatePageProps> = ({
  currency,
  disabled,
  categories: categoryChoiceList,
  collections: collectionChoiceList,
  errors,
  fetchCategories,
  fetchCollections,
  fetchMoreCategories,
  fetchMoreCollections,
  fetchMoreProductTypes,
  header,
  productTypes: productTypeChoiceList,
  saveButtonBarState,
  warehouses,
  onBack,
  fetchProductTypes,
  weightUnit,
  onSubmit
}: ProductCreatePageProps) => {
  const intl = useIntl();
  const localizeDate = useDateLocalize();
  // Form values
  const {
    change: changeAttributeData,
    data: attributes,
    set: setAttributeData
  } = useFormset<ProductAttributeInputData>([]);
  const {
    add: addStock,
    change: changeStockData,
    data: stocks,
    remove: removeStock
  } = useFormset<null, string>([]);

  // Ensures that it will not change after component rerenders, because it
  // generates different block keys and it causes editor to lose its content.
  const initialDescription = React.useRef(
    convertToRaw(ContentState.createFromText(""))
  );
  const initialData: FormData = {
    basePrice: 0,
    category: "",
    chargeTaxes: false,
    collections: [],
    description: {} as any,
    isPublished: false,
    name: "",
    productType: "",
    publicationDate: "",
    seoDescription: "",
    seoTitle: "",
    sku: null,
    stockQuantity: null,
    trackInventory: false,
    weight: ""
  };

  // Display values
  const [selectedAttributes, setSelectedAttributes] = useStateFromProps<
    ProductAttributeValueChoices[]
  >([]);

  const [selectedCategory, setSelectedCategory] = useStateFromProps("");

  const [selectedCollections, setSelectedCollections] = useStateFromProps<
    MultiAutocompleteChoiceType[]
  >([]);

  const [productType, setProductType] = React.useState<ProductType>(null);

  const categories = getChoices(categoryChoiceList);
  const collections = getChoices(collectionChoiceList);
  const productTypes = getChoices(productTypeChoiceList);

  const handleSubmit = (data: FormData) =>
    onSubmit({
      attributes,
      stocks,
      ...data
    });

  return (
    <Form onSubmit={handleSubmit} initial={initialData} confirmLeave>
      {({ change, data, hasChanged, submit, triggerChange, toggleValue }) => {
        const handleCollectionSelect = createMultiAutocompleteSelectHandler(
          toggleValue,
          setSelectedCollections,
          selectedCollections,
          collections
        );
        const handleCategorySelect = createSingleAutocompleteSelectHandler(
          change,
          setSelectedCategory,
          categories
        );
        const handleAttributeChange = createAttributeChangeHandler(
          changeAttributeData,
          setSelectedAttributes,
          selectedAttributes,
          attributes,
          triggerChange
        );
        const handleAttributeMultiChange = createAttributeMultiChangeHandler(
          changeAttributeData,
          setSelectedAttributes,
          selectedAttributes,
          attributes,
          triggerChange
        );

        const handleProductTypeSelect = createProductTypeSelectHandler(
          change,
          setAttributeData,
          setSelectedAttributes,
          setProductType,
          productTypeChoiceList
        );

        return (
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.products)}
            </AppHeader>
            <PageHeader title={header} />
            <Grid>
              <div>
                <ProductDetailsForm
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  initialDescription={initialDescription.current}
                  onChange={change}
                />
                <CardSpacer />
                {attributes.length > 0 && (
                  <ProductAttributes
                    attributes={attributes}
                    disabled={disabled}
                    onChange={handleAttributeChange}
                    onMultiChange={handleAttributeMultiChange}
                  />
                )}
                <CardSpacer />
                <ProductPricing
                  currency={currency}
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                {!!productType && !productType.hasVariants && (
                  <>
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
                    <CardSpacer />
                  </>
                )}
                <SeoForm
                  helperText={intl.formatMessage({
                    defaultMessage:
                      "Add search engine title and description to make this product easier to find"
                  })}
                  title={data.seoTitle}
                  titlePlaceholder={data.name}
                  description={data.seoDescription}
                  descriptionPlaceholder={data.seoTitle}
                  loading={disabled}
                  onChange={change}
                />
              </div>
              <div>
                <ProductOrganization
                  canChangeType={true}
                  categories={categories}
                  categoryInputDisplayValue={selectedCategory}
                  collections={collections}
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  fetchCategories={fetchCategories}
                  fetchCollections={fetchCollections}
                  fetchMoreCategories={fetchMoreCategories}
                  fetchMoreCollections={fetchMoreCollections}
                  fetchMoreProductTypes={fetchMoreProductTypes}
                  fetchProductTypes={fetchProductTypes}
                  productType={productType}
                  productTypeInputDisplayValue={productType?.name || ""}
                  productTypes={productTypes}
                  onCategoryChange={handleCategorySelect}
                  onCollectionChange={handleCollectionSelect}
                  onProductTypeChange={handleProductTypeSelect}
                  collectionsInputDisplayValue={selectedCollections}
                />
                <CardSpacer />
                <VisibilityCard
                  data={data}
                  errors={errors}
                  disabled={disabled}
                  hiddenMessage={intl.formatMessage(
                    {
                      defaultMessage: "will be visible from {date}",
                      description: "product"
                    },
                    {
                      date: localizeDate(data.publicationDate)
                    }
                  )}
                  onChange={change}
                  visibleMessage={intl.formatMessage(
                    {
                      defaultMessage: "since {date}",
                      description: "product"
                    },
                    {
                      date: localizeDate(data.publicationDate)
                    }
                  )}
                />
              </div>
            </Grid>
            <SaveButtonBar
              onCancel={onBack}
              onSave={submit}
              state={saveButtonBarState}
              disabled={disabled || !onSubmit || !hasChanged}
            />
          </Container>
        );
      }}
    </Form>
  );
};
ProductCreatePage.displayName = "ProductCreatePage";
export default ProductCreatePage;
