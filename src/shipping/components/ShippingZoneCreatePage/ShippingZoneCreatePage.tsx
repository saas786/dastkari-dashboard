import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import CardSpacer from "@dastkari/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import Container from "@dastkari/components/Container";
import CountryList from "@dastkari/components/CountryList";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import { sectionNames } from "@dastkari/intl";
import { ShippingErrorFragment } from "@dastkari/shipping/types/ShippingErrorFragment";
import { CountryFragment } from "../../../taxes/types/CountryFragment";
import ShippingZoneCountriesAssignDialog from "../ShippingZoneCountriesAssignDialog";
import ShippingZoneInfo from "../ShippingZoneInfo";

export interface FormData {
  countries: string[];
  default: boolean;
  name: string;
}

export interface ShippingZoneCreatePageProps {
  countries: CountryFragment[];
  disabled: boolean;
  errors: ShippingErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: FormData) => void;
}

const ShippingZoneCreatePage: React.FC<ShippingZoneCreatePageProps> = ({
  countries,
  disabled,
  errors,
  onBack,
  onSubmit,
  saveButtonBarState
}) => {
  const intl = useIntl();
  const [isModalOpened, setModalStatus] = React.useState(false);
  const toggleModal = () => setModalStatus(!isModalOpened);

  const initialForm: FormData = {
    countries: [],
    default: false,
    name: ""
  };

  return (
    <Form initial={initialForm} onSubmit={onSubmit}>
      {({ change, data, hasChanged, submit }) => (
        <>
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.shipping)}
            </AppHeader>
            <PageHeader
              title={intl.formatMessage({
                defaultMessage: "Create New Shipping Zone",
                description: "header"
              })}
            />
            <Grid>
              <div>
                <ShippingZoneInfo
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <CountryList
                  countries={data.countries.map(selectedCountry =>
                    countries.find(country => country.code === selectedCountry)
                  )}
                  disabled={disabled}
                  emptyText={
                    data.default
                      ? intl.formatMessage({
                          defaultMessage:
                            "This is default shipping zone, which means that it covers all of the countries which are not assigned to other shipping zones"
                        })
                      : intl.formatMessage({
                          defaultMessage:
                            "Currently, there are no countries assigned to this shipping zone"
                        })
                  }
                  onCountryAssign={toggleModal}
                  onCountryUnassign={countryCode =>
                    change({
                      target: {
                        name: "countries",
                        value: data.countries.filter(
                          country => country !== countryCode
                        )
                      }
                    } as any)
                  }
                  title={intl.formatMessage({
                    defaultMessage: "Countries"
                  })}
                />
              </div>
            </Grid>
            <SaveButtonBar
              disabled={disabled || !hasChanged}
              onCancel={onBack}
              onSave={submit}
              state={saveButtonBarState}
            />
          </Container>
          <ShippingZoneCountriesAssignDialog
            open={isModalOpened}
            onConfirm={formData => {
              change({
                target: {
                  name: "countries",
                  value: formData.restOfTheWorld ? [] : formData.countries
                }
              } as any);
              toggleModal();
            }}
            confirmButtonState="default"
            countries={countries}
            initial={data.countries}
            isDefault={data.default}
            onClose={toggleModal}
          />
        </>
      )}
    </Form>
  );
};
ShippingZoneCreatePage.displayName = "ShippingZoneCreatePage";
export default ShippingZoneCreatePage;
