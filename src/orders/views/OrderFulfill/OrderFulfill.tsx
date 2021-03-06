import { useIntl } from "react-intl";
import React from "react";

import { useOrderFulfillData } from "@dastkari/orders/queries";
import OrderFulfillPage from "@dastkari/orders/components/OrderFulfillPage";
import useNavigator from "@dastkari/hooks/useNavigator";
import { orderUrl } from "@dastkari/orders/urls";
import { useWarehouseList } from "@dastkari/warehouses/queries";
import { WindowTitle } from "@dastkari/components/WindowTitle";
import { useOrderFulfill } from "@dastkari/orders/mutations";
import useNotifier from "@dastkari/hooks/useNotifier";

export interface OrderFulfillProps {
  orderId: string;
}

const OrderFulfill: React.FC<OrderFulfillProps> = ({ orderId }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const { data, loading } = useOrderFulfillData({
    displayLoader: true,
    variables: {
      orderId
    }
  });
  const { data: warehouseData, loading: warehousesLoading } = useWarehouseList({
    displayLoader: true,
    variables: {
      first: 20
    }
  });
  const [fulfillOrder, fulfillOrderOpts] = useOrderFulfill({
    onCompleted: data => {
      if (data.orderFulfill.errors.length === 0) {
        navigate(orderUrl(orderId), true);
        notify({
          text: intl.formatMessage({
            defaultMessage: "Fulfilled Items",
            description: "order fulfilled success message"
          })
        });
      }
    }
  });

  return (
    <>
      <WindowTitle
        title={
          data?.order?.number
            ? intl.formatMessage(
                {
                  defaultMessage: "Fulfill Order #{orderNumber}",
                  description: "window title"
                },
                {
                  orderNumber: data.order.number
                }
              )
            : intl.formatMessage({
                defaultMessage: "Fulfill Order",
                description: "window title"
              })
        }
      />
      <OrderFulfillPage
        disabled={loading || warehousesLoading || fulfillOrderOpts.loading}
        errors={fulfillOrderOpts.data?.orderFulfill.errors}
        onBack={() => navigate(orderUrl(orderId))}
        onSubmit={formData =>
          fulfillOrder({
            variables: {
              input: {
                lines: formData.items.map(line => ({
                  orderLineId: line.id,
                  stocks: line.value
                })),
                notifyCustomer: formData.sendInfo
              },
              orderId
            }
          })
        }
        order={data?.order}
        saveButtonBar="default"
        warehouses={warehouseData?.warehouses.edges.map(edge => edge.node)}
      />
    </>
  );
};

OrderFulfill.displayName = "OrderFulfill";
export default OrderFulfill;
