import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@dastkari/components/CardTitle";
import FormSpacer from "@dastkari/components/FormSpacer";
import { commonMessages } from "@dastkari/intl";
import { getFormErrors } from "@dastkari/utils/errors";
import { ShopErrorFragment } from "@dastkari/siteSettings/types/ShopErrorFragment";
import getShopErrorMessage from "@dastkari/utils/errors/shop";
import { SiteSettingsPageFormData } from "../SiteSettingsPage";

interface SiteSettingsDetailsProps {
  data: SiteSettingsPageFormData;
  errors: ShopErrorFragment[];
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const SiteSettingsDetails: React.FC<SiteSettingsDetailsProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["name", "domain", "description"], errors);

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
          name="name"
          label={intl.formatMessage({
            defaultMessage: "Name of your store"
          })}
          helperText={
            getShopErrorMessage(formErrors.name, intl) ||
            intl.formatMessage({
              defaultMessage:
                "Name of your store is shown on tab in web browser"
            })
          }
          value={data.name}
          onChange={onChange}
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.domain}
          fullWidth
          name="domain"
          label={intl.formatMessage({
            defaultMessage: "URL of your online store"
          })}
          helperText={getShopErrorMessage(formErrors.domain, intl)}
          value={data.domain}
          onChange={onChange}
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.description}
          fullWidth
          name="description"
          label={intl.formatMessage({
            defaultMessage: "Store Description"
          })}
          helperText={
            getShopErrorMessage(formErrors.description, intl) ||
            intl.formatMessage({
              defaultMessage:
                "Store description is shown on taskbar after your store name"
            })
          }
          value={data.description}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
SiteSettingsDetails.displayName = "SiteSettingsDetails";
export default SiteSettingsDetails;
