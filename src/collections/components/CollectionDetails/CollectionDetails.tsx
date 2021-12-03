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
import { maybe } from "@dastkari/misc";
import { getProductErrorMessage, getFormErrors } from "@dastkari/utils/errors";
import { ProductErrorFragment } from "@dastkari/attributes/types/ProductErrorFragment";
import { CollectionDetails_collection } from "../../types/CollectionDetails";

export interface CollectionDetailsProps {
  collection?: CollectionDetails_collection;
  data: {
    description: RawDraftContentState;
    name: string;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const CollectionDetails: React.FC<CollectionDetailsProps> = ({
  collection,
  disabled,
  data,
  onChange,
  errors
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
          label={intl.formatMessage({
            defaultMessage: "Name",
            description: "collection name"
          })}
          name="name"
          disabled={disabled}
          value={data.name}
          onChange={onChange}
          error={!!formErrors.name}
          helperText={getProductErrorMessage(formErrors.name, intl)}
          fullWidth
        />
        <FormSpacer />
        <RichTextEditor
          error={!!formErrors.descriptionJson}
          helperText={getProductErrorMessage(formErrors.descriptionJson, intl)}
          initial={maybe(() => JSON.parse(collection.descriptionJson))}
          label={intl.formatMessage(commonMessages.description)}
          name="description"
          disabled={disabled}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
export default CollectionDetails;
