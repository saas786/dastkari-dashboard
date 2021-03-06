import { createIntl } from "react-intl";
import { stringify as stringifyQs } from "qs";

import { WebhookListUrlFilters } from "@dastkari/webhooks/urls";
import { createFilterStructure } from "@dastkari/webhooks/components/WebhooksListPage";
import { getFilterQueryParams } from "@dastkari/utils/filters";
import { getExistingKeys, setFilterOptsStatus } from "@test/filters";
import { config } from "@test/intl";
import { getFilterVariables, getFilterQueryParam } from "./filters";

describe("Filtering query params", () => {
  it("should be empty object if no params given", () => {
    const params: WebhookListUrlFilters = {};
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(0);
  });

  it("should not be empty object if params given", () => {
    const params: WebhookListUrlFilters = {
      active: false.toString()
    };
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(1);
  });
});

describe("Filtering URL params", () => {
  const intl = createIntl(config);

  const filters = createFilterStructure(intl, {
    isActive: {
      active: false,
      value: false
    }
  });

  it("should be empty if no active filters", () => {
    const filterQueryParams = getFilterQueryParams(
      filters,
      getFilterQueryParam
    );

    expect(getExistingKeys(filterQueryParams)).toHaveLength(0);
  });

  it("should not be empty if active filters are present", () => {
    const filterQueryParams = getFilterQueryParams(
      setFilterOptsStatus(filters, true),
      getFilterQueryParam
    );

    expect(filterQueryParams).toMatchSnapshot();
    expect(stringifyQs(filterQueryParams)).toMatchSnapshot();
  });
});
