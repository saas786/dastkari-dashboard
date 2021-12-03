import { StaffListUrlSortField } from "@dastkari/staff/urls";
import { UserSortField } from "@dastkari/types/globalTypes";
import { createGetSortQueryVariables } from "@dastkari/utils/sort";

export function getSortQueryField(sort: StaffListUrlSortField): UserSortField {
  switch (sort) {
    case StaffListUrlSortField.name:
      return UserSortField.LAST_NAME;
    case StaffListUrlSortField.email:
      return UserSortField.EMAIL;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
