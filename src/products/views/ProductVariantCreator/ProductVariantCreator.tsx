import React from "react";
import { useIntl } from "react-intl";

import { WindowTitle } from "@dastkari/components/WindowTitle";
import { useCreateMultipleVariantsData } from "@dastkari/products/queries";
import { useProductVariantBulkCreateMutation } from "@dastkari/products/mutations";
import useNavigator from "@dastkari/hooks/useNavigator";
import useNotifier from "@dastkari/hooks/useNotifier";
import { productUrl } from "@dastkari/products/urls";
import useShop from "@dastkari/hooks/useShop";
import ProductVariantCreatorPage from "../../components/ProductVariantCreatorPage";

interface ProductVariantCreatorProps {
  id: string;
}

const ProductVariantCreator: React.FC<ProductVariantCreatorProps> = ({
  id
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const { data } = useCreateMultipleVariantsData({
    displayLoader: true,
    variables: { id }
  });
  const [
    bulkProductVariantCreate,
    bulkProductVariantCreateOpts
  ] = useProductVariantBulkCreateMutation({
    onCompleted: data => {
      if (data.productVariantBulkCreate.errors.length === 0) {
        notify({
          text: intl.formatMessage({
            defaultMessage: "Successfully created variants",
            description: "success message"
          })
        });
        navigate(productUrl(id));
      }
    }
  });
  const shop = useShop();

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          defaultMessage: "Create Variants",
          description: "window title"
        })}
      />
      <ProductVariantCreatorPage
        defaultPrice={data?.product?.basePrice.amount.toString()}
        errors={
          bulkProductVariantCreateOpts.data?.productVariantBulkCreate.errors ||
          []
        }
        attributes={data?.product?.productType?.variantAttributes || []}
        currencySymbol={shop?.defaultCurrency}
        onSubmit={inputs =>
          bulkProductVariantCreate({
            variables: { id, inputs }
          })
        }
        warehouses={data?.warehouses.edges.map(edge => edge.node) || []}
      />
    </>
  );
};
ProductVariantCreator.displayName = "ProductVariantCreator";
export default ProductVariantCreator;
