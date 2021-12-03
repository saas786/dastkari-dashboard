import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { CategoryFragment } from "@dastkari/categories/types/CategoryFragment";
import Container from "@dastkari/components/Container";
import PageHeader from "@dastkari/components/PageHeader";
import SearchBar from "@dastkari/components/SearchBar";
import { sectionNames } from "@dastkari/intl";
import {
  ListActions,
  PageListProps,
  SearchPageProps,
  TabPageProps,
  SortPage
} from "@dastkari/types";
import { CategoryListUrlSortField } from "@dastkari/categories/urls";
import CategoryList from "../CategoryList";

export interface CategoryTableProps
  extends PageListProps,
    ListActions,
    SearchPageProps,
    SortPage<CategoryListUrlSortField>,
    TabPageProps {
  categories: CategoryFragment[];
}

export const CategoryListPage: React.FC<CategoryTableProps> = ({
  categories,
  currentTab,
  disabled,
  initialSearch,
  isChecked,
  pageInfo,
  selected,
  settings,
  tabs,
  toggle,
  toggleAll,
  toolbar,
  onAdd,
  onAll,
  onNextPage,
  onPreviousPage,
  onRowClick,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  onUpdateListSettings,
  ...listProps
}) => {
  const intl = useIntl();

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.categories)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage
            defaultMessage="Create category"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        <SearchBar
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Categories",
            description: "tab name"
          })}
          currentTab={currentTab}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Category"
          })}
          tabs={tabs}
          onAll={onAll}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <CategoryList
          categories={categories}
          disabled={disabled}
          isChecked={isChecked}
          isRoot={true}
          pageInfo={pageInfo}
          selected={selected}
          settings={settings}
          toggle={toggle}
          toggleAll={toggleAll}
          toolbar={toolbar}
          onAdd={onAdd}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onRowClick={onRowClick}
          onUpdateListSettings={onUpdateListSettings}
          {...listProps}
        />
      </Card>
    </Container>
  );
};
CategoryListPage.displayName = "CategoryListPage";
export default CategoryListPage;
