import { PluginFilterInput } from "@dastkari/types/globalTypes";
import {
  PluginListFilterOpts,
  PluginFilterKeys
} from "@dastkari/plugins/components/PluginsListPage";
import { maybe, parseBoolean } from "@dastkari/misc";
import { IFilterElement } from "@dastkari/components/Filter";
import {
  PluginListUrlFilters,
  PluginListUrlFiltersEnum,
  PluginListUrlQueryParams
} from "../../urls";
import {
  createFilterTabUtils,
  createFilterUtils,
  getSingleValueQueryParam
} from "../../../utils/filters";

export const PLUGIN_FILTERS_KEY = "pluginFilters";

export function getFilterOpts(
  params: PluginListUrlFilters
): PluginListFilterOpts {
  return {
    isActive: {
      active: maybe(() => params.active !== undefined, false),
      value:
        params.active !== undefined ? parseBoolean(params.active, true) : true
    }
  };
}

export function getFilterVariables(
  params: PluginListUrlFilters
): PluginFilterInput {
  return {
    active:
      params.active !== undefined
        ? parseBoolean(params.active, true)
        : undefined,
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<PluginFilterKeys>
): PluginListUrlFilters {
  const { name } = filter;

  switch (name) {
    case PluginFilterKeys.active:
      return getSingleValueQueryParam(filter, PluginListUrlFiltersEnum.active);
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<PluginListUrlFilters>(PLUGIN_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  PluginListUrlQueryParams,
  PluginListUrlFilters
>(PluginListUrlFiltersEnum);
