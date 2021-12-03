import React from "react";
import { useIntl } from "react-intl";

import WarehouseCreatePage from "@dastkari/warehouses/components/WarehouseCreatePage";
import useNavigator from "@dastkari/hooks/useNavigator";
import { warehouseListUrl, warehouseUrl } from "@dastkari/warehouses/urls";
import { useWarehouseCreate } from "@dastkari/warehouses/mutations";
import { commonMessages } from "@dastkari/intl";
import useNotifier from "@dastkari/hooks/useNotifier";
import { findValueInEnum, getMutationStatus } from "@dastkari/misc";
import { CountryCode } from "@dastkari/types/globalTypes";
import useShop from "@dastkari/hooks/useShop";
import { WindowTitle } from "@dastkari/components/WindowTitle";

const WarehouseCreate: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();
  const shop = useShop();
  const [createWarehouse, createWarehouseOpts] = useWarehouseCreate({
    onCompleted: data => {
      if (data.createWarehouse.errors.length === 0) {
        navigate(warehouseUrl(data.createWarehouse.warehouse.id));
        notify({ text: intl.formatMessage(commonMessages.savedChanges) });
      }
    }
  });
  const createWarehouseTransitionState = getMutationStatus(createWarehouseOpts);

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          defaultMessage: "Create Warehouse",
          description: "header"
        })}
      />
      <WarehouseCreatePage
        countries={shop?.countries || []}
        disabled={createWarehouseOpts.loading}
        errors={createWarehouseOpts.data?.createWarehouse.errors || []}
        saveButtonBarState={createWarehouseTransitionState}
        onBack={() => navigate(warehouseListUrl())}
        onSubmit={data =>
          createWarehouse({
            variables: {
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
    </>
  );
};

WarehouseCreate.displayName = "WarehouseCreate";
export default WarehouseCreate;
