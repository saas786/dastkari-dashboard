import { PluginListUrlSortField } from "@dastkari/plugins/urls";
import { PluginSortField } from "@dastkari/types/globalTypes";
import { createGetSortQueryVariables } from "@dastkari/utils/sort";

export function getSortQueryField(
  sort: PluginListUrlSortField
): PluginSortField {
  switch (sort) {
    case PluginListUrlSortField.name:
      return PluginSortField.NAME;
    case PluginListUrlSortField.active:
      return PluginSortField.IS_ACTIVE;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
