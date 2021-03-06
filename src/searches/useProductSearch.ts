import gql from "graphql-tag";

import makeTopLevelSearch from "@dastkari/hooks/makeTopLevelSearch";
import { pageInfoFragment } from "@dastkari/queries";
import {
  SearchProducts,
  SearchProductsVariables
} from "./types/SearchProducts";

export const searchProducts = gql`
  ${pageInfoFragment}
  query SearchProducts($after: String, $first: Int!, $query: String!) {
    search: products(after: $after, first: $first, filter: { search: $query }) {
      edges {
        node {
          id
          name
          thumbnail {
            url
          }
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export default makeTopLevelSearch<SearchProducts, SearchProductsVariables>(
  searchProducts
);
