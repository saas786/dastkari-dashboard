import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import FormSpacer from "@dastkari/components/FormSpacer";
import Grid from "@dastkari/components/Grid";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import useStateFromProps from "@dastkari/hooks/useStateFromProps";
import { sectionNames } from "@dastkari/intl";
import { maybe, getStringOrPlaceholder } from "@dastkari/misc";
import { SearchServiceAccount_search_edges_node } from "@dastkari/searches/types/SearchServiceAccount";
import { WebhookEventTypeEnum } from "@dastkari/types/globalTypes";
import createSingleAutocompleteSelectHandler from "@dastkari/utils/handlers/singleAutocompleteSelectChangeHandler";
import WebhookEvents from "@dastkari/webhooks/components/WebhookEvents";
import WebhookInfo from "@dastkari/webhooks/components/WebhookInfo";
import WebhookStatus from "@dastkari/webhooks/components/WebhookStatus";
import { WebhookDetails_webhook } from "@dastkari/webhooks/types/WebhookDetails";
import { WebhookErrorFragment } from "@dastkari/webhooks/types/WebhookErrorFragment";
import { isUnnamed } from "@dastkari/webhooks/utils";

export interface FormData {
  events: WebhookEventTypeEnum[];
  isActive: boolean;
  name: string;
  secretKey: string | null;
  targetUrl: string;
  serviceAccount: string;
  allEvents: boolean;
}

export interface WebhooksDetailsPageProps {
  disabled: boolean;
  errors: WebhookErrorFragment[];
  webhook: WebhookDetails_webhook;
  services?: SearchServiceAccount_search_edges_node[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onDelete: () => void;
  fetchServiceAccounts: (data: string) => void;
  onSubmit: (data: FormData) => void;
}

const WebhooksDetailsPage: React.FC<WebhooksDetailsPageProps> = ({
  disabled,
  errors,
  webhook,
  saveButtonBarState,
  services,
  fetchServiceAccounts,
  onBack,
  onDelete,
  onSubmit
}) => {
  const intl = useIntl();
  const initialForm: FormData = {
    allEvents: !!maybe(() => webhook.events, []).find(
      event => event.eventType === WebhookEventTypeEnum.ANY_EVENTS
    ),
    events: maybe(() => webhook.events, [])
      .map(event => event.eventType)
      .filter(event => event !== WebhookEventTypeEnum.ANY_EVENTS),
    isActive: maybe(() => webhook.isActive, false),
    name: maybe(() => webhook.name, ""),
    secretKey: maybe(() => webhook.secretKey, ""),
    serviceAccount: maybe(() => webhook.serviceAccount.id, ""),
    targetUrl: maybe(() => webhook.targetUrl, "")
  };
  const [
    selectedServiceAcccounts,
    setSelectedServiceAcccounts
  ] = useStateFromProps(maybe(() => webhook.serviceAccount.name, ""));
  const servicesChoiceList = maybe(
    () =>
      services.map(node => ({
        label: node.name,
        value: node.id
      })),
    []
  );
  return (
    <Form initial={initialForm} onSubmit={onSubmit}>
      {({ data, hasChanged, submit, change }) => {
        const handleServiceSelect = createSingleAutocompleteSelectHandler(
          change,
          setSelectedServiceAcccounts,
          servicesChoiceList
        );
        return (
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.webhooks)}
            </AppHeader>
            <PageHeader
              title={
                isUnnamed(webhook)
                  ? intl.formatMessage({
                      defaultMessage: "Unnamed Webhook Details",
                      description: "header"
                    })
                  : intl.formatMessage(
                      {
                        defaultMessage: "{webhookName} Details",
                        description: "header"
                      },
                      {
                        webhookName: getStringOrPlaceholder(webhook?.name)
                      }
                    )
              }
            />
            <Grid>
              <div>
                <WebhookInfo
                  data={data}
                  disabled={disabled}
                  serviceDisplayValue={selectedServiceAcccounts}
                  services={servicesChoiceList}
                  fetchServiceAccounts={fetchServiceAccounts}
                  errors={errors}
                  serviceOnChange={handleServiceSelect}
                  onChange={change}
                />
              </div>
              <div>
                <WebhookEvents
                  data={data}
                  onChange={change}
                  disabled={disabled}
                />
                <FormSpacer />
                <WebhookStatus
                  data={data.isActive}
                  disabled={disabled}
                  onChange={change}
                />
              </div>
            </Grid>
            <SaveButtonBar
              disabled={disabled || !hasChanged}
              state={saveButtonBarState}
              onCancel={onBack}
              onSave={submit}
              onDelete={onDelete}
            />
          </Container>
        );
      }}
    </Form>
  );
};
WebhooksDetailsPage.displayName = "WebhooksDetailsPage";
export default WebhooksDetailsPage;
