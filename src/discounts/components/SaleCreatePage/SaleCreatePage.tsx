import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import CardSpacer from "@dastkari/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import { sectionNames } from "@dastkari/intl";
import { DiscountErrorFragment } from "@dastkari/discounts/types/DiscountErrorFragment";
import { SaleType as SaleTypeEnum } from "../../../types/globalTypes";
import DiscountDates from "../DiscountDates";
import SaleInfo from "../SaleInfo";
import SaleType from "../SaleType";

export interface FormData {
  endDate: string;
  endTime: string;
  hasEndDate: boolean;
  name: string;
  startDate: string;
  startTime: string;
  type: SaleTypeEnum;
  value: string;
}

export interface SaleCreatePageProps {
  defaultCurrency: string;
  disabled: boolean;
  errors: DiscountErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: FormData) => void;
}

const SaleCreatePage: React.FC<SaleCreatePageProps> = ({
  defaultCurrency,
  disabled,
  errors,
  onSubmit,
  saveButtonBarState,
  onBack
}) => {
  const intl = useIntl();

  const initialForm: FormData = {
    endDate: "",
    endTime: "",
    hasEndDate: false,
    name: "",
    startDate: "",
    startTime: "",
    type: SaleTypeEnum.FIXED,
    value: ""
  };
  return (
    <Form initial={initialForm} onSubmit={onSubmit}>
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.sales)}
          </AppHeader>
          <PageHeader
            title={intl.formatMessage({
              defaultMessage: "Create Sale",
              description: "page header"
            })}
          />
          <Grid>
            <div>
              <SaleInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <SaleType data={data} disabled={disabled} onChange={change} />
              <CardSpacer />
              <DiscountDates
                data={data}
                disabled={disabled}
                defaultCurrency={defaultCurrency}
                errors={errors}
                onChange={change}
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
      )}
    </Form>
  );
};
SaleCreatePage.displayName = "SaleCreatePage";
export default SaleCreatePage;
