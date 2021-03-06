import { storiesOf } from "@storybook/react";
import React from "react";

import CategoryListPage, {
  CategoryTableProps
} from "@dastkari/categories/components/CategoryListPage";
import { categories } from "@dastkari/categories/fixtures";
import {
  listActionsProps,
  pageListProps,
  searchPageProps,
  tabPageProps,
  sortPageProps
} from "@dastkari/fixtures";
import { CategoryListUrlSortField } from "@dastkari/categories/urls";
import Decorator from "../../Decorator";

const categoryTableProps: CategoryTableProps = {
  categories,
  onAdd: undefined,
  onRowClick: () => undefined,
  ...listActionsProps,
  ...tabPageProps,
  ...pageListProps.default,
  ...searchPageProps,
  ...sortPageProps,
  sort: {
    ...sortPageProps.sort,
    sort: CategoryListUrlSortField.name
  }
};

storiesOf("Views / Categories / Category list", module)
  .addDecorator(Decorator)
  .add("default", () => <CategoryListPage {...categoryTableProps} />)
  .add("loading", () => (
    <CategoryListPage {...categoryTableProps} categories={undefined} />
  ))
  .add("empty", () => (
    <CategoryListPage {...categoryTableProps} categories={[]} />
  ));
