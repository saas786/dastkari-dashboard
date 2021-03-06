import React from "react";
import { useIntl } from "react-intl";

import { WindowTitle } from "@dastkari/components/WindowTitle";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@dastkari/config";
import useNavigator from "@dastkari/hooks/useNavigator";
import useNotifier from "@dastkari/hooks/useNotifier";
import { commonMessages } from "@dastkari/intl";
import useServiceAccountSearch from "@dastkari/searches/useServiceAccountSearch";
import { WebhookEventTypeEnum } from "@dastkari/types/globalTypes";
import WebhookDeleteDialog from "@dastkari/webhooks/components/WebhookDeleteDialog";
import { WebhookDelete } from "@dastkari/webhooks/types/WebhookDelete";
import { WebhookUpdate } from "@dastkari/webhooks/types/WebhookUpdate";
import createDialogActionHandlers from "@dastkari/utils/handlers/dialogActionHandlers";
import NotFoundPage from "@dastkari/components/NotFoundPage";
import { getStringOrPlaceholder } from "../../misc";
import WebhooksDetailsPage from "../components/WebhooksDetailsPage";
import { TypedWebhookDelete, TypedWebhookUpdate } from "../mutations";
import { TypedWebhooksDetailsQuery } from "../queries";
import {
  webhookListUrl,
  webhookUrl,
  WebhookUrlDialog,
  WebhookUrlQueryParams
} from "../urls";

export interface WebhooksDetailsProps {
  id: string;
  params: WebhookUrlQueryParams;
}

export const WebhooksDetails: React.FC<WebhooksDetailsProps> = ({
  id,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const {
    search: searchServiceAccount,
    result: searchServiceAccountOpt
  } = useServiceAccountSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    WebhookUrlDialog,
    WebhookUrlQueryParams
  >(navigate, params => webhookUrl(id, params), params);

  const onWebhookDelete = (data: WebhookDelete) => {
    if (data.webhookDelete?.errors.length === 0) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      navigate(webhookListUrl());
    }
  };

  const onWebhookUpdate = (data: WebhookUpdate) => {
    const errors = data.webhookUpdate?.errors;
    const webhook = data.webhookUpdate?.webhook;

    if (errors.length === 0 && webhook) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      closeModal();
    }
  };

  const handleOnBack = () => navigate(webhookListUrl());

  return (
    <TypedWebhookUpdate onCompleted={onWebhookUpdate}>
      {(webhookUpdate, webhookUpdateOpts) => (
        <TypedWebhookDelete onCompleted={onWebhookDelete}>
          {(webhookDelete, webhookDeleteOpts) => (
            <TypedWebhooksDetailsQuery variables={{ id }}>
              {webhookDetails => {
                const handleRemoveConfirm = () =>
                  webhookDelete({
                    variables: {
                      id
                    }
                  });

                const webhook = webhookDetails?.data?.webhook;
                const formErrors =
                  webhookUpdateOpts.data?.webhookUpdate.errors || [];

                if (webhook === null) {
                  return <NotFoundPage onBack={handleOnBack} />;
                }

                return (
                  <>
                    <WindowTitle
                      title={getStringOrPlaceholder(
                        webhookDetails?.data?.webhook?.name
                      )}
                    />
                    <WebhooksDetailsPage
                      disabled={webhookDetails.loading}
                      errors={formErrors}
                      saveButtonBarState={webhookUpdateOpts.status}
                      webhook={webhook}
                      fetchServiceAccounts={searchServiceAccount}
                      services={searchServiceAccountOpt.data?.search.edges.map(
                        edge => edge.node
                      )}
                      onBack={handleOnBack}
                      onDelete={() => openModal("remove")}
                      onSubmit={data => {
                        webhookUpdate({
                          variables: {
                            id,
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
                      }}
                    />
                    <WebhookDeleteDialog
                      confirmButtonState={webhookDeleteOpts.status}
                      name={webhook?.name}
                      onClose={closeModal}
                      onConfirm={handleRemoveConfirm}
                      open={params.action === "remove"}
                    />
                  </>
                );
              }}
            </TypedWebhooksDetailsQuery>
          )}
        </TypedWebhookDelete>
      )}
    </TypedWebhookUpdate>
  );
};
WebhooksDetails.displayName = "WebhooksDetails";
export default WebhooksDetails;
