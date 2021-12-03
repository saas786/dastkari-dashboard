import { CustomerListUrlSortField } from "@dastkari/customers/urls";
import { UserSortField } from "@dastkari/types/globalTypes";
import { createGetSortQueryVariables } from "@dastkari/utils/sort";

export function getSortQueryField(
  sort: CustomerListUrlSortField
): UserSortField {
  switch (sort) {
    case CustomerListUrlSortField.email:
      return UserSortField.EMAIL;
    case CustomerListUrlSortField.name:
      return UserSortField.LAST_NAME;
    case CustomerListUrlSortField.orders:
      return UserSortField.ORDER_COUNT;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
