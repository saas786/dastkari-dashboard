import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { FormattedMessage } from "react-intl";

import { buttonMessages } from "@dastkari/intl";
import { DialogProps } from "@dastkari/types";

const useStyles = makeStyles(
  theme => ({
    button: {
      backgroundColor: theme.palette.error.main
    }
  }),
  {
    name: "OrderCannotCancelOrderDialog"
  }
);

const OrderCannotCancelOrderDialog: React.FC<DialogProps> = ({
  open,
  onClose
}) => {
  const classes = useStyles({});

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Dastkari couldn’t cancel order"
          description="dialog header"
        />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage defaultMessage="There are still fulfillments created for this order. Cancel the fulfillments first before you cancel the order." />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className={classes.button}
          onClick={onClose}
        >
          <FormattedMessage {...buttonMessages.ok} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
OrderCannotCancelOrderDialog.displayName = "OrderCannotCancelOrderDialog";
export default OrderCannotCancelOrderDialog;
