import { User_userPermissions } from "@dastkari/auth/types/User";
import { ShopInfo_shop_permissions } from "@dastkari/components/Shop/types/ShopInfo";
import { PermissionGroupDetails_user_userPermissions } from "@dastkari/permissionGroups/types/PermissionGroupDetails";

export const getLastSourcesOfPermission = (
  groupId: string,
  userPermissions: PermissionGroupDetails_user_userPermissions[]
) =>
  userPermissions
    .filter(
      perm =>
        perm.sourcePermissionGroups.length === 1 &&
        perm.sourcePermissionGroups[0].id === groupId
    )
    .map(perm => perm.code);

export const getPermissionsComponentChoices = (
  userPermissions: User_userPermissions[],
  shopPermissions: ShopInfo_shop_permissions[],
  lastSourcesOfPermissionIds: string[]
) => {
  const userCodes = userPermissions.map(p => p.code) || [];

  return shopPermissions.map(perm => ({
    ...perm,
    __typename: "PermissionData",
    disabled: !userCodes.includes(perm.code),
    lastSource: lastSourcesOfPermissionIds.includes(perm.code)
  }));
};
