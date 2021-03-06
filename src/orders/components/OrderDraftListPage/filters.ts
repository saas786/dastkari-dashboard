import { IntlShape, defineMessages } from "react-intl";

import { FilterOpts, MinMax } from "@dastkari/types";
import { createDateField, createTextField } from "@dastkari/utils/filters/fields";
import { IFilter } from "@dastkari/components/Filter";

export enum OrderDraftFilterKeys {
  created = "created",
  customer = "customer"
}

export interface OrderDraftListFilterOpts {
  created: FilterOpts<MinMax>;
  customer: FilterOpts<string>;
}

const messages = defineMessages({
  created: {
    defaultMessage: "Created",
    description: "draft order"
  },
  customer: {
    defaultMessage: "Customer",
    description: "draft order"
  }
});

export function createFilterStructure(
  intl: IntlShape,
  opts: OrderDraftListFilterOpts
): IFilter<OrderDraftFilterKeys> {
  return [
    {
      ...createDateField(
        OrderDraftFilterKeys.created,
        intl.formatMessage(messages.created),
        opts.created.value
      ),
      active: opts.created.active
    },
    {
      ...createTextField(
        OrderDraftFilterKeys.customer,
        intl.formatMessage(messages.customer),
        opts.customer.value
      ),
      active: opts.customer.active
    }
  ];
}
