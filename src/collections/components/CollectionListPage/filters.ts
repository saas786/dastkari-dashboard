import { defineMessages, IntlShape } from "react-intl";

import { commonMessages } from "@dastkari/intl";
import { FilterOpts } from "@dastkari/types";
import { CollectionPublished } from "@dastkari/types/globalTypes";
import { IFilter } from "@dastkari/components/Filter";
import { createOptionsField } from "@dastkari/utils/filters/fields";

export interface CollectionListFilterOpts {
  status: FilterOpts<CollectionPublished>;
}

export enum CollectionFilterKeys {
  status = "status"
}

const messages = defineMessages({
  hidden: {
    defaultMessage: "Hidden",
    description: "collection"
  },
  published: {
    defaultMessage: "Published",
    description: "collection"
  }
});

export function createFilterStructure(
  intl: IntlShape,
  opts: CollectionListFilterOpts
): IFilter<CollectionFilterKeys> {
  return [
    {
      ...createOptionsField(
        CollectionFilterKeys.status,
        intl.formatMessage(commonMessages.status),
        [opts.status.value],
        false,
        [
          {
            label: intl.formatMessage(messages.published),
            value: CollectionPublished.PUBLISHED
          },
          {
            label: intl.formatMessage(messages.hidden),
            value: CollectionPublished.HIDDEN
          }
        ]
      ),
      active: opts.status.active
    }
  ];
}
