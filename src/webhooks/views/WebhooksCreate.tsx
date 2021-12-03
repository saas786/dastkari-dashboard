import { WindowTitle } from "@dastkari/components/WindowTitle";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@dastkari/config";
import useNavigator from "@dastkari/hooks/useNavigator";
import useNotifier from "@dastkari/hooks/useNotifier";
import { commonMessages } from "@dastkari/intl";
import useServiceAccountSearch from "@dastkari/searches/useServiceAccountSearch";
import { WebhookEventTypeEnum } from "@dastkari/types/globalTypes";
import { WebhookCreate as WebhookCreateData } from "@dastkari/webhooks/types/WebhookCreate";
import React from "react";
import { useIntl } from "react-intl";
import WebhookCreatePage, { FormData } from "../components/WebhookCreatePage";
import { TypedWebhookCreate } from "../mutations";
import { webhookListUrl, WebhookListUrlQueryParams, webhookUrl } from "../urls";

export interface WebhooksCreateProps {
  id: string;
  params: WebhookListUrlQueryParams;
}

export const WebhooksCreate: React.FC<WebhooksCreateProps> = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const {
    search: searchServiceAccount,
    result: searchServiceAccountOpt
  } = useServiceAccountSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });

  const onSubmit = (data: WebhookCreateData) => {
    if (data.webhookCreate.errors.length === 0) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      navigate(webhookUrl(data.webhookCreate.webhook.id));
    }
  };

  const handleBack = () => navigate(webhookListUrl());

  return (
    <TypedWebhookCreate onCompleted={onSubmit}>
      {(webhookCreate, webhookCreateOpts) => {
        const handleSubmit = (data: FormData) =>
          webhookCreate({
            variables: {
              input: {
                events: data.allEvents
                  ? [WebhookEventTypeEnum.ANY_EVENTS]
                  : data.events,
                isActive: data.isActive,
                name: data.name,
                secretKey: data.secretKey,
                serviceAccount: data.serviceAccount,
                targetUrl: data.targetUrl
              }
            }
          });

        return (
          <>
            <WindowTitle
              title={intl.formatMessage({
                defaultMessage: "Create Webhook",
                description: "window title"
              })}
            />
            <WebhookCreatePage
              disabled={false}
              errors={webhookCreateOpts.data?.webhookCreate.errors || []}
              fetchServiceAccounts={searchServiceAccount}
              services={searchServiceAccountOpt.data?.search.edges.map(
                edge => edge.node
              )}
              onBack={handleBack}
              onSubmit={handleSubmit}
              saveButtonBarState={webhookCreateOpts.status}
            />
          </>
        );
      }}
    </TypedWebhookCreate>
  );
};
WebhooksCreate.displayName = "WebhooksCreate";
export default WebhooksCreate;
