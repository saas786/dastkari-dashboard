import React from "react";
import { useIntl } from "react-intl";

import useNavigator from "@dastkari/hooks/useNavigator";
import useNotifier from "@dastkari/hooks/useNotifier";
import useShop from "@dastkari/hooks/useShop";
import { commonMessages } from "@dastkari/intl";
import ShippingZoneCreatePage from "../components/ShippingZoneCreatePage";
import { useShippingZoneCreate } from "../mutations";
import { shippingZonesListUrl, shippingZoneUrl } from "../urls";

const ShippingZoneCreate: React.FC<{}> = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const shop = useShop();
  const intl = useIntl();

  const [createShippingZone, createShippingZoneOpts] = useShippingZoneCreate({
    onCompleted: data => {
      if (data.shippingZoneCreate.errors.length === 0) {
        notify({
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        navigate(shippingZoneUrl(data.shippingZoneCreate.shippingZone.id));
      }
    }
  });
  return (
    <ShippingZoneCreatePage
      countries={shop?.countries || []}
      disabled={createShippingZoneOpts.loading}
      errors={createShippingZoneOpts.data?.shippingZoneCreate.errors || []}
      onBack={() => navigate(shippingZonesListUrl())}
      onSubmit={formData =>
        createShippingZone({
          variables: {
            input: formData
          }
        })
      }
      saveButtonBarState={createShippingZoneOpts.status}
    />
  );
};
export default ShippingZoneCreate;
