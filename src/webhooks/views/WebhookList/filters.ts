import { WebhookFilterInput } from "@dastkari/types/globalTypes";
import {
  createFilterTabUtils,
  createFilterUtils,
  getSingleValueQueryParam
} from "@dastkari/utils/filters";
import { IFilterElement } from "@dastkari/components/Filter";
import {
  WebhookListFilterOpts,
  WebhookFilterKeys
} from "@dastkari/webhooks/components/WebhooksListPage";
import { parseBoolean, maybe } from "@dastkari/misc";
import {
  WebhookListUrlFilters,
  WebhookListUrlFiltersEnum,
  WebhookListUrlQueryParams
} from "../../urls";

export const WEBHOOK_FILTERS_KEY = "webhookFilters";

export function getFilterOpts(
  params: WebhookListUrlFilters
): WebhookListFilterOpts {
  return {
    isActive: {
      active: maybe(() => params.active !== undefined, false),
      value:
        params.active !== undefined ? parseBoolean(params.active, true) : true
    }
  };
}

export function getFilterVariables(
  params: WebhookListUrlFilters
): WebhookFilterInput {
  return {
    isActive: params.active
      ? parseBoolean(params.active, undefined)
      : undefined,
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<WebhookFilterKeys>
): WebhookListUrlFilters {
  const { name } = filter;

  switch (name) {
    case WebhookFilterKeys.isActive:
      return getSingleValueQueryParam(filter, WebhookListUrlFiltersEnum.active);
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<WebhookListUrlFilters>(WEBHOOK_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  WebhookListUrlQueryParams,
  WebhookListUrlFilters
>(WebhookListUrlFiltersEnum);
