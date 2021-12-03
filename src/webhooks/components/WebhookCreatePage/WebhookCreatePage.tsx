import AppHeader from "@dastkari/components/AppHeader";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import FormSpacer from "@dastkari/components/FormSpacer";
import Grid from "@dastkari/components/Grid";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import { sectionNames } from "@dastkari/intl";
import { SearchServiceAccount_search_edges_node } from "@dastkari/searches/types/SearchServiceAccount";
import { WebhookEventTypeEnum } from "@dastkari/types/globalTypes";
import createSingleAutocompleteSelectHandler from "@dastkari/utils/handlers/singleAutocompleteSelectChangeHandler";
import WebhookEvents from "@dastkari/webhooks/components/WebhookEvents";
import WebhookInfo from "@dastkari/webhooks/components/WebhookInfo";
import WebhookStatus from "@dastkari/webhooks/components/WebhookStatus";
import React from "react";
import { useIntl } from "react-intl";
import { WebhookErrorFragment } from "@dastkari/webhooks/types/WebhookErrorFragment";

export interface FormData {
  events: WebhookEventTypeEnum[];
  isActive: boolean;
  name: string;
  secretKey: string | null;
  targetUrl: string;
  serviceAccount: string;
  allEvents: boolean;
}

export interface WebhookCreatePageProps {
  disabled: boolean;
  errors: WebhookErrorFragment[];
  services?: SearchServiceAccount_search_edges_node[];
  saveButtonBarState: ConfirmButtonTransitionState;
  fetchServiceAccounts: (data: string) => void;
  onBack: () => void;
  onSubmit: (data: FormData) => void;
}

const WebhookCreatePage: React.FC<WebhookCreatePageProps> = ({
  disabled,
  errors,
  saveButtonBarState,
  services,
  fetchServiceAccounts,
  onBack,
  onSubmit
}) => {
  const intl = useIntl();
  const initialForm: FormData = {
    allEvents: false,
    events: [],
    isActive: false,
    name: "",
    secretKey: "",
    serviceAccount: "",
    targetUrl: ""
  };
  const [selectedServiceAcccount, setSelectedServiceAcccount] = React.useState(
    ""
  );
  const servicesChoiceList =
    services?.map(node => ({
      label: node.name,
      value: node.id
    })) || [];

  return (
    <Form initial={initialForm} onSubmit={onSubmit}>
      {({ data, hasChanged, submit, change }) => {
        const handleServiceSelect = createSingleAutocompleteSelectHandler(
          change,
          setSelectedServiceAcccount,
          servicesChoiceList
        );
        return (
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.webhooks)}
            </AppHeader>
            <PageHeader
              title={intl.formatMessage({
                defaultMessage: "Create Webhook",
                description: "header"
              })}
            />
            <Grid>
              <div>
                <WebhookInfo
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  fetchServiceAccounts={fetchServiceAccounts}
                  serviceDisplayValue={selectedServiceAcccount}
                  services={servicesChoiceList}
                  serviceOnChange={handleServiceSelect}
                  onChange={change}
                />
              </div>
              <div>
                <WebhookEvents
                  data={data}
                  disabled={disabled}
                  onChange={change}
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
            />
          </Container>
        );
      }}
    </Form>
  );
};
WebhookCreatePage.displayName = "WebhookCreatePage";
export default WebhookCreatePage;
