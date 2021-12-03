import { PermissionGroupListUrlSortField } from "@dastkari/permissionGroups/urls";
import { PermissionGroupSortField } from "@dastkari/types/globalTypes";
import { createGetSortQueryVariables } from "@dastkari/utils/sort";

export function getSortQueryField(
  sort: PermissionGroupListUrlSortField
): PermissionGroupSortField {
  switch (sort) {
    case PermissionGroupListUrlSortField.name:
      return PermissionGroupSortField.NAME;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
