import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@dastkari/components/ConfirmButton";
import Form from "@dastkari/components/Form";
import { buttonMessages } from "@dastkari/intl";
import { OrderErrorFragment } from "@dastkari/orders/types/OrderErrorFragment";
import getOrderErrorMessage from "@dastkari/utils/errors/order";
import { getFormErrors } from "@dastkari/utils/errors";
import FormSpacer from "@dastkari/components/FormSpacer";

export interface FormData {
  amount: number;
}

export interface OrderPaymentDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  initial: number;
  variant: "capture" | "refund";
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const OrderPaymentDialog: React.FC<OrderPaymentDialogProps> = ({
  confirmButtonState,
  errors,
  open,
  initial,
  variant,
  onClose,
  onSubmit
}) => {
  const intl = useIntl();

  const formFields = ["payment"];
  const formErrors = getFormErrors(formFields, errors);

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xs">
      <Form
        initial={{
          amount: initial
        }}
        onSubmit={onSubmit}
      >
        {({ data, change, submit }) => (
          <>
            <DialogTitle>
              {variant === "capture"
                ? intl.formatMessage({
                    defaultMessage: "Capture Payment",
                    description: "dialog header"
                  })
                : intl.formatMessage({
                    defaultMessage: "Refund Payment",
                    description: "dialog header"
                  })}
            </DialogTitle>
            <DialogContent>
              <TextField
                error={!!formErrors.payment}
                fullWidth
                helperText={getOrderErrorMessage(formErrors.payment, intl)}
                label={intl.formatMessage({
                  defaultMessage: "Amount",
                  description: "amount of refunded money"
                })}
                name="amount"
                onChange={change}
                inputProps={{
                  step: "0.01"
                }}
                type="number"
                value={data.amount}
              />
              {errors.length > 0 && (
                <>
                  <FormSpacer />
                  {errors
                    .filter(err => !formFields.includes(err.field))
                    .map(err => (
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
                transitionState={confirmButtonState}
                color="primary"
                variant="contained"
                onClick={submit}
              >
                <FormattedMessage {...buttonMessages.confirm} />
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};
OrderPaymentDialog.displayName = "OrderPaymentDialog";
export default OrderPaymentDialog;
