import { IntlShape, defineMessages } from "react-intl";

import { StockErrorFragment } from "@dastkari/products/types/StockErrorFragment";
import { StockErrorCode } from "@dastkari/types/globalTypes";
import { commonMessages } from "@dastkari/intl";
import { BulkStockErrorFragment } from "@dastkari/products/types/BulkStockErrorFragment";
import commonErrorMessages from "./common";
import getProductErrorMessage from "./product";

const messages = defineMessages({
  slugUnique: {
    defaultMessage:
      "Stock for this warehouse already exists for this product variant",
    description: "error message"
  }
});

function getStockErrorMessage(
  err: Omit<StockErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case StockErrorCode.UNIQUE:
        return intl.formatMessage(messages.slugUnique);
      case StockErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case StockErrorCode.REQUIRED:
        return intl.formatMessage(commonMessages.requiredField);
      case StockErrorCode.INVALID:
        return intl.formatMessage(commonErrorMessages.invalid);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export function getBulkStockErrorMessage(
  err: Omit<BulkStockErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string {
  return getProductErrorMessage(err, intl);
}

export default getStockErrorMessage;
