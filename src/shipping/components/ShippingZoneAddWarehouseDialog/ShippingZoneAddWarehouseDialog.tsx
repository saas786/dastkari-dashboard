import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import makeStyles from "@material-ui/core/styles/makeStyles";

import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@dastkari/components/ConfirmButton";
import { DialogProps } from "@dastkari/types";
import { AddressTypeInput } from "@dastkari/customers/types";
import useModalDialogOpen from "@dastkari/hooks/useModalDialogOpen";
import useModalDialogErrors from "@dastkari/hooks/useModalDialogErrors";
import CompanyAddressForm from "@dastkari/components/CompanyAddressInput/CompanyAddressForm";
import { buttonMessages } from "@dastkari/intl";
import Hr from "@dastkari/components/Hr";
import Form from "@dastkari/components/Form";
import useAddressValidation from "@dastkari/hooks/useAddressValidation";
import useStateFromProps from "@dastkari/hooks/useStateFromProps";
import { ShopInfo_shop_countries } from "@dastkari/components/Shop/types/ShopInfo";
import createSingleAutocompleteSelectHandler from "@dastkari/utils/handlers/singleAutocompleteSelectChangeHandler";
import FormSpacer from "@dastkari/components/FormSpacer";
import { WarehouseErrorFragment } from "@dastkari/warehouses/types/WarehouseErrorFragment";

export interface ShippingZoneAddWarehouseDialogSubmitData
  extends AddressTypeInput {
  name: string;
}
export interface ShippingZoneAddWarehouseDialogProps extends DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  countries: ShopInfo_shop_countries[];
  disabled: boolean;
  errors: WarehouseErrorFragment[];
  onSubmit: (data: ShippingZoneAddWarehouseDialogSubmitData) => void;
}

const initialForm: ShippingZoneAddWarehouseDialogSubmitData = {
  city: "",
  cityArea: "",
  companyName: "",
  country: "",
  countryArea: "",
  firstName: "",
  lastName: "",
  name: "",
  phone: "",
  postalCode: "",
  streetAddress1: "",
  streetAddress2: ""
};

const useStyles = makeStyles(
  {
    overflow: {
      overflowY: "visible"
    }
  },
  {
    name: "ShippingZoneAddWarehouseDialog"
  }
);

const ShippingZoneAddWarehouseDialog: React.FC<ShippingZoneAddWarehouseDialogProps> = ({
  confirmButtonState,
  countries,
  disabled,
  errors: apiErrors,
  open,
  onClose,
  onSubmit
}) => {
  const classes = useStyles({});
  const [countryDisplayName, setCountryDisplayName] = useStateFromProps("");
  const {
    errors: validationErrors,
    submit: handleSubmit
  } = useAddressValidation(onSubmit);
  const errors = useModalDialogErrors(
    [...apiErrors, ...validationErrors],
    open
  );
  useModalDialogOpen(open, {});
  const intl = useIntl();

  const countryChoices = countries.map(country => ({
    label: country.country,
    value: country.code
  }));

  return (
    <Dialog
      classes={{ paper: classes.overflow }}
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Create New Warehouse"
          description="header, dialog"
        />
      </DialogTitle>
      <Form initial={initialForm} onSubmit={handleSubmit}>
        {({ change, data }) => {
          const handleCountrySelect = createSingleAutocompleteSelectHandler(
            change,
            setCountryDisplayName,
            countryChoices
          );

          return (
            <>
              <DialogContent className={classes.overflow}>
                <TextField
                  fullWidth
                  label={intl.formatMessage({
                    defaultMessage: "Warehouse Name"
                  })}
                  name="name"
                  value={data.name}
                  onChange={change}
                />
                <FormSpacer />
                <Hr />
                <FormSpacer />
                <CompanyAddressForm
                  countries={countryChoices}
                  data={data}
                  disabled={disabled}
                  displayCountry={countryDisplayName}
                  errors={errors}
                  onChange={change}
                  onCountryChange={handleCountrySelect}
                />
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
                  <FormattedMessage {...buttonMessages.create} />
                </ConfirmButton>
              </DialogActions>
            </>
          );
        }}
      </Form>
    </Dialog>
  );
};

ShippingZoneAddWarehouseDialog.displayName = "ShippingZoneAddWarehouseDialog";
export default ShippingZoneAddWarehouseDialog;
