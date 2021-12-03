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
import { PermissionEnum } from "@dastkari/types/globalTypes";
import { AccountErrorFragment } from "@dastkari/customers/types/AccountErrorFragment";
import { getFormErrors } from "@dastkari/utils/errors";
import getAccountErrorMessage from "@dastkari/utils/errors/account";
import ServiceInfo from "../ServiceInfo";

export interface ServiceCreatePageFormData {
  hasFullAccess: boolean;
  isActive: boolean;
  name: string;
  permissions: PermissionEnum[];
}
export interface ServiceCreatePageProps {
  disabled: boolean;
  errors: AccountErrorFragment[];
  permissions: ShopInfo_shop_permissions[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: ServiceCreatePageFormData) => void;
}

const ServiceCreatePage: React.FC<ServiceCreatePageProps> = props => {
  const {
    disabled,
    errors,
    permissions,
    saveButtonBarState,
    onBack,
    onSubmit
  } = props;
  const intl = useIntl();

  const initialForm: ServiceCreatePageFormData = {
    hasFullAccess: false,
    isActive: false,
    name: "",
    permissions: []
  };

  const formErrors = getFormErrors(["permissions"], errors || []);
  const permissionsError = getAccountErrorMessage(formErrors.permissions, intl);

  return (
    <Form initial={initialForm} onSubmit={onSubmit} confirmLeave>
      {({ data, change, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.serviceAccounts)}
          </AppHeader>
          <PageHeader
            title={intl.formatMessage({
              defaultMessage: "Create New Account",
              description: "header"
            })}
          />
          <Grid>
            <div>
              <ServiceInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
            </div>
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
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onSave={submit}
          />
        </Container>
      )}
    </Form>
  );
};

ServiceCreatePage.displayName = "ServiceCreatePage";
export default ServiceCreatePage;
