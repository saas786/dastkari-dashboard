import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ActionDialog from "@dastkari/components/ActionDialog";
import { configurationMenuUrl } from "@dastkari/configuration";
import useBulkActions from "@dastkari/hooks/useBulkActions";
import useListSettings from "@dastkari/hooks/useListSettings";
import useNavigator from "@dastkari/hooks/useNavigator";
import useNotifier from "@dastkari/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@dastkari/hooks/usePaginator";
import useShop from "@dastkari/hooks/useShop";
import useUser from "@dastkari/hooks/useUser";
import { commonMessages } from "@dastkari/intl";
import { maybe, getStringOrPlaceholder } from "@dastkari/misc";
import { ListViews } from "@dastkari/types";
import createDialogActionHandlers from "@dastkari/utils/handlers/dialogActionHandlers";
import ShippingZonesListPage from "../components/ShippingZonesListPage";
import {
  useShippingZoneBulkDelete,
  useShippingZoneDelete,
  useDefaultWeightUnitUpdate
} from "../mutations";
import { useShippingZoneList } from "../queries";
import {
  shippingZoneAddUrl,
  shippingZonesListUrl,
  ShippingZonesListUrlQueryParams,
  shippingZoneUrl,
  ShippingZonesListUrlDialog
} from "../urls";

interface ShippingZonesListProps {
  params: ShippingZonesListUrlQueryParams;
}

export const ShippingZonesList: React.FC<ShippingZonesListProps> = ({
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const shop = useShop();
  const { user } = useUser();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const { updateListSettings, settings } = useListSettings(
    ListViews.SHIPPING_METHODS_LIST
  );
  const intl = useIntl();

  const paginationState = createPaginationState(settings.rowNumber, params);

  const [openModal, closeModal] = createDialogActionHandlers<
    ShippingZonesListUrlDialog,
    ShippingZonesListUrlQueryParams
  >(navigate, shippingZonesListUrl, params);

  const { data, loading, refetch } = useShippingZoneList({
    displayLoader: true,
    variables: paginationState
  });

  const [deleteShippingZone, deleteShippingZoneOpts] = useShippingZoneDelete({
    onCompleted: data => {
      if (data.shippingZoneDelete.errors.length === 0) {
        notify({
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        closeModal();
        refetch();
      }
    }
  });

  const [
    updateDefaultWeightUnit,
    updateDefaultWeightUnitOpts
  ] = useDefaultWeightUnitUpdate({
    onCompleted: data => {
      if (data.shopSettingsUpdate.errors.length === 0) {
        notify({
          text: intl.formatMessage(commonMessages.savedChanges)
        });
      }
    }
  });

  const [
    bulkDeleteShippingZone,
    bulkDeleteShippingZoneOpts
  ] = useShippingZoneBulkDelete({
    onCompleted: data => {
      if (data.shippingZoneBulkDelete.errors.length === 0) {
        notify({
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        closeModal();
        reset();
        refetch();
      }
    }
  });

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.shippingZones.pageInfo),
    paginationState,
    params
  );
  return (
    <>
      <ShippingZonesListPage
        defaultWeightUnit={maybe(() => shop.defaultWeightUnit)}
        settings={settings}
        disabled={
          loading ||
          deleteShippingZoneOpts.loading ||
          updateDefaultWeightUnitOpts.loading
        }
        shippingZones={maybe(() =>
          data.shippingZones.edges.map(edge => edge.node)
        )}
        pageInfo={pageInfo}
        onAdd={() => navigate(shippingZoneAddUrl)}
        onBack={() => navigate(configurationMenuUrl)}
        onUpdateListSettings={updateListSettings}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onRemove={id =>
          openModal("remove", {
            id
          })
        }
        onRowClick={id => () => navigate(shippingZoneUrl(id))}
        onSubmit={unit =>
          updateDefaultWeightUnit({
            variables: { unit }
          })
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={
          <IconButton
            color="primary"
            onClick={() =>
              openModal("remove-many", {
                ids: listElements
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
        userPermissions={user?.userPermissions || []}
      />

      <ActionDialog
        open={params.action === "remove"}
        confirmButtonState={deleteShippingZoneOpts.status}
        variant="delete"
        title={intl.formatMessage({
          defaultMessage: "Delete Shipping Zone",
          description: "dialog header"
        })}
        onClose={closeModal}
        onConfirm={() =>
          deleteShippingZone({
            variables: { id: params.id }
          })
        }
      >
        <DialogContentText>
          <FormattedMessage
            defaultMessage="Are you sure you want to delete {shippingZoneName} shipping zone?"
            values={{
              shippingZoneName: (
                <strong>
                  {maybe(
                    () =>
                      data.shippingZones.edges.find(
                        edge => edge.node.id === params.id
                      ).node.name,
                    "..."
                  )}
                </strong>
              )
            }}
          />
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        open={params.action === "remove-many"}
        confirmButtonState={bulkDeleteShippingZoneOpts.status}
        variant="delete"
        title={intl.formatMessage({
          defaultMessage: "Delete Shipping Zones",
          description: "dialog header"
        })}
        onClose={closeModal}
        onConfirm={() =>
          bulkDeleteShippingZone({
            variables: { ids: params.ids }
          })
        }
      >
        <DialogContentText>
          <FormattedMessage
            defaultMessage="{counter,plural,one{Are you sure you want to delete this shipping zone?} other{Are you sure you want to delete {displayQuantity} shipping zones?}}"
            description="dialog content"
            values={{
              counter: params.ids?.length,
              displayQuantity: (
                <strong>
                  {getStringOrPlaceholder(params.ids?.length.toString())}
                </strong>
              )
            }}
          />
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
ShippingZonesList.displayName = "ShippingZonesList";
export default ShippingZonesList;
