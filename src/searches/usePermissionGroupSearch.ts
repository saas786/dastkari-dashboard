import gql from "graphql-tag";

import makeTopLevelSearch from "@dastkari/hooks/makeTopLevelSearch";
import { pageInfoFragment } from "@dastkari/queries";
import {
  SearchPermissionGroups,
  SearchPermissionGroupsVariables
} from "./types/SearchPermissionGroups";

export const searchPermissionGroups = gql`
  ${pageInfoFragment}
  query SearchPermissionGroups($after: String, $first: Int!, $query: String!) {
    search: permissionGroups(
      after: $after
      first: $first
      filter: { search: $query }
    ) {
      edges {
        node {
          id
          name
          userCanManage
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export default makeTopLevelSearch<
  SearchPermissionGroups,
  SearchPermissionGroupsVariables
>(searchPermissionGroups);
