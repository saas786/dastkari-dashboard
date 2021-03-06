import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ActionDialog from "@dastkari/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";

export interface ProductTypeDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  name: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ProductTypeDeleteDialog: React.FC<ProductTypeDeleteDialogProps> = ({
  confirmButtonState,
  open,
  name,
  onClose,
  onConfirm
}) => {
  const intl = useIntl();

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={intl.formatMessage({
        defaultMessage: "Delete Product Type",
        description: "dialog header"
      })}
    >
      <DialogContentText>
        <FormattedMessage
          defaultMessage="Are you sure you want to delete {name}?"
          description="delete product type"
          values={{
            name: <strong>{name}</strong>
          }}
        />
      </DialogContentText>
    </ActionDialog>
  );
};
ProductTypeDeleteDialog.displayName = "ProductTypeDeleteDialog";
export default ProductTypeDeleteDialog;
