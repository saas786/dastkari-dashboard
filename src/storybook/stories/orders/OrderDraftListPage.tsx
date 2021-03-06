import { storiesOf } from "@storybook/react";
import React from "react";

import { OrderDraftListUrlSortField } from "@dastkari/orders/urls";
import {
  listActionsProps,
  pageListProps,
  searchPageProps,
  tabPageProps,
  sortPageProps,
  filterPageProps
} from "../../../fixtures";
import OrderDraftListPage, {
  OrderDraftListPageProps
} from "../../../orders/components/OrderDraftListPage";
import { orders } from "../../../orders/fixtures";
import Decorator from "../../Decorator";

const props: OrderDraftListPageProps = {
  ...listActionsProps,
  ...pageListProps.default,
  ...searchPageProps,
  ...sortPageProps,
  ...tabPageProps,
  ...filterPageProps,
  filterOpts: {
    created: {
      active: false,
      value: {
        max: undefined,
        min: undefined
      }
    },
    customer: {
      active: false,
      value: undefined
    }
  },
  onAdd: () => undefined,
  orders,
  sort: {
    ...sortPageProps.sort,
    sort: OrderDraftListUrlSortField.number
  }
};

storiesOf("Views / Orders / Draft order list", module)
  .addDecorator(Decorator)
  .add("default", () => <OrderDraftListPage {...props} />)
  .add("loading", () => (
    <OrderDraftListPage {...props} disabled orders={undefined} />
  ))
  .add("when no data", () => <OrderDraftListPage {...props} orders={[]} />);
