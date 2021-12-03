import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import Button from "@material-ui/core/Button";
import CardTitle from "@dastkari/components/CardTitle";
import { commonMessages } from "@dastkari/intl";
import { DiscountErrorFragment } from "@dastkari/discounts/types/DiscountErrorFragment";
import { getFormErrors } from "@dastkari/utils/errors";
import getDiscountErrorMessage from "@dastkari/utils/errors/discounts";
import { FormData } from "../VoucherDetailsPage";
import { generateCode } from "../../../misc";

interface VoucherInfoProps {
  data: FormData;
  errors: DiscountErrorFragment[];
  disabled: boolean;
  variant: "create" | "update";
  onChange: (event: any) => void;
}

const VoucherInfo = ({
  data,
  disabled,
  errors,
  variant,
  onChange
}: VoucherInfoProps) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["code"], errors);

  const onGenerateCode = () =>
    onChange({
      target: {
        name: "code",
        value: generateCode(10)
      }
    });

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
        toolbar={
          variant === "create" && (
            <Button color="primary" onClick={onGenerateCode}>
              <FormattedMessage
                defaultMessage="Generate Code"
                description="voucher code, button"
              />
            </Button>
          )
        }
      />
      <CardContent>
        <TextField
          disabled={variant === "update" || disabled}
          error={!!formErrors.code}
          fullWidth
          helperText={getDiscountErrorMessage(formErrors.code, intl)}
          name={"code" as keyof FormData}
          label={intl.formatMessage({
            defaultMessage: "Discount Code"
          })}
          value={data.code}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
export default VoucherInfo;
