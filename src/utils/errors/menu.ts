import { IntlShape } from "react-intl";

import { MenuErrorCode } from "@dastkari/types/globalTypes";
import { commonMessages } from "@dastkari/intl";
import { MenuErrorFragment } from "@dastkari/navigation/types/MenuErrorFragment";
import commonErrorMessages from "./common";

function getMenuErrorMessage(
  err: Omit<MenuErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case MenuErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case MenuErrorCode.REQUIRED:
        return intl.formatMessage(commonMessages.requiredField);
      case MenuErrorCode.INVALID:
        return intl.formatMessage(commonErrorMessages.invalid);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export default getMenuErrorMessage;
