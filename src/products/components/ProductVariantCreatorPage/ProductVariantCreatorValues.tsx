import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";

import ControlledCheckbox from "@dastkari/components/ControlledCheckbox";
import Debounce from "@dastkari/components/Debounce";
import Skeleton from "@dastkari/components/Skeleton";
import { ProductDetails_product_productType_variantAttributes } from "@dastkari/products/types/ProductDetails";
import { isSelected } from "@dastkari/utils/lists";
import CardTitle from "@dastkari/components/CardTitle";
import CardSpacer from "@dastkari/components/CardSpacer";
import { ProductVariantCreateFormData } from "./form";

export interface ProductVariantCreatorValuesProps {
  attributes: ProductDetails_product_productType_variantAttributes[];
  data: ProductVariantCreateFormData;
  onValueClick: (attributeId: string, valueId: string) => void;
}

const useStyles = makeStyles(
  theme => ({
    valueContainer: {
      display: "grid",
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: "repeat(5, 1fr)"
    }
  }),
  { name: "ProductVariantCreatorValues" }
);

const ProductVariantCreatorValues: React.FC<ProductVariantCreatorValuesProps> = props => {
  const { attributes, data, onValueClick } = props;
  const classes = useStyles(props);

  return (
    <>
      {attributes.map(attribute => (
        <React.Fragment key={attribute.id}>
          <Card>
            <CardTitle title={attribute?.name || <Skeleton />} />
            <CardContent className={classes.valueContainer}>
              {attribute.values.map(value => (
                <Debounce
                  debounceFn={() => onValueClick(attribute.id, value.slug)}
                  time={100}
                  key={value.slug}
                >
                  {change => (
                    <ControlledCheckbox
                      checked={isSelected(
                        value.slug,
                        data.attributes.find(
                          dataAttribute => attribute.id === dataAttribute.id
                        )?.values || [],
                        (a, b) => a === b
                      )}
                      name={`value:${value.slug}`}
                      label={value.name}
                      onChange={change}
                    />
                  )}
                </Debounce>
              ))}
            </CardContent>
          </Card>
          <CardSpacer />
        </React.Fragment>
      ))}
    </>
  );
};

ProductVariantCreatorValues.displayName = "ProductVariantCreatorValues";
export default ProductVariantCreatorValues;
