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
import { maybe, findValueInEnum } from "@dastkari/misc";
import { ShopInfo_shop_countries } from "@dastkari/components/Shop/types/ShopInfo";
import AppHeader from "@dastkari/components/AppHeader";
import PageHeader from "@dastkari/components/PageHeader";
import { sectionNames } from "@dastkari/intl";
import { CountryCode } from "@dastkari/types/globalTypes";
import { WarehouseErrorFragment } from "@dastkari/warehouses/types/WarehouseErrorFragment";
import WarehouseInfo from "../WarehouseInfo";
import WarehouseZones from "../WarehouseZones";
import { WarehouseDetails_warehouse } from "../../types/WarehouseDetails";

export interface WarehouseDetailsPageFormData extends AddressTypeInput {
  name: string;
}
export interface WarehouseDetailsPageProps {
  countries: ShopInfo_shop_countries[];
  disabled: boolean;
  errors: WarehouseErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  warehouse: WarehouseDetails_warehouse;
  onBack: () => void;
  onDelete: () => void;
  onShippingZoneClick: (id: string) => void;
  onSubmit: (data: WarehouseDetailsPageFormData) => void;
}

const WarehouseDetailsPage: React.FC<WarehouseDetailsPageProps> = ({
  countries,
  disabled,
  errors,
  saveButtonBarState,
  warehouse,
  onBack,
  onDelete,
  onShippingZoneClick,
  onSubmit
}) => {
  const intl = useIntl();
  const [displayCountry, setDisplayCountry] = useStateFromProps(
    warehouse?.address?.country.country || ""
  );

  const {
    errors: validationErrors,
    submit: handleSubmit
  } = useAddressValidation<WarehouseDetailsPageFormData>(onSubmit);

  const initialForm: WarehouseDetailsPageFormData = {
    city: maybe(() => warehouse.address.city, ""),
    companyName: maybe(() => warehouse.address.companyName, ""),
    country: maybe(() =>
      findValueInEnum(warehouse.address.country.code, CountryCode)
    ),
    countryArea: maybe(() => warehouse.address.countryArea, ""),
    name: maybe(() => warehouse.name, ""),
    phone: maybe(() => warehouse.address.phone, ""),
    postalCode: maybe(() => warehouse.address.postalCode, ""),
    streetAddress1: maybe(() => warehouse.address.streetAddress1, ""),
    streetAddress2: maybe(() => warehouse.address.streetAddress2, "")
  };

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
            <PageHeader title={maybe(() => warehouse.name)} />
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
              <div>
                <WarehouseZones
                  zones={warehouse?.shippingZones?.edges.map(edge => edge.node)}
                  onShippingZoneClick={onShippingZoneClick}
                />
              </div>
            </Grid>
            <SaveButtonBar
              disabled={disabled}
              onCancel={onBack}
              onDelete={onDelete}
              onSave={submit}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};

WarehouseDetailsPage.displayName = "WarehouseDetailsPage";
export default WarehouseDetailsPage;
