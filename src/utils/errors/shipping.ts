import { IntlShape, defineMessages } from "react-intl";

import { ShippingErrorFragment } from "@dastkari/shipping/types/ShippingErrorFragment";
import { ShippingErrorCode } from "@dastkari/types/globalTypes";
import { commonMessages } from "@dastkari/intl";
import commonErrorMessages from "./common";

const messages = defineMessages({
  alreadyExists: {
    defaultMessage: "Default shipping zone already exists",
    description: "error message"
  }
});

function getShippingErrorMessage(
  err: Omit<ShippingErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case ShippingErrorCode.ALREADY_EXISTS:
        return intl.formatMessage(messages.alreadyExists);
      case ShippingErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case ShippingErrorCode.REQUIRED:
        return intl.formatMessage(commonMessages.requiredField);
      case ShippingErrorCode.INVALID:
        return intl.formatMessage(commonErrorMessages.invalid);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export default getShippingErrorMessage;
