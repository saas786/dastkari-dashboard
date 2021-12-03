import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@dastkari/components/ConfirmButton";
import Form from "@dastkari/components/Form";
import Money from "@dastkari/components/Money";
import { SingleSelectField } from "@dastkari/components/SingleSelectField";
import { buttonMessages } from "@dastkari/intl";
import { OrderErrorFragment } from "@dastkari/orders/types/OrderErrorFragment";
import useModalDialogErrors from "@dastkari/hooks/useModalDialogErrors";
import { getFormErrors } from "@dastkari/utils/errors";
import getOrderErrorMessage from "@dastkari/utils/errors/order";
import FormSpacer from "@dastkari/components/FormSpacer";
import { OrderDetails_order_availableShippingMethods } from "../../types/OrderDetails";

export interface FormData {
  shippingMethod: string;
}

const useStyles = makeStyles(
  theme => ({
    dialog: {
      overflowY: "visible"
    },
    menuItem: {
      display: "flex",
      width: "100%"
    },
    price: {
      marginRight: theme.spacing(3)
    },
    root: {
      overflowY: "visible",
      width: theme.breakpoints.values.sm
    },
    shippingMethodName: {
      flex: 1,
      overflowX: "hidden",
      textOverflow: "ellipsis"
    }
  }),
  { name: "OrderShippingMethodEditDialog" }
);

export interface OrderShippingMethodEditDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  shippingMethod: string;
  shippingMethods?: OrderDetails_order_availableShippingMethods[];
  onClose();
  onSubmit?(data: FormData);
}

const OrderShippingMethodEditDialog: React.FC<OrderShippingMethodEditDialogProps> = props => {
  const {
    confirmButtonState,
    errors: apiErrors,
    open,
    shippingMethod,
    shippingMethods,
    onClose,
    onSubmit
  } = props;
  const classes = useStyles(props);
  const errors = useModalDialogErrors(apiErrors, open);
  const intl = useIntl();

  const formFields = ["shippingMethod"];
  const formErrors = getFormErrors(formFields, errors);
  const nonFieldErrors = errors.filter(err => !formFields.includes(err.field));

  const choices = shippingMethods
    ? shippingMethods.map(s => ({
        label: (
          <div className={classes.menuItem}>
            <span className={classes.shippingMethodName}>{s.name}</span>
            &nbsp;
            <span className={classes.price}>
              <Money money={s.price} />
            </span>
          </div>
        ),
        value: s.id
      }))
    : [];
  const initialForm: FormData = {
    shippingMethod
  };

  return (
    <Dialog onClose={onClose} open={open} classes={{ paper: classes.dialog }}>
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Edit Shipping Method"
          description="dialog header"
        />
      </DialogTitle>
      <Form initial={initialForm} onSubmit={onSubmit}>
        {({ change, data }) => (
          <>
            <DialogContent className={classes.root}>
              <SingleSelectField
                choices={choices}
                error={!!formErrors.shippingMethod}
                hint={getOrderErrorMessage(formErrors.shippingMethod, intl)}
                name="shippingMethod"
                value={data.shippingMethod}
                onChange={change}
              />
              {nonFieldErrors.length > 0 && (
                <>
                  <FormSpacer />
                  {nonFieldErrors.map(err => (
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
                type="submit"
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
OrderShippingMethodEditDialog.displayName = "OrderShippingMethodEditDialog";
export default OrderShippingMethodEditDialog;