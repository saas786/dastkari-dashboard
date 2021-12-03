import React from "react";
import { useIntl } from "react-intl";

import AccountPermissions from "@dastkari/components/AccountPermissions";
import AccountStatus from "@dastkari/components/AccountStatus";
import AppHeader from "@dastkari/components/AppHeader";
import CardSpacer from "@dastkari/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import { ShopInfo_shop_permissions } from "@dastkari/components/Shop/types/ShopInfo";
import { sectionNames } from "@dastkari/intl";
import { maybe } from "@dastkari/misc";
import { ServiceDetails_serviceAccount } from "@dastkari/services/types/ServiceDetails";
import { PermissionEnum } from "@dastkari/types/globalTypes";
import { AccountErrorFragment } from "@dastkari/customers/types/AccountErrorFragment";
import { getFormErrors } from "@dastkari/utils/errors";
import getAccountErrorMessage from "@dastkari/utils/errors/account";
import ServiceDefaultToken from "../ServiceDefaultToken";
import ServiceInfo from "../ServiceInfo";
import ServiceTokens from "../ServiceTokens";

export interface ServiceDetailsPageFormData {
  hasFullAccess: boolean;
  isActive: boolean;
  name: string;
  permissions: PermissionEnum[];
}
export interface ServiceDetailsPageProps {
  apiUri: string;
  disabled: boolean;
  errors: AccountErrorFragment[];
  permissions: ShopInfo_shop_permissions[];
  saveButtonBarState: ConfirmButtonTransitionState;
  service: ServiceDetails_serviceAccount;
  token: string;
  onApiUriClick: () => void;
  onBack: () => void;
  onTokenDelete: (id: string) => void;
  onDelete: () => void;
  onTokenClose: () => void;
  onTokenCreate: () => void;
  onSubmit: (data: ServiceDetailsPageFormData) => void;
}

const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = props => {
  const {
    apiUri,
    disabled,
    errors,
    permissions,
    saveButtonBarState,
    service,
    token,
    onApiUriClick,
    onBack,
    onDelete,
    onTokenClose,
    onTokenCreate,
    onTokenDelete,
    onSubmit
  } = props;
  const intl = useIntl();

  const formErrors = getFormErrors(["permissions"], errors || []);
  const permissionsError = getAccountErrorMessage(formErrors.permissions, intl);

  const initialForm: ServiceDetailsPageFormData = {
    hasFullAccess: maybe(
      () =>
        permissions.filter(
          perm =>
            maybe(() => service.permissions, []).filter(
              userPerm => userPerm.code === perm.code
            ).length === 0
        ).length === 0,
      false
    ),
    isActive: maybe(() => service.isActive, false),
    name: maybe(() => service.name, ""),
    permissions: maybe(() => service.permissions, []).map(perm => perm.code)
  };
  return (
    <Form initial={initialForm} onSubmit={onSubmit} confirmLeave>
      {({ data, change, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.serviceAccounts)}
          </AppHeader>
          <PageHeader title={maybe(() => service.name)} />
          <Grid>
            <div>
              {token && (
                <>
                  <ServiceDefaultToken
                    apiUri={apiUri}
                    token={token}
                    onApiUriClick={onApiUriClick}
                    onTokenClose={onTokenClose}
                  />
                  <CardSpacer />
                </>
              )}
              <ServiceInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <ServiceTokens
                tokens={service?.tokens}
                onCreate={onTokenCreate}
                onDelete={onTokenDelete}
              />
            </div>
            <div>
              <AccountPermissions
                data={data}
                errorMessage={permissionsError}
                disabled={disabled}
                permissions={permissions}
                permissionsExceeded={false}
                onChange={change}
                fullAccessLabel={intl.formatMessage({
                  defaultMessage: "User has full access to the store",
                  description: "checkbox label"
                })}
                description={intl.formatMessage({
                  defaultMessage:
                    "Expand or restrict user's permissions to access certain part of dastkari system.",
                  description: "card description"
                })}
              />
              <CardSpacer />
              <AccountStatus
                data={data}
                disabled={disabled}
                label={intl.formatMessage({
                  defaultMessage: "Service account is active",
                  description: "checkbox label"
                })}
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
      )}
    </Form>
  );
};

ServiceDetailsPage.displayName = "ServiceDetailsPage";
export default ServiceDetailsPage;
