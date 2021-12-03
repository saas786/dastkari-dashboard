import React from "react";
import { useIntl } from "react-intl";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import { PermissionEnum } from "@dastkari/types/globalTypes";
import AccountPermissions from "@dastkari/components/AccountPermissions";
import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import AppHeader from "@dastkari/components/AppHeader";
import { sectionNames } from "@dastkari/intl";
import { PermissionGroupErrorFragment } from "@dastkari/permissionGroups/types/PermissionGroupErrorFragment";
import { getFormErrors } from "@dastkari/utils/errors";
import getPermissionGroupErrorMessage from "@dastkari/utils/errors/permissionGroups";
import PermissionGroupInfo from "../PermissionGroupInfo";
import { PermissionData } from "../PermissionGroupDetailsPage";

export interface PermissionGroupCreatePageFormData {
  name: string;
  hasFullAccess: boolean;
  isActive: boolean;
  permissions: PermissionEnum[];
}

const initialForm: PermissionGroupCreatePageFormData = {
  hasFullAccess: false,
  isActive: false,
  name: "",
  permissions: []
};

export interface PermissionGroupCreatePageProps {
  disabled: boolean;
  errors: PermissionGroupErrorFragment[];
  permissions: PermissionData[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit(data: PermissionGroupCreatePageFormData);
}

const PermissionGroupCreatePage: React.FC<PermissionGroupCreatePageProps> = ({
  disabled,
  permissions,
  onBack,
  onSubmit,
  saveButtonBarState,
  errors
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["addPermissions"], errors || []);
  const permissionsError = getPermissionGroupErrorMessage(
    formErrors.addPermissions,
    intl
  );

  return (
    <Form initial={initialForm} onSubmit={onSubmit} confirmLeave>
      {({ data, change, submit, hasChanged }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.permissionGroups)}
          </AppHeader>
          <Grid>
            <div>
              <PermissionGroupInfo
                data={data}
                errors={errors}
                onChange={change}
                disabled={disabled}
              />
            </div>
            <div>
              <AccountPermissions
                permissionsExceeded={false}
                data={data}
                errorMessage={permissionsError}
                disabled={disabled}
                permissions={permissions}
                onChange={change}
                fullAccessLabel={intl.formatMessage({
                  defaultMessage: "Group has full access to the store",
                  description: "checkbox label"
                })}
                description={intl.formatMessage({
                  defaultMessage:
                    "Expand or restrict group's permissions to access certain part of dastkari system.",
                  description: "card description"
                })}
              />
            </div>
          </Grid>
          <div>
            <SaveButtonBar
              onCancel={onBack}
              onSave={submit}
              state={saveButtonBarState}
              disabled={disabled || !hasChanged}
            />
          </div>
        </Container>
      )}
    </Form>
  );
};
PermissionGroupCreatePage.displayName = "PermissionGroupCreatePage";
export default PermissionGroupCreatePage;
