import { OrderListUrlSortField } from "@dastkari/orders/urls";
import { OrderSortField } from "@dastkari/types/globalTypes";
import { createGetSortQueryVariables } from "@dastkari/utils/sort";

export function getSortQueryField(sort: OrderListUrlSortField): OrderSortField {
  switch (sort) {
    case OrderListUrlSortField.number:
      return OrderSortField.NUMBER;
    case OrderListUrlSortField.date:
      return OrderSortField.CREATION_DATE;
    case OrderListUrlSortField.customer:
      return OrderSortField.CUSTOMER;
    case OrderListUrlSortField.total:
      return OrderSortField.TOTAL;
    case OrderListUrlSortField.fulfillment:
      return OrderSortField.FULFILLMENT_STATUS;
    case OrderListUrlSortField.payment:
      return OrderSortField.PAYMENT;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
