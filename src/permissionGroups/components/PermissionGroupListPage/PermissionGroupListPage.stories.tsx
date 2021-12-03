import { storiesOf } from "@storybook/react";
import React from "react";
import {
  listActionsProps,
  pageListProps,
  sortPageProps
} from "@dastkari/fixtures";

import PermissionGroupListPage, {
  PermissionGroupListPageProps
} from "@dastkari/permissionGroups/components/PermissionGroupListPage";
import Decorator from "@dastkari/storybook/Decorator";
import { PermissionGroupListUrlSortField } from "@dastkari/permissionGroups/urls";
import { permissionGroups } from "@dastkari/permissionGroups/fixtures";

const props: PermissionGroupListPageProps = {
  permissionGroups,
  ...listActionsProps,
  ...pageListProps.default,
  ...sortPageProps,
  disabled: false,
  onBack: () => undefined,
  onDelete: () => undefined,
  sort: {
    ...sortPageProps.sort,
    sort: PermissionGroupListUrlSortField.name
  }
};

storiesOf("Views / Permission Groups / Permission Group List", module)
  .addDecorator(Decorator)
  .add("default", () => <PermissionGroupListPage {...props} />)
  .add("loading", () => (
    <PermissionGroupListPage
      {...props}
      permissionGroups={undefined}
      disabled={true}
    />
  ))
  .add("no data", () => (
    <PermissionGroupListPage {...props} permissionGroups={[]} disabled={true} />
  ));
