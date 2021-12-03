import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@dastkari/components/CardTitle";
import { FormChange } from "@dastkari/hooks/useForm";
import { SaleType } from "@dastkari/types/globalTypes";
import { getFormErrors } from "@dastkari/utils/errors";
import getDiscountErrorMessage from "@dastkari/utils/errors/discounts";
import { DiscountErrorFragment } from "@dastkari/discounts/types/DiscountErrorFragment";
import { FormData } from "../SaleDetailsPage";

export interface SaleValueProps {
  currencySymbol: string;
  data: FormData;
  disabled: boolean;
  errors: DiscountErrorFragment[];
  onChange: FormChange;
}

const SaleValue: React.FC<SaleValueProps> = ({
  currencySymbol,
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["value"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Value",
          description: "sale value, header"
        })}
      />
      <CardContent>
        <TextField
          disabled={disabled}
          fullWidth
          label={intl.formatMessage({
            defaultMessage: "Discount Value",
            description: "sale discount"
          })}
          error={!!formErrors.value}
          name="value"
          InputProps={{
            endAdornment: data.type === SaleType.FIXED ? currencySymbol : "%"
          }}
          helperText={getDiscountErrorMessage(formErrors.value, intl)}
          value={data.value}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};

SaleValue.displayName = "SaleValue";
export default SaleValue;
