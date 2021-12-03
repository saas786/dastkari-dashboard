import { defineMessages, IntlShape } from "react-intl";

import { FilterOpts } from "@dastkari/types";
import { createBooleanField } from "@dastkari/utils/filters/fields";
import { IFilter } from "@dastkari/components/Filter";
import { commonMessages } from "@dastkari/intl";

export enum WebhookFilterKeys {
  isActive = "isActive"
}

export interface WebhookListFilterOpts {
  isActive: FilterOpts<boolean>;
}

const messages = defineMessages({
  active: {
    defaultMessage: "Active",
    description: "webhook"
  },
  inactive: {
    defaultMessage: "Inactive",
    description: "webhook"
  }
});

export function createFilterStructure(
  intl: IntlShape,
  opts: WebhookListFilterOpts
): IFilter<WebhookFilterKeys> {
  return [
    {
      ...createBooleanField(
        WebhookFilterKeys.isActive,
        intl.formatMessage(commonMessages.status),
        opts.isActive.value,
        {
          negative: intl.formatMessage(messages.inactive),
          positive: intl.formatMessage(messages.active)
        }
      ),
      active: opts.isActive.active
    }
  ];
}
