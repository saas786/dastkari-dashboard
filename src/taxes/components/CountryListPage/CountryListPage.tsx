import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import { Container } from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import { sectionNames } from "@dastkari/intl";
import { maybe } from "../../../misc";
import { CountryList_shop } from "../../types/CountryList";
import CountryList from "../CountryList";
import TaxConfiguration from "../TaxConfiguration";

export interface FormData {
  includeTax: boolean;
  showGross: boolean;
  chargeTaxesOnShipping: boolean;
}
export interface CountryListPageProps {
  disabled: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  shop: CountryList_shop;
  onBack: () => void;
  onRowClick: (code: string) => void;
  onSubmit: (data: FormData) => void;
  onTaxFetch: () => void;
}

const CountryListPage: React.FC<CountryListPageProps> = ({
  disabled,
  saveButtonBarState,
  shop,
  onBack,
  onRowClick,
  onSubmit,
  onTaxFetch
}) => {
  const intl = useIntl();

  const initialForm: FormData = {
    chargeTaxesOnShipping: maybe(() => shop.chargeTaxesOnShipping, false),
    includeTax: maybe(() => shop.includeTaxesInPrices, false),
    showGross: maybe(() => shop.displayGrossPrices, false)
  };
  return (
    <Form initial={initialForm} onSubmit={onSubmit}>
      {({ change, data, submit }) => (
        <>
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.configuration)}
            </AppHeader>
            <PageHeader
              title={intl.formatMessage({
                defaultMessage: "Taxes",
                description: "header"
              })}
            />
            <Grid variant="inverted">
              <div>
                <TaxConfiguration
                  data={data}
                  disabled={disabled}
                  onChange={event => change(event, submit)}
                  onTaxFetch={onTaxFetch}
                />
              </div>
              <div>
                <CountryList
                  countries={maybe(() => shop.countries)}
                  onRowClick={onRowClick}
                />
              </div>
            </Grid>
          </Container>
          <SaveButtonBar
            disabled={disabled}
            state={saveButtonBarState}
            onCancel={onBack}
            onSave={submit}
          />
        </>
      )}
    </Form>
  );
};
CountryListPage.displayName = "CountryListPage";
export default CountryListPage;
