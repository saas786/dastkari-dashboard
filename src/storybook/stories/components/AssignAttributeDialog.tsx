import { storiesOf } from "@storybook/react";
import React from "react";

import { attributes } from "@dastkari/attributes/fixtures";
import { fetchMoreProps } from "@dastkari/fixtures";
import AssignAttributeDialog, {
  AssignAttributeDialogProps
} from "@dastkari/productTypes/components/AssignAttributeDialog";
import { formError } from "@dastkari/storybook/misc";
import Decorator from "../../Decorator";

const props: AssignAttributeDialogProps = {
  ...fetchMoreProps,
  attributes: attributes.slice(0, 5),
  confirmButtonState: "default",
  errors: [],
  onClose: () => undefined,
  onFetch: () => undefined,
  onOpen: () => undefined,
  onSubmit: () => undefined,
  onToggle: () => undefined,
  open: true,
  selected: [attributes[0].id, attributes[3].id]
};

storiesOf("Generics / Assign attributes dialog", module)
  .addDecorator(Decorator)
  .add("default", () => <AssignAttributeDialog {...props} />)
  .add("loading", () => (
    <AssignAttributeDialog {...props} attributes={undefined} loading={true} />
  ))
  .add("errors", () => (
    <AssignAttributeDialog {...props} errors={[formError("").message]} />
  ));
