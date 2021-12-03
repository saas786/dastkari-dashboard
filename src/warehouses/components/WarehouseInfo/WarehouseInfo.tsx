import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { useIntl } from "react-intl";

import CardTitle from "@dastkari/components/CardTitle";
import { commonMessages } from "@dastkari/intl";
import { FormChange } from "@dastkari/hooks/useForm";
import { getFormErrors } from "@dastkari/utils/errors";
import { WarehouseErrorFragment } from "@dastkari/warehouses/types/WarehouseErrorFragment";
import getWarehouseErrorMessage from "@dastkari/utils/errors/warehouse";

export interface WarehouseInfoProps {
  data: Record<"name", string>;
  disabled: boolean;
  errors: WarehouseErrorFragment[];
  onChange: FormChange;
}

const WarehouseInfo: React.FC<WarehouseInfoProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["name"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          fullWidth
          helperText={getWarehouseErrorMessage(formErrors.name, intl)}
          label={intl.formatMessage({
            defaultMessage: "Warehouse Name"
          })}
          name={"name" as keyof typeof data}
          value={data.name}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};

WarehouseInfo.displayName = "WarehouseInfo";
export default WarehouseInfo;
