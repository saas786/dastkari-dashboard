import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CardTitle from "@dastkari/components/CardTitle";
import { FormSpacer } from "@dastkari/components/FormSpacer";
import { getFormErrors } from "@dastkari/utils/errors";
import getAccountErrorMessage from "@dastkari/utils/errors/account";
import { AccountErrorFragment } from "@dastkari/customers/types/AccountErrorFragment";

export interface CustomerCreateNoteProps {
  data: {
    note: string;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const CustomerCreateNote: React.FC<CustomerCreateNoteProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["note"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Notes",
          description: "notes about customer header"
        })}
      />
      <CardContent>
        <Typography>
          <FormattedMessage defaultMessage="Enter any extra infotmation regarding this customer." />
        </Typography>
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.note}
          fullWidth
          multiline
          name="note"
          helperText={getAccountErrorMessage(formErrors.note, intl)}
          label={intl.formatMessage({
            defaultMessage: "Note",
            description: "note about customer"
          })}
          value={data.note}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
CustomerCreateNote.displayName = "CustomerCreateNote";
export default CustomerCreateNote;