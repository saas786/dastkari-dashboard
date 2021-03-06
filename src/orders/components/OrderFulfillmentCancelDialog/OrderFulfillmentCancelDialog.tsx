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
import { buttonMessages } from "@dastkari/intl";
import { OrderErrorFragment } from "@dastkari/orders/types/OrderErrorFragment";
import FormSpacer from "@dastkari/components/FormSpacer";
import getOrderErrorMessage from "@dastkari/utils/errors/order";
import { WarehouseFragment } from "@dastkari/warehouses/types/WarehouseFragment";
import SingleAutocompleteSelectField from "@dastkari/components/SingleAutocompleteSelectField";
import createSingleAutocompleteSelectHandler from "@dastkari/utils/handlers/singleAutocompleteSelectChangeHandler";

export interface OrderFulfillmentCancelDialogFormData {
  warehouseId: string;
}

const useStyles = makeStyles(
  theme => ({
    enableOverflow: {
      overflow: "visible"
    },
    paragraph: {
      marginBottom: theme.spacing(2)
    },
    selectCcontainer: {
      width: "60%"
    }
  }),
  { name: "OrderFulfillmentCancelDialog" }
);

export interface OrderFulfillmentCancelDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  warehouses: WarehouseFragment[];
  onClose();
  onConfirm(data: OrderFulfillmentCancelDialogFormData);
}

const OrderFulfillmentCancelDialog: React.FC<OrderFulfillmentCancelDialogProps> = props => {
  const {
    confirmButtonState,
    errors,
    open,
    warehouses,
    onConfirm,
    onClose
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();
  const [displayValue, setDisplayValue] = React.useState("");

  const choices = warehouses?.map(warehouse => ({
    label: warehouse.name,
    value: warehouse.id
  }));

  return (
    <Dialog
      classes={{
        paper: classes.enableOverflow
      }}
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <Form initial={{ warehouseId: null }} onSubmit={onConfirm}>
        {({ change, data: formData, submit }) => {
          const handleChange = createSingleAutocompleteSelectHandler(
            change,
            setDisplayValue,
            choices
          );
          return (
            <>
              <DialogTitle>
                <FormattedMessage
                  defaultMessage="Cancel Fulfillment"
                  description="dialog header"
                />
              </DialogTitle>
              <DialogContent className={classes.enableOverflow}>
                <DialogContentText className={classes.paragraph}>
                  <FormattedMessage defaultMessage="Are you sure you want to cancel fulfillment? Canceling a fulfillment will restock products at a selected warehouse." />
                </DialogContentText>
                <div className={classes.selectCcontainer}>
                  <SingleAutocompleteSelectField
                    choices={choices}
                    displayValue={displayValue}
                    label={intl.formatMessage({
                      defaultMessage: "Select Warehouse",
                      description: "select warehouse to restock items"
                    })}
                    name="warehouseId"
                    value={formData.warehouseId}
                    onChange={handleChange}
                  />
                </div>
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
                  disabled={formData.warehouseId === null}
                  transitionState={confirmButtonState}
                  variant="contained"
                  onClick={submit}
                >
                  <FormattedMessage {...buttonMessages.accept} />
                </ConfirmButton>
              </DialogActions>
            </>
          );
        }}
      </Form>
    </Dialog>
  );
};
OrderFulfillmentCancelDialog.displayName = "OrderFulfillmentCancelDialog";
export default OrderFulfillmentCancelDialog;
