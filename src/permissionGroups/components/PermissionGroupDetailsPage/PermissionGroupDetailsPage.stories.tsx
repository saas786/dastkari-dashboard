import React from "react";
import { permissions } from "@dastkari/fixtures";
import PermissionGroupDetailsPage, {
  PermissionGroupDetailsPageProps
} from "@dastkari/permissionGroups/components/PermissionGroupDetailsPage";
import Decorator from "@dastkari/storybook/Decorator";
import { storiesOf } from "@storybook/react";
import {
  emptyPermissionGroup,
  permissionGroup,
  users
} from "@dastkari/permissionGroups/fixtures";

const props: PermissionGroupDetailsPageProps = {
  disabled: false,
  errors: [],
  isChecked: () => false,
  members: users,
  membersModified: false,
  onAssign: () => undefined,
  onBack: () => undefined,
  onSort: () => undefined,
  onSubmit: () => undefined,
  onUnassign: () => undefined,
  permissionGroup,
  permissions,
  permissionsExceeded: false,
  saveButtonBarState: undefined,
  selected: 0,
  sort: null,
  toggle: () => undefined,
  toggleAll: () => undefined,
  toolbar: null
};

storiesOf("Views / Permission Groups / Permission Group Details", module)
  .addDecorator(Decorator)
  .add("default", () => <PermissionGroupDetailsPage {...props} />)
  .add("no members", () => (
    <PermissionGroupDetailsPage
      {...props}
      members={[]}
      permissionGroup={emptyPermissionGroup}
    />
  ))
  .add("loading", () => (
    <PermissionGroupDetailsPage
      {...props}
      disabled={true}
      permissionGroup={undefined}
      permissions={undefined}
    />
  ));
