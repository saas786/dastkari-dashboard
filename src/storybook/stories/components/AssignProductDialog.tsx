import { storiesOf } from "@storybook/react";
import React from "react";

import placeholderImage from "@assets/images/placeholder60x60.png";
import AssignProductDialog, {
  AssignProductDialogProps
} from "@dastkari/components/AssignProductDialog";
import { products } from "@dastkari/products/fixtures";
import Decorator from "../../Decorator";

const props: AssignProductDialogProps = {
  confirmButtonState: "default",
  loading: false,
  onClose: () => undefined,
  onFetch: () => undefined,
  onSubmit: () => undefined,
  open: true,
  products: products(placeholderImage)
};

storiesOf("Generics / Assign product", module)
  .addDecorator(Decorator)
  .add("default", () => <AssignProductDialog {...props} />);
