import { storiesOf } from "@storybook/react";
import React from "react";
import Decorator from "@dastkari/storybook/Decorator";
import { SearchPermissionGroups_search_edges_node } from "@dastkari/searches/types/SearchPermissionGroups";
import { AccountErrorCode } from "@dastkari/types/globalTypes";
import { StaffErrorFragment } from "@dastkari/staff/types/StaffErrorFragment";
import { MultiAutocompleteChoiceType } from "../MultiAutocompleteSelectField";
import AccountPermissionGroups, { AccountPermissionGroupsProps } from ".";

const availablePermissionGroups: SearchPermissionGroups_search_edges_node[] = [
  {
    __typename: "Group",
    id: "R3JvdXA6MQ==",
    name: "Unmanagable by user",
    userCanManage: false
  },
  {
    __typename: "Group",
    id: "R3JvdXA6Mg==",
    name: "Default group",
    userCanManage: true
  },
  {
    __typename: "Group",
    id: "R3JvdXA6Mz==",
    name: "Translators",
    userCanManage: false
  },
  {
    __typename: "Group",
    id: "R3JvdXA6My==",
    name: "CMS",
    userCanManage: true
  }
];

const displayValues: MultiAutocompleteChoiceType[] = [
  { disabled: true, label: "Unmanagable by user", value: "R3JvdXA6MQ==" },
  { disabled: false, label: "Default group", value: "R3JvdXA6Mg==" }
];

const formData = {
  permissionGroups: ["R3JvdXA6MQ==", "R3JvdXA6Mg=="]
};

const errors: StaffErrorFragment[] = [
  {
    __typename: "StaffError",
    code: AccountErrorCode.OUT_OF_SCOPE_GROUP,
    field: "addGroups"
  }
];

const props: AccountPermissionGroupsProps = {
  availablePermissionGroups,
  disabled: false,
  displayValues,
  errors: [],
  formData,
  hasMore: false,
  initialSearch: "",
  loading: false,
  onChange: () => undefined,
  onFetchMore: () => undefined,
  onSearchChange: () => undefined
};

storiesOf("Generics / Account Permission Groups Widget", module)
  .addDecorator(Decorator)
  .add("default", () => <AccountPermissionGroups {...props} />)
  .add("error", () => <AccountPermissionGroups {...props} errors={errors} />);
