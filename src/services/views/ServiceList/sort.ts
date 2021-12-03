import { ServiceListUrlSortField } from "@dastkari/services/urls";
import { ServiceAccountSortField } from "@dastkari/types/globalTypes";
import { createGetSortQueryVariables } from "@dastkari/utils/sort";

export function getSortQueryField(
  sort: ServiceListUrlSortField
): ServiceAccountSortField {
  switch (sort) {
    case ServiceListUrlSortField.name:
      return ServiceAccountSortField.NAME;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
