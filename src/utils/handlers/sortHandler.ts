import { UseNavigatorResult } from "@dastkari/hooks/useNavigator";
import { Sort } from "@dastkari/types";
import { DEFAULT_INITIAL_PAGINATION_DATA } from "@dastkari/config";
import { getSortUrlVariables } from "../sort";

type CreateUrl<T extends string> = (params: Sort<T>) => string;

function createSortHandler<T extends string>(
  navigate: UseNavigatorResult,
  createUrl: CreateUrl<T>,
  params: Sort<T>
) {
  return (field: T) =>
    navigate(
      createUrl({
        ...params,
        ...getSortUrlVariables(field, params),
        ...DEFAULT_INITIAL_PAGINATION_DATA
      }),
      true
    );
}

export default createSortHandler;
