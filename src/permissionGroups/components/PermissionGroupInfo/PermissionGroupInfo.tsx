import React from "react";
import { useIntl } from "react-intl";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardTitle from "@dastkari/components/CardTitle";
import { FormChange } from "@dastkari/hooks/useForm";
import { commonMessages } from "@dastkari/intl";
import { PermissionGroupErrorFragment } from "@dastkari/permissionGroups/types/PermissionGroupErrorFragment";
import { getFieldError, getFormErrors } from "@dastkari/utils/errors";
import getPermissionGroupErrorMessage from "@dastkari/utils/errors/permissionGroups";

export interface PermissionGroupInfoProps {
  disabled: boolean;
  errors: PermissionGroupErrorFragment[];
  onChange: FormChange;
  data: {
    name: string;
  };
}

const PermissionGroupInfo: React.FC<PermissionGroupInfoProps> = ({
  disabled,
  onChange,
  data,
  errors
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["name"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      ></CardTitle>
      <CardContent>
        <TextField
          name="name"
          label={intl.formatMessage({
            defaultMessage: "Group name",
            description: "text field label"
          })}
          value={data.name}
          onChange={onChange}
          disabled={disabled}
          error={!!getFieldError(errors, "name")}
          helperText={getPermissionGroupErrorMessage(formErrors.name, intl)}
          fullWidth
        />
      </CardContent>
    </Card>
  );
};

PermissionGroupInfo.displayName = "PermissionGroupInfo";
export default PermissionGroupInfo;
