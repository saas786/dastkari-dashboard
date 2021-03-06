import gql from "graphql-tag";

import makeMutation from "@dastkari/hooks/makeMutation";
import { productErrorFragment } from "@dastkari/attributes/mutations";
import { categoryDetailsFragment } from "./queries";
import {
  CategoryBulkDelete,
  CategoryBulkDeleteVariables
} from "./types/CategoryBulkDelete";
import {
  CategoryCreate,
  CategoryCreateVariables
} from "./types/CategoryCreate";
import {
  CategoryDelete,
  CategoryDeleteVariables
} from "./types/CategoryDelete";
import {
  CategoryUpdate,
  CategoryUpdateVariables
} from "./types/CategoryUpdate";

export const categoryDeleteMutation = gql`
  ${productErrorFragment}
  mutation CategoryDelete($id: ID!) {
    categoryDelete(id: $id) {
      errors: productErrors {
        ...ProductErrorFragment
      }
    }
  }
`;
export const useCategoryDeleteMutation = makeMutation<
  CategoryDelete,
  CategoryDeleteVariables
>(categoryDeleteMutation);

export const categoryCreateMutation = gql`
  ${categoryDetailsFragment}
  ${productErrorFragment}
  mutation CategoryCreate($parent: ID, $input: CategoryInput!) {
    categoryCreate(parent: $parent, input: $input) {
      category {
        ...CategoryDetailsFragment
      }
      errors: productErrors {
        ...ProductErrorFragment
      }
    }
  }
`;
export const useCategoryCreateMutation = makeMutation<
  CategoryCreate,
  CategoryCreateVariables
>(categoryCreateMutation);

export const categoryUpdateMutation = gql`
  ${categoryDetailsFragment}
  ${productErrorFragment}
  mutation CategoryUpdate($id: ID!, $input: CategoryInput!) {
    categoryUpdate(id: $id, input: $input) {
      category {
        ...CategoryDetailsFragment
      }
      errors: productErrors {
        ...ProductErrorFragment
      }
    }
  }
`;
export const useCategoryUpdateMutation = makeMutation<
  CategoryUpdate,
  CategoryUpdateVariables
>(categoryUpdateMutation);

export const categoryBulkDeleteMutation = gql`
  ${productErrorFragment}
  mutation CategoryBulkDelete($ids: [ID]!) {
    categoryBulkDelete(ids: $ids) {
      errors: productErrors {
        ...ProductErrorFragment
      }
    }
  }
`;
export const useCategoryBulkDeleteMutation = makeMutation<
  CategoryBulkDelete,
  CategoryBulkDeleteVariables
>(categoryBulkDeleteMutation);
