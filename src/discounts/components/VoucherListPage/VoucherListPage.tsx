import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import Container from "@dastkari/components/Container";
import PageHeader from "@dastkari/components/PageHeader";
import FilterBar from "@dastkari/components/FilterBar";
import { sectionNames } from "@dastkari/intl";
import {
  ListActions,
  PageListProps,
  TabPageProps,
  SortPage,
  FilterPageProps
} from "@dastkari/types";
import { VoucherListUrlSortField } from "@dastkari/discounts/urls";
import { VoucherList_vouchers_edges_node } from "../../types/VoucherList";
import VoucherList from "../VoucherList";
import {
  VoucherFilterKeys,
  VoucherListFilterOpts,
  createFilterStructure
} from "./filters";

export interface VoucherListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<VoucherFilterKeys, VoucherListFilterOpts>,
    SortPage<VoucherListUrlSortField>,
    TabPageProps {
  defaultCurrency: string;
  vouchers: VoucherList_vouchers_edges_node[];
}

const VoucherListPage: React.FC<VoucherListPageProps> = ({
  currencySymbol,
  currentTab,
  filterOpts,
  initialSearch,
  onAdd,
  onAll,
  onFilterChange,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  tabs,
  ...listProps
}) => {
  const intl = useIntl();

  const structure = createFilterStructure(intl, filterOpts);

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.vouchers)}>
        <Button onClick={onAdd} variant="contained" color="primary">
          <FormattedMessage
            defaultMessage="Create voucher"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Vouchers",
            description: "tab name"
          })}
          currencySymbol={currencySymbol}
          currentTab={currentTab}
          filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Voucher"
          })}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <VoucherList {...listProps} />
      </Card>
    </Container>
  );
};
VoucherListPage.displayName = "VoucherListPage";
export default VoucherListPage;
