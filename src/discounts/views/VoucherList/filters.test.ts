import { createIntl } from "react-intl";
import { stringify as stringifyQs } from "qs";

import { VoucherListUrlFilters } from "@dastkari/discounts/urls";
import { createFilterStructure } from "@dastkari/discounts/components/VoucherListPage";
import { getFilterQueryParams } from "@dastkari/utils/filters";
import { date } from "@dastkari/fixtures";
import { getExistingKeys, setFilterOptsStatus } from "@test/filters";
import { config } from "@test/intl";
import {
  DiscountStatusEnum,
  VoucherDiscountType
} from "@dastkari/types/globalTypes";
import { getFilterVariables, getFilterQueryParam } from "./filters";

describe("Filtering query params", () => {
  it("should be empty object if no params given", () => {
    const params: VoucherListUrlFilters = {};
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(0);
  });

  it("should not be empty object if params given", () => {
    const params: VoucherListUrlFilters = {
      startedFrom: date.from,
      startedTo: date.to,
      status: [DiscountStatusEnum.ACTIVE, DiscountStatusEnum.EXPIRED],
      timesUsedFrom: date.from,
      timesUsedTo: date.to,
      type: [VoucherDiscountType.FIXED, VoucherDiscountType.SHIPPING]
    };
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(4);
  });
});

describe("Filtering URL params", () => {
  const intl = createIntl(config);

  const filters = createFilterStructure(intl, {
    saleType: {
      active: false,
      value: [VoucherDiscountType.FIXED, VoucherDiscountType.SHIPPING]
    },
    started: {
      active: false,
      value: {
        max: date.to,
        min: date.from
      }
    },
    status: {
      active: false,
      value: [DiscountStatusEnum.ACTIVE, DiscountStatusEnum.EXPIRED]
    },
    timesUsed: {
      active: false,
      value: {
        max: "6",
        min: "1"
      }
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
