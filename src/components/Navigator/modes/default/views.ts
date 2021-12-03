import { score } from "fuzzaldrin";
import { IntlShape } from "react-intl";

import { attributeListUrl } from "@dastkari/attributes/urls";
import { categoryListUrl } from "@dastkari/categories/urls";
import { collectionListUrl } from "@dastkari/collections/urls";
import { customerListUrl } from "@dastkari/customers/urls";
import { saleListUrl, voucherListUrl } from "@dastkari/discounts/urls";
import { UseNavigatorResult } from "@dastkari/hooks/useNavigator";
import { sectionNames } from "@dastkari/intl";
import { menuListUrl } from "@dastkari/navigation/urls";
import { orderDraftListUrl, orderListUrl } from "@dastkari/orders/urls";
import { pageListUrl } from "@dastkari/pages/urls";
import { pluginListUrl } from "@dastkari/plugins/urls";
import { productListUrl } from "@dastkari/products/urls";
import { productTypeListUrl } from "@dastkari/productTypes/urls";
import { serviceListUrl } from "@dastkari/services/urls";
import { shippingZonesListUrl } from "@dastkari/shipping/urls";
import { siteSettingsUrl } from "@dastkari/siteSettings/urls";
import { staffListUrl } from "@dastkari/staff/urls";
import { countryListUrl } from "@dastkari/taxes/urls";
import { languageListUrl } from "@dastkari/translations/urls";
import { webhookListUrl } from "@dastkari/webhooks/urls";
import { warehouseListUrl } from "@dastkari/warehouses/urls";
import { QuickSearchActionInput } from "../../types";

interface View {
  label: string;
  url: string;
}
function searchInViews(
  search: string,
  intl: IntlShape,
  navigate: UseNavigatorResult
): QuickSearchActionInput[] {
  const views: View[] = [
    {
      label: intl.formatMessage(sectionNames.attributes),
      url: attributeListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.categories),
      url: categoryListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.collections),
      url: collectionListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.customers),
      url: customerListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.draftOrders),
      url: orderDraftListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.home),
      url: "/"
    },
    {
      label: intl.formatMessage(sectionNames.navigation),
      url: menuListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.orders),
      url: orderListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.pages),
      url: pageListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.plugins),
      url: pluginListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.productTypes),
      url: productTypeListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.products),
      url: productListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.sales),
      url: saleListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.serviceAccounts),
      url: serviceListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.shipping),
      url: shippingZonesListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.siteSettings),
      url: siteSettingsUrl()
    },
    {
      label: intl.formatMessage(sectionNames.staff),
      url: staffListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.taxes),
      url: countryListUrl
    },
    {
      label: intl.formatMessage(sectionNames.translations),
      url: languageListUrl
    },
    {
      label: intl.formatMessage(sectionNames.vouchers),
      url: voucherListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.webhooks),
      url: webhookListUrl()
    },
    {
      label: intl.formatMessage(sectionNames.warehouses),
      url: warehouseListUrl()
    }
  ];

  return views.map(view => ({
    label: view.label,
    onClick: () => {
      navigate(view.url);
      return false;
    },
    score: score(view.label, search),
    text: view.label,
    type: "view"
  }));
}

export default searchInViews;
