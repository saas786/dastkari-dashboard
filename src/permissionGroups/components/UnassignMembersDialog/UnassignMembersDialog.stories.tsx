import { storiesOf } from "@storybook/react";
import React from "react";
import UnassignMembersDialog, {
  UnassignMembersDialogProps
} from "@dastkari/permissionGroups/components/UnassignMembersDialog";
import Decorator from "@dastkari/storybook/Decorator";

const props: UnassignMembersDialogProps = {
  confirmButtonState: "default",
  onClose: () => undefined,
  onConfirm: () => undefined,
  open: true,
  quantity: 3
};

storiesOf(
  "Views / Permission Groups / Permission Group Unassign Member",
  module
)
  .addDecorator(Decorator)
  .add("Unassign members", () => <UnassignMembersDialog {...props} />);
