import React from "react";
import { useIntl } from "react-intl";

import FormSpacer from "@dastkari/components/FormSpacer";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import { PermissionEnum } from "@dastkari/types/globalTypes";
import { ShopInfo_shop_permissions } from "@dastkari/components/Shop/types/ShopInfo";
import { ListActions, SortPage } from "@dastkari/types";
import AccountPermissions from "@dastkari/components/AccountPermissions";
import AppHeader from "@dastkari/components/AppHeader";
import PageHeader from "@dastkari/components/PageHeader";
import { sectionNames } from "@dastkari/intl";
import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import {
  isGroupFullAccess,
  extractPermissionCodes
} from "@dastkari/permissionGroups/utils";
import { MembersListUrlSortField } from "@dastkari/permissionGroups/urls";
import { PermissionGroupErrorFragment } from "@dastkari/permissionGroups/types/PermissionGroupErrorFragment";
import { getFormErrors } from "@dastkari/utils/errors";
import getPermissionGroupErrorMessage from "@dastkari/utils/errors/permissionGroups";
import PermissionGroupInfo from "../PermissionGroupInfo";
import {
  PermissionGroupDetails_permissionGroup,
  PermissionGroupDetails_permissionGroup_users
} from "../../types/PermissionGroupDetails";
import PermissionGroupMemberList from "../PermissionGroupMemberList";

export interface PermissionGroupDetailsPageFormData {
  name: string;
  hasFullAccess: boolean;
  isActive: boolean;
  permissions: PermissionEnum[];
  users: PermissionGroupDetails_permissionGroup_users[];
}

export interface PermissionData extends ShopInfo_shop_permissions {
  lastSource?: boolean;
  disabled?: boolean;
}

export interface PermissionGroupDetailsPageProps
  extends ListActions,
    SortPage<MembersListUrlSortField> {
  disabled: boolean;
  errors: PermissionGroupErrorFragment[];
  members: PermissionGroupDetails_permissionGroup_users[];
  membersModified: boolean;
  permissionGroup: PermissionGroupDetails_permissionGroup;
  permissions: PermissionData[];
  permissionsExceeded: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  onAssign: () => void;
  onBack: () => void;
  onUnassign: (ids: string[]) => void;
  onSubmit(data: PermissionGroupDetailsPageFormData);
}

const PermissionGroupDetailsPage: React.FC<PermissionGroupDetailsPageProps> = ({
  disabled,
  errors,
  members,
  membersModified,
  onBack,
  onSubmit,
  permissionGroup,
  permissions,
  permissionsExceeded,
  saveButtonBarState,
  ...listProps
}) => {
  const intl = useIntl();

  const initialForm: PermissionGroupDetailsPageFormData = {
    hasFullAccess: isGroupFullAccess(permissionGroup, permissions),
    isActive: false,
    name: permissionGroup?.name || "",
    permissions: extractPermissionCodes(permissionGroup),
    users: members
  };

  const formErrors = getFormErrors(["addPermissions"], errors);
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
          <PageHeader title={permissionGroup?.name} />

          <Grid>
            <div>
              <PermissionGroupInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <FormSpacer />
              <PermissionGroupMemberList
                disabled={disabled}
                {...listProps}
                users={data?.users || []}
              />
            </div>
            <div>
              <AccountPermissions
                permissionsExceeded={permissionsExceeded}
                data={data}
                disabled={disabled}
                permissions={permissions}
                onChange={change}
                errorMessage={permissionsError}
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
              disabled={disabled || !(hasChanged || membersModified)}
            />
          </div>
        </Container>
      )}
    </Form>
  );
};
PermissionGroupDetailsPage.displayName = "PermissionGroupDetailsPage";
export default PermissionGroupDetailsPage;
