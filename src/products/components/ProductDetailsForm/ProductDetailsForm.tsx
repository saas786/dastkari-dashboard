import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { RawDraftContentState } from "draft-js";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@dastkari/components/CardTitle";
import FormSpacer from "@dastkari/components/FormSpacer";
import RichTextEditor from "@dastkari/components/RichTextEditor";
import { commonMessages } from "@dastkari/intl";
import { getFormErrors, getProductErrorMessage } from "@dastkari/utils/errors";
import { ProductErrorFragment } from "@dastkari/attributes/types/ProductErrorFragment";

interface ProductDetailsFormProps {
  data: {
    description: RawDraftContentState;
    name: string;
  };
  disabled?: boolean;
  errors: ProductErrorFragment[];
  // Draftail isn't controlled - it needs only initial input
  // because it's autosaving on its own.
  // Ref https://github.com/mirumee/dastkari/issues/4470
  initialDescription: RawDraftContentState;
  onChange(event: any);
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  data,
  disabled,
  errors,
  initialDescription,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["name", "descriptionJson"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          error={!!formErrors.name}
          helperText={getProductErrorMessage(formErrors.name, intl)}
          disabled={disabled}
          fullWidth
          label={intl.formatMessage({
            defaultMessage: "Name",
            description: "product name"
          })}
          name="name"
          value={data.name}
          onChange={onChange}
        />
        <FormSpacer />
        <RichTextEditor
          disabled={disabled}
          error={!!formErrors.descriptionJson}
          helperText={getProductErrorMessage(formErrors.descriptionJson, intl)}
          initial={initialDescription}
          label={intl.formatMessage(commonMessages.description)}
          name="description"
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
export default ProductDetailsForm;
