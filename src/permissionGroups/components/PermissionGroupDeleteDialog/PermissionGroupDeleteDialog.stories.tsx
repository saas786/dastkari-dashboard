import { storiesOf } from "@storybook/react";
import React from "react";

import PermissionGroupDeleteDialog, {
  PermissionDeleteDialogProps
} from "@dastkari/permissionGroups/components/PermissionGroupDeleteDialog";
import Decorator from "@dastkari/storybook/Decorator";
import { PermissionGroupErrorFragment } from "@dastkari/permissionGroups/types/PermissionGroupErrorFragment";
import { PermissionGroupErrorCode } from "@dastkari/types/globalTypes";

const permissionsError: PermissionGroupErrorFragment = {
  __typename: "PermissionGroupError",
  code: PermissionGroupErrorCode.OUT_OF_SCOPE_PERMISSION,
  field: null
};

const requiredError: PermissionGroupErrorFragment = {
  __typename: "PermissionGroupError",
  code: PermissionGroupErrorCode.REQUIRED,
  field: null
};

const props: PermissionDeleteDialogProps = {
  confirmButtonState: "default",
  name: "Full Access",
  onClose: () => undefined,
  onConfirm: () => undefined,
  open: true
};

storiesOf("Views / Permission Groups / Permission Group Delete", module)
  .addDecorator(Decorator)
  .add("remove single", () => <PermissionGroupDeleteDialog {...props} />)
  .add("Got permissions error", () => (
    <PermissionGroupDeleteDialog {...props} error={permissionsError} />
  ))
  .add("Get random permission group error", () => (
    <PermissionGroupDeleteDialog {...props} error={requiredError} />
  ));
