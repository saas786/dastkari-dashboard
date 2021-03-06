import { storiesOf } from "@storybook/react";
import React from "react";

import Decorator from "@dastkari/storybook/Decorator";
import ServiceTokenDeleteDialog, {
  ServiceTokenDeleteDialogProps
} from "./ServiceTokenDeleteDialog";

const props: ServiceTokenDeleteDialogProps = {
  confirmButtonState: "default",
  name: "Slack",
  onClose: () => undefined,
  onConfirm: () => undefined,
  open: true
};

storiesOf("Views / Services / Token delete", module)
  .addDecorator(Decorator)
  .add("default", () => <ServiceTokenDeleteDialog {...props} />);
