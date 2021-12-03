import { ServiceAccountFilterInput } from "@dastkari/types/globalTypes";
import {
  ServiceListFilterOpts,
  ServiceFilterKeys
} from "@dastkari/services/components/ServiceListPage/filters";
import { maybe, parseBoolean } from "@dastkari/misc";
import { IFilterElement } from "@dastkari/components/Filter";
import {
  ServiceListUrlFilters,
  ServiceListUrlFiltersEnum,
  ServiceListUrlQueryParams
} from "../../urls";
import {
  createFilterTabUtils,
  createFilterUtils,
  getSingleValueQueryParam
} from "../../../utils/filters";

export const STAFF_FILTERS_KEY = "staffFilters";

export function getFilterOpts(
  params: ServiceListUrlFilters
): ServiceListFilterOpts {
  return {
    isActive: {
      active: maybe(() => params.active !== undefined, false),
      value:
        params.active !== undefined ? parseBoolean(params.active, true) : true
    }
  };
}

export function getFilterVariables(
  params: ServiceListUrlFilters
): ServiceAccountFilterInput {
  return {
    isActive:
      params.active !== undefined
        ? parseBoolean(params.active, true)
        : undefined,
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<ServiceFilterKeys>
): ServiceListUrlFilters {
  const { name } = filter;

  switch (name) {
    case ServiceFilterKeys.active:
      return getSingleValueQueryParam(filter, ServiceListUrlFiltersEnum.active);
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<ServiceListUrlFilters>(STAFF_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  ServiceListUrlQueryParams,
  ServiceListUrlFilters
>(ServiceListUrlFiltersEnum);
