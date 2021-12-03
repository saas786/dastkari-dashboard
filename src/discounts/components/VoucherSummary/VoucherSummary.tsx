import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CardSpacer from "@dastkari/components/CardSpacer";
import CardTitle from "@dastkari/components/CardTitle";
import Date from "@dastkari/components/Date";
import FormSpacer from "@dastkari/components/FormSpacer";
import Hr from "@dastkari/components/Hr";
import Money from "@dastkari/components/Money";
import Percent from "@dastkari/components/Percent";
import Skeleton from "@dastkari/components/Skeleton";
import { commonMessages } from "@dastkari/intl";
import { maybe } from "../../../misc";
import { DiscountValueTypeEnum } from "../../../types/globalTypes";
import { translateVoucherTypes } from "../../translations";
import { VoucherDetails_voucher } from "../../types/VoucherDetails";

export interface VoucherSummaryProps {
  defaultCurrency: string;
  voucher: VoucherDetails_voucher;
}

const VoucherSummary: React.FC<VoucherSummaryProps> = ({
  defaultCurrency,
  voucher
}) => {
  const intl = useIntl();

  const translatedVoucherTypes = translateVoucherTypes(intl);

  return (
    <Card>
      <CardTitle title={intl.formatMessage(commonMessages.summary)} />
      <CardContent>
        <Typography variant="caption">
          <FormattedMessage defaultMessage="Code" description="voucher code" />
        </Typography>
        <Typography>
          {maybe<React.ReactNode>(() => voucher.code, <Skeleton />)}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <FormattedMessage defaultMessage="Applies to" description="voucher" />
        </Typography>
        <Typography>
          {maybe<React.ReactNode>(
            () => translatedVoucherTypes[voucher.type],
            <Skeleton />
          )}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <FormattedMessage
            defaultMessage="Value"
            description="voucher value"
          />
        </Typography>
        <Typography>
          {maybe<React.ReactNode>(
            () =>
              voucher.discountValueType === DiscountValueTypeEnum.FIXED ? (
                <Money
                  money={{
                    amount: voucher.discountValue,
                    currency: defaultCurrency
                  }}
                />
              ) : (
                <Percent amount={voucher.discountValue} />
              ),
            <Skeleton />
          )}
        </Typography>

        <CardSpacer />
        <Hr />
        <CardSpacer />

        <Typography variant="caption">
          {intl.formatMessage(commonMessages.startDate)}
        </Typography>
        <Typography>
          {maybe<React.ReactNode>(
            () => (
              <Date date={voucher.startDate} plain />
            ),
            <Skeleton />
          )}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          {intl.formatMessage(commonMessages.endDate)}
        </Typography>
        <Typography>
          {maybe<React.ReactNode>(
            () =>
              voucher.endDate === null ? (
                "-"
              ) : (
                <Date date={voucher.endDate} plain />
              ),
            <Skeleton />
          )}
        </Typography>

        <CardSpacer />
        <Hr />
        <CardSpacer />

        <Typography variant="caption">
          <FormattedMessage
            defaultMessage="Min. Order Value"
            description="voucher value requirement"
          />
        </Typography>
        <Typography>
          {maybe<React.ReactNode>(
            () => (voucher.minSpent ? <Money money={voucher.minSpent} /> : "-"),
            <Skeleton />
          )}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <FormattedMessage
            defaultMessage="Usage Limit"
            description="voucher value requirement"
          />
        </Typography>
        <Typography>
          {maybe<React.ReactNode>(
            () => (voucher.usageLimit === null ? "-" : voucher.usageLimit),
            <Skeleton />
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};
VoucherSummary.displayName = "VoucherSummary";
export default VoucherSummary;
