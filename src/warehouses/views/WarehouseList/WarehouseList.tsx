import React from "react";
import { useIntl } from "react-intl";

import {
  WarehouseListUrlQueryParams,
  warehouseUrl,
  WarehouseListUrlDialog,
  warehouseListUrl,
  warehouseAddUrl
} from "@dastkari/warehouses/urls";
import useNavigator from "@dastkari/hooks/useNavigator";
import { useWarehouseList } from "@dastkari/warehouses/queries";
import usePaginator, {
  createPaginationState
} from "@dastkari/hooks/usePaginator";
import useNotifier from "@dastkari/hooks/useNotifier";
import useListSettings from "@dastkari/hooks/useListSettings";
import { ListViews } from "@dastkari/types";
import { WindowTitle } from "@dastkari/components/WindowTitle";
import { sectionNames, commonMessages } from "@dastkari/intl";
import WarehouseListPage from "@dastkari/warehouses/components/WarehouseListPage";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@dastkari/components/SaveFilterTabDialog";
import DeleteFilterTabDialog from "@dastkari/components/DeleteFilterTabDialog";
import { maybe, getMutationStatus } from "@dastkari/misc";
import { getSortParams } from "@dastkari/utils/sort";
import createSortHandler from "@dastkari/utils/handlers/sortHandler";
import createFilterHandlers from "@dastkari/utils/handlers/filterHandlers";
import createDialogActionHandlers from "@dastkari/utils/handlers/dialogActionHandlers";
import { configurationMenuUrl } from "@dastkari/configuration";
import WarehouseDeleteDialog from "@dastkari/warehouses/components/WarehouseDeleteDialog";
import { useWarehouseDelete } from "@dastkari/warehouses/mutations";
import { getSortQueryVariables } from "./sort";
import {
  getFilterVariables,
  getFilterTabs,
  areFiltersApplied,
  deleteFilterTab,
  saveFilterTab,
  getActiveFilters
} from "./filters";

export interface WarehouseListProps {
  params: WarehouseListUrlQueryParams;
}

const WarehouseList: React.FC<WarehouseListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { updateListSettings, settings } = useListSettings(
    ListViews.SALES_LIST
  );
  const intl = useIntl();

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params]
  );
  const { data, loading, refetch } = useWarehouseList({
    displayLoader: true,
    variables: queryVariables
  });
  const [deleteWarehouse, deleteWarehouseOpts] = useWarehouseDelete({
    onCompleted: data => {
      if (data.deleteWarehouse.errors.length === 0) {
        notify({
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        refetch();
        closeModal();
      }
    }
  });

  const tabs = getFilterTabs();

  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const [, resetFilters, handleSearchChange] = createFilterHandlers({
    createUrl: warehouseListUrl,
    getFilterQueryParam: () => undefined,
    navigate,
    params
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    WarehouseListUrlDialog,
    WarehouseListUrlQueryParams
  >(navigate, warehouseListUrl, params);

  const handleTabChange = (tab: number) =>
    navigate(
      warehouseListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    navigate(warehouseListUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.warehouses.pageInfo),
    paginationState,
    params
  );

  const handleSort = createSortHandler(navigate, warehouseListUrl, params);

  const deleteTransitionState = getMutationStatus(deleteWarehouseOpts);

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.warehouses)} />
      <WarehouseListPage
        currentTab={currentTab}
        initialSearch={params.query || ""}
        onSearchChange={handleSearchChange}
        onAll={resetFilters}
        onBack={() => navigate(configurationMenuUrl)}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal("delete-search")}
        onTabSave={() => openModal("save-search")}
        tabs={tabs.map(tab => tab.name)}
        warehouses={maybe(() => data.warehouses.edges.map(edge => edge.node))}
        settings={settings}
        disabled={loading}
        pageInfo={pageInfo}
        onAdd={() => navigate(warehouseAddUrl)}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onRemove={id => openModal("delete", { id })}
        onSort={handleSort}
        onUpdateListSettings={updateListSettings}
        onRowClick={id => () => navigate(warehouseUrl(id))}
        sort={getSortParams(params)}
      />
      <WarehouseDeleteDialog
        confirmButtonState={deleteTransitionState}
        name={maybe(
          () =>
            data.warehouses.edges.find(edge => edge.node.id === params.id).node
              .name
        )}
        open={params.action === "delete"}
        onClose={closeModal}
        onConfirm={() =>
          deleteWarehouse({
            variables: {
              id: params.id
            }
          })
        }
      />
      <SaveFilterTabDialog
        open={params.action === "save-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === "delete-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabDelete}
        tabName={maybe(() => tabs[currentTab - 1].name, "...")}
      />
    </>
  );
};

WarehouseList.displayName = "WarehouseList";
export default WarehouseList;
