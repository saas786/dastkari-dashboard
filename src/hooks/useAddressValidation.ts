import { useState } from "react";

import { AddressTypeInput } from "@dastkari/customers/types";
import { transformFormToAddress } from "@dastkari/misc";
import { AddressInput, AccountErrorCode } from "@dastkari/types/globalTypes";
import { add, remove } from "@dastkari/utils/lists";
import { AccountErrorFragment } from "@dastkari/customers/types/AccountErrorFragment";

interface UseAddressValidation<T> {
  errors: AccountErrorFragment[];
  submit: (data: T & AddressTypeInput) => void;
}

function useAddressValidation<T>(
  onSubmit: (address: T & AddressInput) => void
): UseAddressValidation<T> {
  const [validationErrors, setValidationErrors] = useState<
    AccountErrorFragment[]
  >([]);

  const countryRequiredError: AccountErrorFragment = {
    __typename: "AccountError",
    code: AccountErrorCode.REQUIRED,
    field: "country"
  };

  return {
    errors: validationErrors,
    submit: (data: T & AddressTypeInput) => {
      try {
        setValidationErrors(
          remove(
            countryRequiredError,
            validationErrors,
            (a, b) => a.field === b.field
          )
        );
        onSubmit(transformFormToAddress(data));
      } catch {
        setValidationErrors(add(countryRequiredError, validationErrors));
      }
    }
  };
}

export default useAddressValidation;
