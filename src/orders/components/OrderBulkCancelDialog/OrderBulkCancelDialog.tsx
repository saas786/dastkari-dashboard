import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ActionDialog from "@dastkari/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";

export interface OrderBulkCancelDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  numberOfOrders: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const OrderBulkCancelDialog: React.FC<OrderBulkCancelDialogProps> = ({
  confirmButtonState,
  numberOfOrders,
  open,
  onClose,
  onConfirm
}) => {
  const intl = useIntl();

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      variant="delete"
      title={intl.formatMessage({
        defaultMessage: "Cancel Orders",
        description: "dialog header"
      })}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <DialogContentText>
        <FormattedMessage
          defaultMessage="{counter,plural,one{Are you sure you want to cancel this order?} other{Are you sure you want to cancel {displayQuantity} orders?}}"
          values={{
            counter: numberOfOrders,
            displayQuantity: <strong>{numberOfOrders}</strong>
          }}
        />
      </DialogContentText>
    </ActionDialog>
  );
};
OrderBulkCancelDialog.displayName = "OrderBulkCancelDialog";
export default OrderBulkCancelDialog;
