import React from "react";
import { useIntl } from "react-intl";

import { Card, CardContent, Typography } from "@material-ui/core";
import AccountPermissionGroups from "@dastkari/components/AccountPermissionGroups";
import AccountStatus from "@dastkari/components/AccountStatus";
import AppHeader from "@dastkari/components/AppHeader";
import CardSpacer from "@dastkari/components/CardSpacer";
import CardTitle from "@dastkari/components/CardTitle";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import { MultiAutocompleteChoiceType } from "@dastkari/components/MultiAutocompleteSelectField";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import useLocale from "@dastkari/hooks/useLocale";
import useStateFromProps from "@dastkari/hooks/useStateFromProps";
import { sectionNames } from "@dastkari/intl";
import { getUserName } from "@dastkari/misc";
import { SearchPermissionGroups_search_edges_node } from "@dastkari/searches/types/SearchPermissionGroups";
import { FetchMoreProps, SearchPageProps } from "@dastkari/types";
import createMultiAutocompleteSelectHandler from "@dastkari/utils/handlers/multiAutocompleteSelectChangeHandler";
import { StaffErrorFragment } from "@dastkari/staff/types/StaffErrorFragment";
import { StaffMemberDetails_user } from "../../types/StaffMemberDetails";
import StaffPassword from "../StaffPassword/StaffPassword";
import StaffPreferences from "../StaffPreferences";
import StaffProperties from "../StaffProperties/StaffProperties";

export interface StaffDetailsFormData {
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  permissionGroups: string[];
}

export interface StaffDetailsPageProps extends SearchPageProps {
  availablePermissionGroups: SearchPermissionGroups_search_edges_node[];
  canEditAvatar: boolean;
  canEditPreferences: boolean;
  canEditStatus: boolean;
  canRemove: boolean;
  disabled: boolean;
  fetchMorePermissionGroups: FetchMoreProps;
  saveButtonBarState: ConfirmButtonTransitionState;
  staffMember: StaffMemberDetails_user;
  errors: StaffErrorFragment[];
  onBack: () => void;
  onChangePassword: () => void;
  onDelete: () => void;
  onImageDelete: () => void;
  onSubmit: (data: StaffDetailsFormData) => void;
  onImageUpload(file: File);
}

const StaffDetailsPage: React.FC<StaffDetailsPageProps> = ({
  availablePermissionGroups,
  canEditAvatar,
  canEditPreferences,
  canEditStatus,
  canRemove,
  disabled,
  errors,
  fetchMorePermissionGroups,
  initialSearch,
  onBack,
  onChangePassword,
  onDelete,
  onImageDelete,
  onImageUpload,
  onSearchChange,
  onSubmit,
  saveButtonBarState,
  staffMember
}: StaffDetailsPageProps) => {
  const intl = useIntl();
  const { locale, setLocale } = useLocale();
  const [
    permissionGroupsDisplayValues,
    setPermissionGroupsDisplayValues
  ] = useStateFromProps<MultiAutocompleteChoiceType[]>(
    (staffMember?.permissionGroups || []).map(group => ({
      disabled: !group.userCanManage,
      label: group.name,
      value: group.id
    })) || []
  );

  const initialForm: StaffDetailsFormData = {
    email: staffMember?.email || "",
    firstName: staffMember?.firstName || "",
    isActive: !!staffMember?.isActive,
    lastName: staffMember?.lastName || "",
    permissionGroups: staffMember?.permissionGroups.map(pg => pg.id) || []
  };

  return (
    <Form initial={initialForm} onSubmit={onSubmit} confirmLeave>
      {({ data: formData, change, hasChanged, submit, toggleValue }) => {
        const permissionGroupsChange = createMultiAutocompleteSelectHandler(
          toggleValue,
          setPermissionGroupsDisplayValues,
          permissionGroupsDisplayValues,
          availablePermissionGroups?.map(group => ({
            label: group.name,
            value: group.id
          })) || []
        );

        return (
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.staff)}
            </AppHeader>
            <PageHeader title={getUserName(staffMember)} />
            <Grid>
              <div>
                <StaffProperties
                  errors={errors}
                  data={formData}
                  disabled={disabled}
                  canEditAvatar={canEditAvatar}
                  staffMember={staffMember}
                  onChange={change}
                  onImageUpload={onImageUpload}
                  onImageDelete={onImageDelete}
                />
                {canEditPreferences && (
                  <>
                    <CardSpacer />
                    <StaffPassword onChangePassword={onChangePassword} />
                  </>
                )}
              </div>
              <div>
                {canEditPreferences && (
                  <StaffPreferences
                    locale={locale}
                    onLocaleChange={setLocale}
                  />
                )}
                {canEditStatus && (
                  <>
                    <Card>
                      <CardTitle
                        title={intl.formatMessage({
                          defaultMessage: "Permissions",
                          description: "dialog header"
                        })}
                      />
                      <CardContent>
                        <Typography>
                          {intl.formatMessage({
                            defaultMessage: "User is assigned to:",
                            description: "card description"
                          })}
                        </Typography>

                        <AccountPermissionGroups
                          formData={formData}
                          disabled={disabled}
                          errors={errors}
                          initialSearch={initialSearch}
                          availablePermissionGroups={availablePermissionGroups}
                          onChange={permissionGroupsChange}
                          onSearchChange={onSearchChange}
                          displayValues={permissionGroupsDisplayValues}
                          {...fetchMorePermissionGroups}
                        />
                      </CardContent>
                    </Card>
                    <CardSpacer />
                    <AccountStatus
                      data={formData}
                      disabled={disabled}
                      label={intl.formatMessage({
                        defaultMessage: "User is active",
                        description: "checkbox label"
                      })}
                      onChange={change}
                    />
                  </>
                )}
              </div>
            </Grid>
            <SaveButtonBar
              disabled={disabled || !hasChanged}
              state={saveButtonBarState}
              onCancel={onBack}
              onSave={submit}
              onDelete={canRemove ? onDelete : undefined}
            />
          </Container>
        );
      }}
    </Form>
  );
};
StaffDetailsPage.displayName = "StaffDetailsPage";
export default StaffDetailsPage;
