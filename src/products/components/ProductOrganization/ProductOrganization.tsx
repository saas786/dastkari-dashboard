import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CardSpacer from "@dastkari/components/CardSpacer";
import CardTitle from "@dastkari/components/CardTitle";
import { FormSpacer } from "@dastkari/components/FormSpacer";
import Hr from "@dastkari/components/Hr";
import MultiAutocompleteSelectField, {
  MultiAutocompleteChoiceType
} from "@dastkari/components/MultiAutocompleteSelectField";
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType
} from "@dastkari/components/SingleAutocompleteSelectField";
import { ChangeEvent } from "@dastkari/hooks/useForm";
import { maybe } from "@dastkari/misc";
import { FetchMoreProps } from "@dastkari/types";
import { getFormErrors, getProductErrorMessage } from "@dastkari/utils/errors";
import { ProductErrorFragment } from "@dastkari/attributes/types/ProductErrorFragment";

interface ProductType {
  hasVariants: boolean;
  id: string;
  name: string;
}

const useStyles = makeStyles(
  theme => ({
    card: {
      overflow: "visible"
    },
    cardSubtitle: {
      fontSize: "1rem",
      marginBottom: theme.spacing(0.5)
    },
    label: {
      marginBottom: theme.spacing(0.5)
    }
  }),
  { name: "ProductOrganization" }
);

interface ProductOrganizationProps {
  canChangeType: boolean;
  categories?: SingleAutocompleteChoiceType[];
  categoryInputDisplayValue: string;
  collections?: MultiAutocompleteChoiceType[];
  collectionsInputDisplayValue: MultiAutocompleteChoiceType[];
  data: {
    category: string;
    collections: string[];
    productType?: string;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  productType?: ProductType;
  productTypeInputDisplayValue?: string;
  productTypes?: SingleAutocompleteChoiceType[];
  fetchCategories: (query: string) => void;
  fetchCollections: (query: string) => void;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  fetchMoreProductTypes?: FetchMoreProps;
  fetchProductTypes?: (data: string) => void;
  onCategoryChange: (event: ChangeEvent) => void;
  onCollectionChange: (event: ChangeEvent) => void;
  onProductTypeChange?: (event: ChangeEvent) => void;
}

const ProductOrganization: React.FC<ProductOrganizationProps> = props => {
  const {
    canChangeType,
    categories,
    categoryInputDisplayValue,
    collections,
    collectionsInputDisplayValue,
    data,
    disabled,
    errors,
    fetchCategories,
    fetchCollections,
    fetchMoreCategories,
    fetchMoreCollections,
    fetchMoreProductTypes,
    fetchProductTypes,
    productType,
    productTypeInputDisplayValue,
    productTypes,
    onCategoryChange,
    onCollectionChange,
    onProductTypeChange
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(
    ["productType", "category", "collections"],
    errors
  );

  return (
    <Card className={classes.card}>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Organize Product",
          description: "section header"
        })}
      />
      <CardContent>
        {canChangeType ? (
          <SingleAutocompleteSelectField
            displayValue={productTypeInputDisplayValue}
            error={!!formErrors.productType}
            helperText={getProductErrorMessage(formErrors.productType, intl)}
            name="productType"
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "Product Type"
            })}
            choices={productTypes}
            value={data.productType}
            onChange={onProductTypeChange}
            fetchChoices={fetchProductTypes}
            data-tc="product-type"
            {...fetchMoreProductTypes}
          />
        ) : (
          <>
            <Typography className={classes.label} variant="caption">
              <FormattedMessage defaultMessage="Product Type" />
            </Typography>
            <Typography>{maybe(() => productType.name, "...")}</Typography>
            <CardSpacer />
            <Typography className={classes.label} variant="caption">
              <FormattedMessage defaultMessage="Product Type" />
            </Typography>
            <Typography>
              {maybe(
                () =>
                  productType.hasVariants
                    ? intl.formatMessage({
                        defaultMessage: "Configurable",
                        description: "product is configurable"
                      })
                    : intl.formatMessage({
                        defaultMessage: "Simple",
                        description: "product is not configurable"
                      }),
                "..."
              )}
            </Typography>
          </>
        )}
        <FormSpacer />
        <Hr />
        <FormSpacer />
        <SingleAutocompleteSelectField
          displayValue={categoryInputDisplayValue}
          error={!!formErrors.category}
          helperText={getProductErrorMessage(formErrors.category, intl)}
          disabled={disabled}
          label={intl.formatMessage({
            defaultMessage: "Category"
          })}
          choices={disabled ? [] : categories}
          name="category"
          value={data.category}
          onChange={onCategoryChange}
          fetchChoices={fetchCategories}
          data-tc="category"
          {...fetchMoreCategories}
        />
        <FormSpacer />
        <Hr />
        <FormSpacer />
        <MultiAutocompleteSelectField
          displayValues={collectionsInputDisplayValue}
          error={!!formErrors.collections}
          label={intl.formatMessage({
            defaultMessage: "Collections"
          })}
          choices={disabled ? [] : collections}
          name="collections"
          value={data.collections}
          helperText={
            getProductErrorMessage(formErrors.collections, intl) ||
            intl.formatMessage({
              defaultMessage:
                "*Optional. Adding product to collection helps users find it.",
              description: "field is optional"
            })
          }
          onChange={onCollectionChange}
          fetchChoices={fetchCollections}
          data-tc="collections"
          {...fetchMoreCollections}
        />
      </CardContent>
    </Card>
  );
};
ProductOrganization.displayName = "ProductOrganization";
export default ProductOrganization;
