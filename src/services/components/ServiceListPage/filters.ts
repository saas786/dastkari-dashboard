import { defineMessages, IntlShape } from "react-intl";

import { FilterOpts } from "@dastkari/types";
import { IFilter } from "@dastkari/components/Filter";
import { createBooleanField } from "@dastkari/utils/filters/fields";
import { commonMessages } from "@dastkari/intl";

export enum ServiceFilterKeys {
  active = "active"
}

export interface ServiceListFilterOpts {
  isActive: FilterOpts<boolean>;
}

const messages = defineMessages({
  active: {
    defaultMessage: "Active",
    description: "service account"
  },
  deactivated: {
    defaultMessage: "Inactive",
    description: "service account"
  }
});

export function createFilterStructure(
  intl: IntlShape,
  opts: ServiceListFilterOpts
): IFilter<ServiceFilterKeys> {
  return [
    {
      ...createBooleanField(
        ServiceFilterKeys.active,
        intl.formatMessage(commonMessages.status),
        opts.isActive.value,
        {
          negative: intl.formatMessage(messages.deactivated),
          positive: intl.formatMessage(messages.active)
        }
      ),
      active: opts.isActive.active
    }
  ];
}

export default messages;
