import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl, IntlShape } from "react-intl";

import FormSpacer from "@dastkari/components/FormSpacer";
import Grid from "@dastkari/components/Grid";
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType
} from "@dastkari/components/SingleAutocompleteSelectField";
import { AddressTypeInput } from "@dastkari/customers/types";
import { ChangeEvent } from "@dastkari/hooks/useForm";
import getShopErrorMessage from "@dastkari/utils/errors/shop";
import { getFormErrors } from "@dastkari/utils/errors";
import { ShopErrorFragment } from "@dastkari/siteSettings/types/ShopErrorFragment";
import { AccountErrorFragment } from "@dastkari/customers/types/AccountErrorFragment";
import getAccountErrorMessage from "@dastkari/utils/errors/account";
import getWarehouseErrorMessage from "@dastkari/utils/errors/warehouse";
import { WarehouseErrorFragment } from "@dastkari/warehouses/types/WarehouseErrorFragment";

export interface CompanyAddressFormProps {
  countries: SingleAutocompleteChoiceType[];
  data: AddressTypeInput;
  displayCountry: string;
  errors: Array<
    AccountErrorFragment | ShopErrorFragment | WarehouseErrorFragment
  >;
  disabled: boolean;
  onChange: (event: ChangeEvent) => void;
  onCountryChange: (event: ChangeEvent) => void;
}

const useStyles = makeStyles(
  {
    root: {}
  },
  { name: "CompanyAddressForm" }
);

function getErrorMessage(
  err: AccountErrorFragment | ShopErrorFragment | WarehouseErrorFragment,
  intl: IntlShape
): string {
  switch (err?.__typename) {
    case "AccountError":
      return getAccountErrorMessage(err, intl);
    case "WarehouseError":
      return getWarehouseErrorMessage(err, intl);
    default:
      return getShopErrorMessage(err, intl);
  }
}

const CompanyAddressForm: React.FC<CompanyAddressFormProps> = props => {
  const {
    countries,
    data,
    disabled,
    displayCountry,
    errors,
    onChange,
    onCountryChange
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formFields = [
    "companyName",
    "streetAddress1",
    "streetAddress2",
    "city",
    "postalCode",
    "country",
    "countryArea",
    "companyArea",
    "phone"
  ];
  const formErrors = getFormErrors(formFields, errors);

  return (
    <div className={classes.root}>
      <TextField
        disabled={disabled}
        error={!!formErrors.companyName}
        helperText={getErrorMessage(formErrors.companyName, intl)}
        label={intl.formatMessage({
          defaultMessage: "Company"
        })}
        name={"companyName" as keyof AddressTypeInput}
        onChange={onChange}
        value={data.companyName}
        fullWidth
      />
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!formErrors.streetAddress1}
        helperText={getErrorMessage(formErrors.streetAddress1, intl)}
        label={intl.formatMessage({
          defaultMessage: "Address line 1"
        })}
        name={"streetAddress1" as keyof AddressTypeInput}
        onChange={onChange}
        value={data.streetAddress1}
        fullWidth
      />
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!formErrors.streetAddress2}
        helperText={getErrorMessage(formErrors.streetAddress2, intl)}
        label={intl.formatMessage({
          defaultMessage: "Address line 2"
        })}
        name={"streetAddress2" as keyof AddressTypeInput}
        onChange={onChange}
        value={data.streetAddress2}
        fullWidth
      />
      <FormSpacer />
      <Grid>
        <TextField
          disabled={disabled}
          error={!!formErrors.city}
          helperText={getErrorMessage(formErrors.city, intl)}
          label={intl.formatMessage({
            defaultMessage: "City"
          })}
          name={"city" as keyof AddressTypeInput}
          onChange={onChange}
          value={data.city}
          fullWidth
        />
        <TextField
          disabled={disabled}
          error={!!formErrors.postalCode}
          helperText={getErrorMessage(formErrors.postalCode, intl)}
          label={intl.formatMessage({
            defaultMessage: "ZIP / Postal code"
          })}
          name={"postalCode" as keyof AddressTypeInput}
          onChange={onChange}
          value={data.postalCode}
          fullWidth
        />
      </Grid>
      <FormSpacer />
      <Grid>
        <SingleAutocompleteSelectField
          disabled={disabled}
          displayValue={displayCountry}
          error={!!formErrors.country}
          helperText={getErrorMessage(formErrors.country, intl)}
          label={intl.formatMessage({
            defaultMessage: "Country"
          })}
          name={"country" as keyof AddressTypeInput}
          onChange={onCountryChange}
          value={data.country}
          choices={countries}
          InputProps={{
            inputProps: {
              autocomplete: "plsdontautocomplete" // Somehow it shuts it down
            }
          }}
        />
        <TextField
          disabled={disabled}
          error={!!formErrors.countryArea}
          helperText={getErrorMessage(formErrors.countryArea, intl)}
          label={intl.formatMessage({
            defaultMessage: "Country area"
          })}
          name={"countryArea" as keyof AddressTypeInput}
          onChange={onChange}
          value={data.countryArea}
          fullWidth
        />
      </Grid>
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!formErrors.phone}
        fullWidth
        helperText={getErrorMessage(formErrors.phone, intl)}
        label={intl.formatMessage({
          defaultMessage: "Phone"
        })}
        name={"phone" as keyof AddressTypeInput}
        value={data.phone}
        onChange={onChange}
      />
    </div>
  );
};
CompanyAddressForm.displayName = "CompanyAddressForm";
export default CompanyAddressForm;
