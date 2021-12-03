import { MenuListUrlSortField } from "@dastkari/navigation/urls";
import { MenuSortField } from "@dastkari/types/globalTypes";
import { createGetSortQueryVariables } from "@dastkari/utils/sort";

export function getSortQueryField(sort: MenuListUrlSortField): MenuSortField {
  switch (sort) {
    case MenuListUrlSortField.name:
      return MenuSortField.NAME;
    case MenuListUrlSortField.items:
      return MenuSortField.ITEMS_COUNT;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
