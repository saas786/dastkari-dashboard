import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import AddressEdit from "@dastkari/components/AddressEdit";
import CardTitle from "@dastkari/components/CardTitle";
import { FormSpacer } from "@dastkari/components/FormSpacer";
import { SingleAutocompleteChoiceType } from "@dastkari/components/SingleAutocompleteSelectField";
import { AccountErrorFragment } from "@dastkari/customers/types/AccountErrorFragment";
import { AddressTypeInput } from "../../types";

const useStyles = makeStyles(
  {
    overflow: {
      overflow: "visible"
    }
  },
  { name: "CustomerCreateAddress" }
);

export interface CustomerCreateAddressProps {
  countries: SingleAutocompleteChoiceType[];
  countryDisplayName: string;
  data: AddressTypeInput;
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange(event: React.ChangeEvent<any>);
  onCountryChange(event: React.ChangeEvent<any>);
}

const CustomerCreateAddress: React.FC<CustomerCreateAddressProps> = props => {
  const {
    countries,
    countryDisplayName,
    data,
    disabled,
    errors,
    onChange,
    onCountryChange
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card className={classes.overflow}>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Primary Address",
          description: "page header"
        })}
      />
      <CardContent className={classes.overflow}>
        <Typography>
          <FormattedMessage defaultMessage="The primary address of this customer." />
        </Typography>
        <FormSpacer />
        <AddressEdit
          countries={countries}
          data={data}
          disabled={disabled}
          countryDisplayValue={countryDisplayName}
          errors={errors}
          onChange={onChange}
          onCountryChange={onCountryChange}
        />
      </CardContent>
    </Card>
  );
};
CustomerCreateAddress.displayName = "CustomerCreateAddress";
export default CustomerCreateAddress;
