import React from "react";
import Card from "@material-ui/core/Card";
import { useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import Container from "@dastkari/components/Container";
import PageHeader from "@dastkari/components/PageHeader";
import { sectionNames } from "@dastkari/intl";
import {
  PageListProps,
  SortPage,
  FilterPageProps,
  TabPageProps
} from "@dastkari/types";
import { PluginListUrlSortField } from "@dastkari/plugins/urls";
import FilterBar from "@dastkari/components/FilterBar";
import { Plugins_plugins_edges_node } from "../../types/Plugins";
import PluginsList from "../PluginsList/PluginsList";
import {
  createFilterStructure,
  PluginFilterKeys,
  PluginListFilterOpts
} from "./filters";

export interface PluginsListPageProps
  extends PageListProps,
    FilterPageProps<PluginFilterKeys, PluginListFilterOpts>,
    SortPage<PluginListUrlSortField>,
    TabPageProps {
  plugins: Plugins_plugins_edges_node[];
  onBack: () => void;
}

const PluginsListPage: React.FC<PluginsListPageProps> = ({
  currencySymbol,
  currentTab,
  initialSearch,
  filterOpts,
  tabs,
  onAdd,
  onAll,
  onBack,
  onSearchChange,
  onFilterChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  ...listProps
}) => {
  const intl = useIntl();

  const filterStructure = createFilterStructure(intl, filterOpts);

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(sectionNames.plugins)} />
      <Card>
        <FilterBar
          currencySymbol={currencySymbol}
          currentTab={currentTab}
          initialSearch={initialSearch}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
          tabs={tabs}
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Plugins",
            description: "tab name"
          })}
          filterStructure={filterStructure}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Plugins..."
          })}
        />
        <PluginsList {...listProps} />
      </Card>
    </Container>
  );
};
PluginsListPage.displayName = "PluginsListPage";
export default PluginsListPage;
