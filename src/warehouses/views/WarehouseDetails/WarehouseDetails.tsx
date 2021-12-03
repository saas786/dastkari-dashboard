import React from "react";
import { useIntl } from "react-intl";

import WarehouseDetailsPage from "@dastkari/warehouses/components/WarehouseDetailsPage";
import useNavigator from "@dastkari/hooks/useNavigator";
import {
  warehouseListUrl,
  WarehouseUrlQueryParams,
  warehouseUrl
} from "@dastkari/warehouses/urls";
import { useWarehouseDetails } from "@dastkari/warehouses/queries";
import { commonMessages } from "@dastkari/intl";
import useNotifier from "@dastkari/hooks/useNotifier";
import {
  findValueInEnum,
  getMutationStatus,
  getStringOrPlaceholder
} from "@dastkari/misc";
import { CountryCode } from "@dastkari/types/globalTypes";
import useShop from "@dastkari/hooks/useShop";
import { WindowTitle } from "@dastkari/components/WindowTitle";
import {
  useWarehouseUpdate,
  useWarehouseDelete
} from "@dastkari/warehouses/mutations";
import { shippingZoneUrl } from "@dastkari/shipping/urls";
import WarehouseDeleteDialog from "@dastkari/warehouses/components/WarehouseDeleteDialog";
import createDialogActionHandlers from "@dastkari/utils/handlers/dialogActionHandlers";
import NotFoundPage from "@dastkari/components/NotFoundPage";

export interface WarehouseDetailsProps {
  id: string;
  params: WarehouseUrlQueryParams;
}

const WarehouseDetails: React.FC<WarehouseDetailsProps> = ({ id, params }) => {
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();
  const shop = useShop();
  const { data, loading } = useWarehouseDetails({
    displayLoader: true,
    variables: { id }
  });
  const [updateWarehouse, updateWarehouseOpts] = useWarehouseUpdate({
    onCompleted: data => {
      if (data.updateWarehouse.errors.length === 0) {
        notify({ text: intl.formatMessage(commonMessages.savedChanges) });
      }
    }
  });
  const updateWarehouseTransitionState = getMutationStatus(updateWarehouseOpts);

  const [deleteWarehouse, deleteWarehouseOpts] = useWarehouseDelete({
    onCompleted: data => {
      if (data.deleteWarehouse.errors.length === 0) {
        notify({
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        navigate(warehouseListUrl());
      }
    }
  });
  const deleteWarehouseTransitionState = getMutationStatus(deleteWarehouseOpts);

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    params => warehouseUrl(id, params),
    params
  );

  if (data?.warehouse === null) {
    return <NotFoundPage onBack={() => navigate(warehouseListUrl())} />;
  }

  return (
    <>
      <WindowTitle title={data?.warehouse?.name} />
      <WarehouseDetailsPage
        countries={shop?.countries || []}
        disabled={loading || updateWarehouseOpts.loading}
        errors={updateWarehouseOpts.data?.updateWarehouse.errors || []}
        saveButtonBarState={updateWarehouseTransitionState}
        warehouse={data?.warehouse}
        onBack={() => navigate(warehouseListUrl())}
        onDelete={() => openModal("delete")}
        onShippingZoneClick={id => navigate(shippingZoneUrl(id))}
        onSubmit={data =>
          updateWarehouse({
            variables: {
              id,
              input: {
                address: {
                  city: data.city,
                  cityArea: data.cityArea,
                  country: findValueInEnum(data.country, CountryCode),
                  countryArea: data.countryArea,
                  phone: data.phone,
                  postalCode: data.postalCode,
                  streetAddress1: data.streetAddress1,
                  streetAddress2: data.streetAddress2
                },
                name: data.name
              }
            }
          })
        }
      />
      <WarehouseDeleteDialog
        confirmButtonState={deleteWarehouseTransitionState}
        name={getStringOrPlaceholder(data?.warehouse?.name)}
        onClose={closeModal}
        onConfirm={() =>
          deleteWarehouse({
            variables: { id }
          })
        }
        open={params.action === "delete"}
      />
    </>
  );
};

WarehouseDetails.displayName = "WarehouseDetails";
export default WarehouseDetails;
