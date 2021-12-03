import { storiesOf } from "@storybook/react";
import React from "react";

import {
  listActionsProps,
  pageListProps,
  searchPageProps,
  tabPageProps,
  sortPageProps,
  filterPageProps
} from "@dastkari/fixtures";
import ServiceListPage, {
  ServiceListPageProps
} from "@dastkari/services/components/ServiceListPage";
import Decorator from "@dastkari/storybook/Decorator";
import { ServiceListUrlSortField } from "@dastkari/services/urls";
import { serviceList } from "../../fixtures";

const props: ServiceListPageProps = {
  ...listActionsProps,
  ...pageListProps.default,
  ...searchPageProps,
  ...sortPageProps,
  ...tabPageProps,
  ...filterPageProps,
  filterOpts: {
    isActive: {
      active: false,
      value: true
    }
  },
  onBack: () => undefined,
  onRemove: () => undefined,
  services: serviceList,
  sort: {
    ...sortPageProps.sort,
    sort: ServiceListUrlSortField.name
  }
};

storiesOf("Views / Services / Service list", module)
  .addDecorator(Decorator)
  .add("default", () => <ServiceListPage {...props} />)
  .add("loading", () => (
    <ServiceListPage {...props} disabled={true} services={undefined} />
  ))
  .add("no data", () => <ServiceListPage {...props} services={[]} />);
