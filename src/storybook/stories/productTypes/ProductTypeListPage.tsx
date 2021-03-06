import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductTypeListUrlSortField } from "@dastkari/productTypes/urls";
import {
  ProductTypeConfigurable,
  ProductTypeEnum
} from "@dastkari/types/globalTypes";
import {
  listActionsProps,
  pageListProps,
  searchPageProps,
  tabPageProps,
  sortPageProps,
  filterPageProps
} from "../../../fixtures";
import ProductTypeListPage, {
  ProductTypeListPageProps
} from "../../../productTypes/components/ProductTypeListPage";
import { productTypes } from "../../../productTypes/fixtures";
import Decorator from "../../Decorator";

const props: ProductTypeListPageProps = {
  ...listActionsProps,
  ...pageListProps.default,
  ...searchPageProps,
  ...sortPageProps,
  ...filterPageProps,
  filterOpts: {
    configurable: {
      active: false,
      value: ProductTypeConfigurable.CONFIGURABLE
    },
    type: {
      active: false,
      value: ProductTypeEnum.SHIPPABLE
    }
  },
  sort: {
    ...sortPageProps.sort,
    sort: ProductTypeListUrlSortField.name
  },
  ...tabPageProps,
  onBack: () => undefined,
  productTypes
};

storiesOf("Views / Product types / Product types list", module)
  .addDecorator(Decorator)
  .add("default", () => <ProductTypeListPage {...props} />)
  .add("loading", () => (
    <ProductTypeListPage {...props} disabled={true} productTypes={undefined} />
  ))
  .add("no data", () => <ProductTypeListPage {...props} productTypes={[]} />);
