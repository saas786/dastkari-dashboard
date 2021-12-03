import { IntlShape, defineMessages } from "react-intl";

import { ShopErrorFragment } from "@dastkari/siteSettings/types/ShopErrorFragment";
import { ShopErrorCode } from "@dastkari/types/globalTypes";
import { commonMessages } from "@dastkari/intl";
import commonErrorMessages from "./common";

const messages = defineMessages({
  alreadyExists: {
    defaultMessage: "Authorization key with this type already exists",
    description: "add authorization key error"
  }
});

function getShopErrorMessage(
  err: Omit<ShopErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case ShopErrorCode.ALREADY_EXISTS:
        return intl.formatMessage(messages.alreadyExists);
      case ShopErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case ShopErrorCode.REQUIRED:
        return intl.formatMessage(commonMessages.requiredField);
      case ShopErrorCode.INVALID:
        return intl.formatMessage(commonErrorMessages.invalid);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export default getShopErrorMessage;
