import { Omit } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import React from "react";
import StaffDetailsPage, {
  StaffDetailsPageProps
} from "@dastkari/staff/components/StaffDetailsPage";
import { staffMember } from "@dastkari/staff/fixtures";
import Decorator from "@dastkari/storybook/Decorator";
import { userPermissionGroups } from "@dastkari/permissionGroups/fixtures";

const props: Omit<StaffDetailsPageProps, "classes"> = {
  availablePermissionGroups: [],
  canEditAvatar: false,
  canEditPreferences: false,
  canEditStatus: true,
  canRemove: true,
  disabled: false,
  errors: [],
  fetchMorePermissionGroups: undefined,
  initialSearch: "",
  onBack: () => undefined,
  onChangePassword: () => undefined,
  onDelete: () => undefined,
  onImageDelete: () => undefined,
  onImageUpload: () => undefined,
  onSearchChange: () => undefined,
  onSubmit: () => undefined,
  saveButtonBarState: "default",
  staffMember: { ...staffMember, permissionGroups: userPermissionGroups }
};

storiesOf("Views / Staff / Staff member details", module)
  .addDecorator(Decorator)
  .add("default", () => <StaffDetailsPage {...props} />)
  .add("loading", () => (
    <StaffDetailsPage {...props} disabled={true} staffMember={undefined} />
  ))
  .add("not admin", () => <StaffDetailsPage {...props} canEditStatus={false} />)
  .add("himself", () => (
    <StaffDetailsPage
      {...props}
      canEditStatus={false}
      canRemove={false}
      canEditAvatar={true}
      canEditPreferences={true}
    />
  ));
