import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { sectionNames } from "@dastkari/intl";
import { asSortParams } from "@dastkari/utils/sort";
import { WindowTitle } from "../components/WindowTitle";
import {
  orderDraftListPath,
  OrderDraftListUrlQueryParams,
  orderListPath,
  OrderListUrlQueryParams,
  orderPath,
  OrderUrlQueryParams,
  OrderDraftListUrlSortField,
  OrderListUrlSortField,
  orderFulfillPath
} from "./urls";
import OrderDetailsComponent from "./views/OrderDetails";
import OrderFulfillComponent from "./views/OrderFulfill";
import OrderDraftListComponent from "./views/OrderDraftList";
import OrderListComponent from "./views/OrderList";

const OrderList: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: OrderListUrlQueryParams = asSortParams(
    qs,
    OrderListUrlSortField,
    OrderListUrlSortField.number,
    false
  );
  return <OrderListComponent params={params} />;
};
const OrderDraftList: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: OrderDraftListUrlQueryParams = asSortParams(
    qs,
    OrderDraftListUrlSortField,
    OrderDraftListUrlSortField.number,
    false
  );

  return <OrderDraftListComponent params={params} />;
};

const OrderDetails: React.FC<RouteComponentProps<any>> = ({
  location,
  match
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: OrderUrlQueryParams = qs;

  return (
    <OrderDetailsComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

const OrderFulfill: React.FC<RouteComponentProps<any>> = ({ match }) => (
  <OrderFulfillComponent orderId={decodeURIComponent(match.params.id)} />
);

const Component = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.orders)} />
      <Switch>
        <Route exact path={orderDraftListPath} component={OrderDraftList} />
        <Route exact path={orderListPath} component={OrderList} />
        <Route path={orderFulfillPath(":id")} component={OrderFulfill} />
        <Route path={orderPath(":id")} component={OrderDetails} />
      </Switch>
    </>
  );
};

export default Component;
