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
import {
  DiscountValueTypeEnum,
  VoucherTypeEnum
} from "../../../types/globalTypes";
import { RequirementsPicker } from "../../types";
import VoucherDates from "../VoucherDates";
import VoucherInfo from "../VoucherInfo";
import VoucherLimits from "../VoucherLimits";
import VoucherRequirements from "../VoucherRequirements";
import VoucherTypes from "../VoucherTypes";
import VoucherValue from "../VoucherValue";

export interface FormData {
  applyOncePerCustomer: boolean;
  applyOncePerOrder: boolean;
  code: string;
  discountType: DiscountValueTypeEnum;
  endDate: string;
  endTime: string;
  hasEndDate: boolean;
  hasUsageLimit: boolean;
  minCheckoutItemsQuantity: string;
  minSpent: string;
  requirementsPicker: RequirementsPicker;
  startDate: string;
  startTime: string;
  type: VoucherTypeEnum;
  usageLimit: string;
  value: number;
}

export interface VoucherCreatePageProps {
  defaultCurrency: string;
  disabled: boolean;
  errors: DiscountErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: FormData) => void;
}

const VoucherCreatePage: React.FC<VoucherCreatePageProps> = ({
  defaultCurrency,
  disabled,
  errors,
  saveButtonBarState,
  onBack,
  onSubmit
}) => {
  const intl = useIntl();

  const initialForm: FormData = {
    applyOncePerCustomer: false,
    applyOncePerOrder: false,
    code: "",
    discountType: DiscountValueTypeEnum.FIXED,
    endDate: "",
    endTime: "",
    hasEndDate: false,
    hasUsageLimit: false,
    minCheckoutItemsQuantity: "0",
    minSpent: "0",
    requirementsPicker: RequirementsPicker.NONE,
    startDate: "",
    startTime: "",
    type: VoucherTypeEnum.ENTIRE_ORDER,
    usageLimit: "0",
    value: 0
  };

  return (
    <Form initial={initialForm} onSubmit={onSubmit}>
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.vouchers)}
          </AppHeader>
          <PageHeader
            title={intl.formatMessage({
              defaultMessage: "Create Voucher",
              description: "page header"
            })}
          />
          <Grid>
            <div>
              <VoucherInfo
                data={data}
                errors={errors}
                disabled={disabled}
                onChange={change}
                variant="create"
              />
              <CardSpacer />
              <VoucherTypes
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              {data.discountType.toString() !== "SHIPPING" ? (
                <VoucherValue
                  data={data}
                  disabled={disabled}
                  defaultCurrency={defaultCurrency}
                  errors={errors}
                  onChange={change}
                  variant="create"
                />
              ) : null}
              <CardSpacer />
              <VoucherRequirements
                data={data}
                disabled={disabled}
                defaultCurrency={defaultCurrency}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <VoucherLimits
                data={data}
                disabled={disabled}
                defaultCurrency={defaultCurrency}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <VoucherDates
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
VoucherCreatePage.displayName = "VoucherCreatePage";
export default VoucherCreatePage;
