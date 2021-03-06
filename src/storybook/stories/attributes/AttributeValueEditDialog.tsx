import { storiesOf } from "@storybook/react";
import React from "react";

import { attribute } from "@dastkari/attributes/fixtures";
import {
  AttributeValueType,
  ProductErrorCode
} from "@dastkari/types/globalTypes";
import AttributeValueEditDialog, {
  AttributeValueEditDialogProps
} from "../../../attributes/components/AttributeValueEditDialog";
import Decorator from "../../Decorator";

const props: AttributeValueEditDialogProps = {
  attributeValue: {
    ...attribute.values[0],
    type: AttributeValueType.STRING
  },
  confirmButtonState: "default",
  disabled: false,
  errors: [],
  onClose: () => undefined,
  onSubmit: () => undefined,
  open: true
};

storiesOf("Attributes / Attribute value edit", module)
  .addDecorator(Decorator)
  .add("default", () => <AttributeValueEditDialog {...props} />)
  .add("form errors", () => (
    <AttributeValueEditDialog
      {...props}
      errors={[
        {
          __typename: "ProductError",
          code: ProductErrorCode.INVALID,
          field: "name"
        }
      ]}
    />
  ));
