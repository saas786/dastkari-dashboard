import { storiesOf } from "@storybook/react";
import React from "react";

import AttributePage, {
  AttributePageProps
} from "@dastkari/attributes/components/AttributePage";
import { attribute } from "@dastkari/attributes/fixtures";
import {
  AttributeInputTypeEnum,
  ProductErrorCode
} from "@dastkari/types/globalTypes";
import Decorator from "../../Decorator";

const props: AttributePageProps = {
  attribute,
  disabled: false,
  errors: [],
  onBack: () => undefined,
  onDelete: () => undefined,
  onSubmit: () => undefined,
  onValueAdd: () => undefined,
  onValueDelete: () => undefined,
  onValueReorder: () => undefined,
  onValueUpdate: () => undefined,
  saveButtonBarState: "default",
  values: attribute.values
};

storiesOf("Views / Attributes / Attribute details", module)
  .addDecorator(Decorator)
  .add("default", () => <AttributePage {...props} />)
  .add("loading", () => (
    <AttributePage
      {...props}
      attribute={undefined}
      disabled={true}
      values={undefined}
    />
  ))
  .add("no values", () => <AttributePage {...props} values={undefined} />)
  .add("form errors", () => (
    <AttributePage
      {...props}
      errors={["name", "slug", "storefrontSearchPosition"].map(field => ({
        __typename: "ProductError",
        code: ProductErrorCode.INVALID,
        field
      }))}
    />
  ))
  .add("multiple select input", () => (
    <AttributePage
      {...props}
      attribute={{
        ...attribute,
        inputType: AttributeInputTypeEnum.MULTISELECT
      }}
    />
  ))
  .add("create", () => <AttributePage {...props} attribute={null} />);
