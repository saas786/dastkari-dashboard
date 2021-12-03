import { storiesOf } from "@storybook/react";
import React from "react";

import Decorator from "@dastkari/storybook/Decorator";
import { countries } from "@dastkari/fixtures";
import { WarehouseErrorCode } from "@dastkari/types/globalTypes";
import WarehouseCreatePage, {
  WarehouseCreatePageProps,
  WarehouseCreatePageFormData
} from "./WarehouseCreatePage";

const props: WarehouseCreatePageProps = {
  countries: countries.map(c => ({
    __typename: "CountryDisplay",
    code: c.code,
    country: c.name
  })),
  disabled: false,
  errors: [],
  onBack: () => undefined,
  onSubmit: () => undefined,
  saveButtonBarState: "default"
};
storiesOf("Views / Warehouses / Create warehouse", module)
  .addDecorator(Decorator)
  .add("default", () => <WarehouseCreatePage {...props} />)
  .add("loading", () => <WarehouseCreatePage {...props} disabled={true} />)
  .add("form errors", () => (
    <WarehouseCreatePage
      {...props}
      errors={([
        "name",
        "city",
        "cityArea",
        "companyName",
        "country",
        "countryArea",
        "phone",
        "postalCode",
        "streetAddress1",
        "streetAddress2"
      ] as Array<keyof WarehouseCreatePageFormData>).map(field => ({
        __typename: "WarehouseError",
        code: WarehouseErrorCode.INVALID,
        field
      }))}
    />
  ));
