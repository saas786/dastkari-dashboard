import { storiesOf } from "@storybook/react";
import React from "react";

import { OrderErrorCode } from "@dastkari/types/globalTypes";
import { warehouseList } from "@dastkari/warehouses/fixtures";
import OrderFulfillmentCancelDialog, {
  OrderFulfillmentCancelDialogProps
} from "../../../orders/components/OrderFulfillmentCancelDialog";
import Decorator from "../../Decorator";

const props: OrderFulfillmentCancelDialogProps = {
  confirmButtonState: "default",
  errors: [],
  onClose: () => undefined,
  onConfirm: () => undefined,
  open: true,
  warehouses: warehouseList
};

storiesOf("Orders / OrderFulfillmentCancelDialog", module)
  .addDecorator(Decorator)
  .add("default", () => <OrderFulfillmentCancelDialog {...props} />)
  .add("error", () => (
    <OrderFulfillmentCancelDialog
      {...props}
      errors={[
        {
          __typename: "OrderError",
          code: OrderErrorCode.GRAPHQL_ERROR,
          field: null
        }
      ]}
    />
  ));
