import gql from "graphql-tag";

import makeQuery from "@dastkari/hooks/makeQuery";
import { TypedQuery } from "../queries";
import { Plugin, PluginVariables } from "./types/Plugin";
import { Plugins, PluginsVariables } from "./types/Plugins";

export const pluginsFragment = gql`
  fragment PluginFragment on Plugin {
    id
    name
    description
    active
  }
`;

export const pluginsDetailsFragment = gql`
  ${pluginsFragment}
  fragment PluginsDetailsFragment on Plugin {
    ...PluginFragment
    configuration {
      name
      type
      value
      helpText
      label
    }
  }
`;

const pluginsList = gql`
  ${pluginsFragment}
  query Plugins(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: PluginFilterInput
    $sort: PluginSortingInput
  ) {
    plugins(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...PluginFragment
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
export const usePluginsListQuery = makeQuery<Plugins, PluginsVariables>(
  pluginsList
);

const pluginsDetails = gql`
  ${pluginsDetailsFragment}
  query Plugin($id: ID!) {
    plugin(id: $id) {
      ...PluginsDetailsFragment
    }
  }
`;
export const TypedPluginsDetailsQuery = TypedQuery<Plugin, PluginVariables>(
  pluginsDetails
);
