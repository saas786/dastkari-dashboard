import { WarehouseListUrlSortField } from "@dastkari/warehouses/urls";
import { WarehouseSortField } from "@dastkari/types/globalTypes";
import { createGetSortQueryVariables } from "@dastkari/utils/sort";

export function getSortQueryField(
  sort: WarehouseListUrlSortField
): WarehouseSortField {
  switch (sort) {
    case WarehouseListUrlSortField.name:
      return WarehouseSortField.NAME;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
