import { IntlShape } from "react-intl";
import { StaffErrorFragment } from "@dastkari/staff/types/StaffErrorFragment";
import getAccountErrorMessage from "./account";

function getStaffErrorMessage(
  err: StaffErrorFragment,
  intl: IntlShape
): string {
  return getAccountErrorMessage(
    err && {
      ...err,
      __typename: "AccountError"
    },
    intl
  );
}

export default getStaffErrorMessage;
