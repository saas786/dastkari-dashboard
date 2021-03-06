import * as avatarImg from "@assets/images/avatars/avatar1.png";
import { SearchStaffMembers_search_edges_node } from "@dastkari/searches/types/SearchStaffMembers";
/* eslint-disable sort-keys */
import {
  PermissionEnum,
  PermissionGroupErrorCode
} from "@dastkari/types/globalTypes";

import { StaffMemberDetails_user_permissionGroups } from "@dastkari/staff/types/StaffMemberDetails";
import { PermissionGroupDetails_permissionGroup } from "./types/PermissionGroupDetails";
import { PermissionGroupList_permissionGroups_edges_node } from "./types/PermissionGroupList";
import { PermissionGroupErrorFragment } from "./types/PermissionGroupErrorFragment";

export const permissionGroups: PermissionGroupList_permissionGroups_edges_node[] = [
  {
    node: {
      id: "R3JvdXA6Mg==",
      name: "Customer Support",
      userCanManage: true,
      users: [
        {
          id: "VXNlcjoyMQ==",
          firstName: "",
          lastName: "",
          __typename: "User" as "User"
        }
      ],
      __typename: "Group" as "Group"
    },
    __typename: "GroupCountableEdge" as "GroupCountableEdge"
  },
  {
    node: {
      id: "R3JvdXA6MQ==",
      name: "Full Access",
      userCanManage: false,
      users: [
        {
          id: "VXNlcjoyMQ==",
          firstName: "",
          lastName: "",
          __typename: "User" as "User"
        }
      ],
      __typename: "Group" as "Group"
    },
    __typename: "GroupCountableEdge" as "GroupCountableEdge"
  },
  {
    node: {
      id: "R3JvdXA6NA==",
      name: "Management",
      users: [],
      userCanManage: true,
      __typename: "Group" as "Group"
    },
    __typename: "GroupCountableEdge" as "GroupCountableEdge"
  },
  {
    node: {
      id: "R3JvdXA6Mw==",
      name: "Editors",
      userCanManage: true,
      users: [
        {
          id: "VXNlcjoyMw==",
          firstName: "Bryan",
          lastName: "Rodgers",
          __typename: "User" as "User"
        },
        {
          id: "VXNlcjoyMg==",
          firstName: "Joshua",
          lastName: "Mitchell",
          __typename: "User" as "User"
        }
      ],
      __typename: "Group" as "Group"
    },
    __typename: "GroupCountableEdge" as "GroupCountableEdge"
  },
  {
    node: {
      id: "R3JvdXA6NQ==",
      name: "Publishers",
      userCanManage: true,
      users: [],
      __typename: "Group" as "Group"
    },
    __typename: "GroupCountableEdge" as "GroupCountableEdge"
  }
].map(edge => edge.node);

export const userPermissionGroups: StaffMemberDetails_user_permissionGroups[] = [
  {
    id: "R3JvdXA6MQ==",
    name: "Full Access",
    userCanManage: false,
    __typename: "Group"
  },
  {
    id: "R3JvdXA6Mg==",
    name: "Customer Support",
    userCanManage: true,
    __typename: "Group"
  }
];

export const emptyPermissionGroup: PermissionGroupDetails_permissionGroup = {
  id: "R3JvdXA6Mw==",
  name: "Editors",
  userCanManage: true,
  users: [],
  __typename: "Group",
  permissions: [
    {
      code: PermissionEnum.MANAGE_PAGES,
      name: "Manage pages.",
      __typename: "Permission"
    }
  ]
};

export const errorsOfPermissionGroupCreate: PermissionGroupErrorFragment[] = [
  {
    field: "name",
    code: PermissionGroupErrorCode.UNIQUE,
    __typename: "PermissionGroupError"
  },
  {
    field: "permissions",
    code: PermissionGroupErrorCode.OUT_OF_SCOPE_PERMISSION,
    __typename: "PermissionGroupError"
  }
];

export const permissionGroup: PermissionGroupDetails_permissionGroup = {
  id: "R3JvdXA6Mw==",
  name: "Editors",
  userCanManage: true,
  users: [
    {
      id: "VXNlcjoyMg==",
      firstName: "Joshua",
      lastName: "Mitchell",
      __typename: "User",
      email: "joshua.mitchell@example.com",
      isActive: true,
      avatar: null
    },
    {
      id: "VXNlcjoyMw==",
      firstName: "Bryan",
      lastName: "Rodgers",
      __typename: "User",
      email: "bryan.rodgers@example.com",
      isActive: true,
      avatar: null
    }
  ],
  __typename: "Group",
  permissions: [
    {
      code: PermissionEnum.MANAGE_PAGES,
      name: "Manage pages.",
      __typename: "Permission"
    }
  ]
};

export const users: SearchStaffMembers_search_edges_node[] = [
  {
    node: {
      id: "VXNlcjoyMQ==",
      email: "admin@example.com",
      firstName: "",
      lastName: "",
      isActive: true,
      avatar: {
        alt: null,
        url: avatarImg,
        __typename: "Image" as "Image"
      },
      __typename: "User" as "User"
    },
    __typename: "UserCountableEdge" as "UserCountableEdge"
  },
  {
    node: {
      id: "VXNlcjoyMw==",
      email: "bryan.rodgers@example.com",
      firstName: "Bryan",
      lastName: "Rodgers",
      isActive: true,
      avatar: {
        alt: null,
        url: avatarImg,
        __typename: "Image" as "Image"
      },
      __typename: "User" as "User"
    },
    __typename: "UserCountableEdge" as "UserCountableEdge"
  },
  {
    node: {
      id: "VXNlcjoyMg==",
      email: "joshua.mitchell@example.com",
      firstName: "Joshua",
      lastName: "Mitchell",
      isActive: true,
      avatar: {
        alt: null,
        url: avatarImg,
        __typename: "Image" as "Image"
      },
      __typename: "User" as "User"
    },
    __typename: "UserCountableEdge" as "UserCountableEdge"
  },
  {
    node: {
      id: "VXNlcjoyMg==",
      email: "joshua.mitchell@example.com",
      firstName: "Joshua",
      lastName: "Mitchell",
      isActive: true,
      avatar: {
        alt: null,
        url: avatarImg,
        __typename: "Image" as "Image"
      },
      __typename: "User" as "User"
    },
    __typename: "UserCountableEdge" as "UserCountableEdge"
  }
].map(edge => edge.node);
