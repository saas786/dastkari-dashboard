import { storiesOf } from "@storybook/react";
import React from "react";

import {
  pageListProps,
  tabPageProps,
  sortPageProps,
  searchPageProps
} from "@dastkari/fixtures";
import WarehouseListPage, {
  WarehouseListPageProps
} from "@dastkari/warehouses/components/WarehouseListPage";
import Decorator from "@dastkari/storybook/Decorator";
import { WarehouseListUrlSortField } from "@dastkari/warehouses/urls";
import { warehouseList } from "../../fixtures";

const props: WarehouseListPageProps = {
  ...pageListProps.default,
  ...searchPageProps,
  ...sortPageProps,
  ...tabPageProps,
  onBack: () => undefined,
  onRemove: () => undefined,
  sort: {
    ...sortPageProps.sort,
    sort: WarehouseListUrlSortField.name
  },
  warehouses: warehouseList
};

storiesOf("Views / Warehouses / Warehouse list", module)
  .addDecorator(Decorator)
  .add("default", () => <WarehouseListPage {...props} />)
  .add("loading", () => (
    <WarehouseListPage {...props} disabled={true} warehouses={undefined} />
  ))
  .add("no data", () => <WarehouseListPage {...props} warehouses={[]} />);
