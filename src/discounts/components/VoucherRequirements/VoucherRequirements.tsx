import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@dastkari/components/CardTitle";
import { FormSpacer } from "@dastkari/components/FormSpacer";
import RadioGroupField from "@dastkari/components/RadioGroupField";
import { RequirementsPicker } from "@dastkari/discounts/types";
import { DiscountErrorFragment } from "@dastkari/discounts/types/DiscountErrorFragment";
import { getFormErrors } from "@dastkari/utils/errors";
import getDiscountErrorMessage from "@dastkari/utils/errors/discounts";
import { FormData } from "../VoucherDetailsPage";

interface VoucherRequirementsProps {
  data: FormData;
  defaultCurrency: string;
  disabled: boolean;
  errors: DiscountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const VoucherRequirements = ({
  data,
  disabled,
  errors,
  onChange
}: VoucherRequirementsProps) => {
  const intl = useIntl();

  const formErrors = getFormErrors(
    ["minSpent", "minCheckoutItemsQuantity"],
    errors
  );

  const minimalOrderValueText = intl.formatMessage({
    defaultMessage: "Minimal order value",
    description: "voucher requirement"
  });
  const minimalQuantityText = intl.formatMessage({
    defaultMessage: "Minimum quantity of items",
    description: "voucher requirement"
  });

  const requirementsPickerChoices = [
    {
      label: intl.formatMessage({
        defaultMessage: "None",
        description: "voucher has no requirements"
      }),
      value: RequirementsPicker.NONE
    },
    {
      label: minimalOrderValueText,
      value: RequirementsPicker.ORDER
    },
    {
      label: minimalQuantityText,
      value: RequirementsPicker.ITEM
    }
  ];

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Minimum Requirements",
          description: "voucher requirements, header"
        })}
      />
      <CardContent>
        <RadioGroupField
          choices={requirementsPickerChoices}
          disabled={disabled}
          name={"requirementsPicker" as keyof FormData}
          value={data.requirementsPicker}
          onChange={onChange}
        />
        {[RequirementsPicker.ORDER, RequirementsPicker.ITEM].includes(
          data.requirementsPicker
        ) && <FormSpacer />}
        {data.requirementsPicker === RequirementsPicker.ORDER ? (
          <TextField
            disabled={disabled}
            error={!!formErrors.minSpent}
            helperText={getDiscountErrorMessage(formErrors.minSpent, intl)}
            label={minimalOrderValueText}
            name={"minSpent" as keyof FormData}
            value={data.minSpent}
            onChange={onChange}
            fullWidth
          />
        ) : data.requirementsPicker === RequirementsPicker.ITEM ? (
          <TextField
            disabled={disabled}
            error={!!formErrors.minCheckoutItemsQuantity}
            helperText={getDiscountErrorMessage(
              formErrors.minCheckoutItemsQuantity,
              intl
            )}
            label={minimalQuantityText}
            name={"minCheckoutItemsQuantity" as keyof FormData}
            value={data.minCheckoutItemsQuantity}
            onChange={onChange}
            fullWidth
          />
        ) : null}
      </CardContent>
    </Card>
  );
};
export default VoucherRequirements;
