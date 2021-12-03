import { storiesOf } from "@storybook/react";
import React from "react";
import { permissions } from "@dastkari/fixtures";

import PermissionGroupCreatePage, {
  PermissionGroupCreatePageProps
} from "@dastkari/permissionGroups/components/PermissionGroupCreatePage";
import Decorator from "@dastkari/storybook/Decorator";
import { errorsOfPermissionGroupCreate } from "@dastkari/permissionGroups/fixtures";

const props: PermissionGroupCreatePageProps = {
  disabled: false,
  errors: [],
  onBack: () => undefined,
  onSubmit: () => undefined,
  permissions,
  saveButtonBarState: undefined
};

storiesOf("Views / Permission Groups / Permission Group Create", module)
  .addDecorator(Decorator)
  .add("default", () => <PermissionGroupCreatePage {...props} />)
  .add("loading", () => (
    <PermissionGroupCreatePage {...props} disabled={true} />
  ))
  .add("errors", () => (
    <PermissionGroupCreatePage
      {...props}
      errors={errorsOfPermissionGroupCreate}
    />
  ));
