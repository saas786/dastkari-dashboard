import React from "react";
import { useIntl, FormattedMessage } from "react-intl";

import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import Grid from "@dastkari/components/Grid";
import CardSpacer from "@dastkari/components/CardSpacer";
import CompanyAddressInput from "@dastkari/components/CompanyAddressInput";
import { AddressTypeInput } from "@dastkari/customers/types";
import createSingleAutocompleteSelectHandler from "@dastkari/utils/handlers/singleAutocompleteSelectChangeHandler";
import { mapCountriesToChoices } from "@dastkari/utils/maps";
import useAddressValidation from "@dastkari/hooks/useAddressValidation";
import useStateFromProps from "@dastkari/hooks/useStateFromProps";
import { ShopInfo_shop_countries } from "@dastkari/components/Shop/types/ShopInfo";
import AppHeader from "@dastkari/components/AppHeader";
import PageHeader from "@dastkari/components/PageHeader";
import { sectionNames } from "@dastkari/intl";
import { WarehouseErrorFragment } from "@dastkari/warehouses/types/WarehouseErrorFragment";
import WarehouseInfo from "../WarehouseInfo";

export interface WarehouseCreatePageFormData extends AddressTypeInput {
  name: string;
}
export interface WarehouseCreatePageProps {
  countries: ShopInfo_shop_countries[];
  disabled: boolean;
  errors: WarehouseErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: WarehouseCreatePageFormData) => void;
}

const initialForm: WarehouseCreatePageFormData = {
  city: "",
  companyName: "",
  country: "",
  countryArea: "",
  name: "",
  phone: "",
  postalCode: "",
  streetAddress1: "",
  streetAddress2: ""
};

const WarehouseCreatePage: React.FC<WarehouseCreatePageProps> = ({
  countries,
  disabled,
  errors,
  saveButtonBarState,
  onBack,
  onSubmit
}) => {
  const intl = useIntl();
  const [displayCountry, setDisplayCountry] = useStateFromProps("");

  const {
    errors: validationErrors,
    submit: handleSubmit
  } = useAddressValidation<WarehouseCreatePageFormData>(onSubmit);

  return (
    <Form initial={initialForm} onSubmit={handleSubmit}>
      {({ change, data, submit }) => {
        const countryChoices = mapCountriesToChoices(countries);
        const handleCountryChange = createSingleAutocompleteSelectHandler(
          change,
          setDisplayCountry,
          countryChoices
        );

        return (
          <Container>
            <AppHeader onBack={onBack}>
              <FormattedMessage {...sectionNames.warehouses} />
            </AppHeader>
            <PageHeader
              title={intl.formatMessage({
                defaultMessage: "Create Warehouse",
                description: "header"
              })}
            />
            <Grid>
              <div>
                <WarehouseInfo
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <CompanyAddressInput
                  countries={countryChoices}
                  data={data}
                  disabled={disabled}
                  displayCountry={displayCountry}
                  errors={[...errors, ...validationErrors]}
                  header={intl.formatMessage({
                    defaultMessage: "Address Information",
                    description: "warehouse"
                  })}
                  onChange={change}
                  onCountryChange={handleCountryChange}
                />
              </div>
            </Grid>
            <SaveButtonBar
              disabled={disabled}
              onCancel={onBack}
              onSave={submit}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};

WarehouseCreatePage.displayName = "WarehouseCreatePage";
export default WarehouseCreatePage;
