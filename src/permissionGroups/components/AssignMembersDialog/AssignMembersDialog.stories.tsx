import { storiesOf } from "@storybook/react";
import React from "react";

import AssignMembersDialog, {
  AssignMembersDialogProps
} from "@dastkari/permissionGroups/components/AssignMembersDialog";
import Decorator from "@dastkari/storybook/Decorator";
import { users } from "../../fixtures";

const props: AssignMembersDialogProps = {
  confirmButtonState: "default",
  disabled: false,
  hasMore: true,
  initialSearch: "",
  loading: false,
  onClose: () => undefined,
  onFetchMore: () => undefined,
  onSearchChange: () => undefined,
  onSubmit: () => undefined,
  open: true,
  staffMembers: users
};

storiesOf(
  "Views / Permission Groups / Permission Group User Assignment",
  module
)
  .addDecorator(Decorator)
  .add("submitting loading", () => (
    <AssignMembersDialog
      {...props}
      confirmButtonState={"loading"}
      loading={false}
      disabled={true}
      staffMembers={[]}
    />
  ))
  .add("search loading", () => (
    <AssignMembersDialog {...props} loading={true} staffMembers={[]} />
  ))
  .add("default", () => <AssignMembersDialog {...props} />);
