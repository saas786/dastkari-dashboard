import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@dastkari/components/ConfirmButton";
import { buttonMessages } from "@dastkari/intl";
import { OrderErrorFragment } from "@dastkari/orders/types/OrderErrorFragment";
import FormSpacer from "@dastkari/components/FormSpacer";
import getOrderErrorMessage from "@dastkari/utils/errors/order";
import useModalDialogErrors from "@dastkari/hooks/useModalDialogErrors";

export interface OrderCancelDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  number: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const OrderCancelDialog: React.FC<OrderCancelDialogProps> = props => {
  const {
    confirmButtonState,
    errors: apiErrors,
    number: orderNumber,
    open,
    onSubmit,
    onClose
  } = props;

  const intl = useIntl();
  const errors = useModalDialogErrors(apiErrors, open);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Cancel Order"
          description="dialog header"
          id="OrderCancelDialogHeader"
        />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage
            defaultMessage="Cancelling this order will release unfulfilled stocks, so they can be bought by other customers. <b>Order will not be refunded when cancelling order - You need to do it manually.</b> Are you sure you want to cancel this order?"
            values={{
              b: (...chunks) => <b>{chunks}</b>,
              orderNumber
            }}
          />
        </DialogContentText>
        {errors.length > 0 && (
          <>
            <FormSpacer />
            {errors.map(err => (
              <DialogContentText color="error">
                {getOrderErrorMessage(err, intl)}
              </DialogContentText>
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <FormattedMessage {...buttonMessages.back} />
        </Button>
        <ConfirmButton
          onClick={onSubmit}
          transitionState={confirmButtonState}
          variant="contained"
          type="submit"
        >
          <FormattedMessage {...buttonMessages.accept} />
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
OrderCancelDialog.displayName = "OrderCancelDialog";
export default OrderCancelDialog;
