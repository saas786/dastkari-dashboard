import React from "react";
import { useIntl } from "react-intl";

import { WindowTitle } from "@dastkari/components/WindowTitle";
import useNavigator from "@dastkari/hooks/useNavigator";
import useNotifier from "@dastkari/hooks/useNotifier";
import useShop from "@dastkari/hooks/useShop";
import NotFoundPage from "@dastkari/components/NotFoundPage";
import { commonMessages } from "@dastkari/intl";
import { useWarehouseList } from "@dastkari/warehouses/queries";
import { decimal, weight } from "../../misc";
import ProductVariantCreatePage, {
  ProductVariantCreatePageSubmitData
} from "../components/ProductVariantCreatePage";
import { TypedVariantCreateMutation } from "../mutations";
import { TypedProductVariantCreateQuery } from "../queries";
import { VariantCreate } from "../types/VariantCreate";
import { productUrl, productVariantEditUrl, productListUrl } from "../urls";

interface ProductVariantCreateProps {
  productId: string;
}

export const ProductVariant: React.FC<ProductVariantCreateProps> = ({
  productId
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const shop = useShop();
  const intl = useIntl();
  const warehouses = useWarehouseList({
    displayLoader: true,
    variables: {
      first: 50
    }
  });

  return (
    <TypedProductVariantCreateQuery displayLoader variables={{ id: productId }}>
      {({ data, loading: productLoading }) => {
        const product = data?.product;

        if (product === null) {
          return <NotFoundPage onBack={() => navigate(productListUrl())} />;
        }

        const handleCreateSuccess = (data: VariantCreate) => {
          if (data.productVariantCreate.errors.length === 0) {
            notify({
              text: intl.formatMessage(commonMessages.savedChanges)
            });
            navigate(
              productVariantEditUrl(
                productId,
                data.productVariantCreate.productVariant.id
              )
            );
          }
        };

        return (
          <TypedVariantCreateMutation onCompleted={handleCreateSuccess}>
            {(variantCreate, variantCreateResult) => {
              const handleBack = () => navigate(productUrl(productId));
              const handleSubmit = (
                formData: ProductVariantCreatePageSubmitData
              ) =>
                variantCreate({
                  variables: {
                    input: {
                      attributes: formData.attributes
                        .filter(attribute => attribute.value !== "")
                        .map(attribute => ({
                          id: attribute.id,
                          values: [attribute.value]
                        })),
                      costPrice: decimal(formData.costPrice),
                      priceOverride: decimal(formData.priceOverride),
                      product: productId,
                      sku: formData.sku,
                      stocks: formData.stocks.map(stock => ({
                        quantity: parseInt(stock.value, 0),
                        warehouse: stock.id
                      })),
                      trackInventory: true,
                      weight: weight(formData.weight)
                    }
                  }
                });
              const handleVariantClick = (id: string) =>
                navigate(productVariantEditUrl(productId, id));

              const disableForm = productLoading || variantCreateResult.loading;

              return (
                <>
                  <WindowTitle
                    title={intl.formatMessage({
                      defaultMessage: "Create variant",
                      description: "window title"
                    })}
                  />
                  <ProductVariantCreatePage
                    currencySymbol={shop?.defaultCurrency}
                    disabled={disableForm}
                    errors={
                      variantCreateResult.data?.productVariantCreate.errors ||
                      []
                    }
                    header={intl.formatMessage({
                      defaultMessage: "Create Variant",
                      description: "header"
                    })}
                    product={data?.product}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    onVariantClick={handleVariantClick}
                    saveButtonBarState={variantCreateResult.status}
                    warehouses={
                      warehouses.data?.warehouses.edges.map(
                        edge => edge.node
                      ) || []
                    }
                    weightUnit={shop?.defaultWeightUnit}
                  />
                </>
              );
            }}
          </TypedVariantCreateMutation>
        );
      }}
    </TypedProductVariantCreateQuery>
  );
};
export default ProductVariant;
