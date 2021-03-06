import { storiesOf } from "@storybook/react";
import React from "react";

import { PageErrorCode } from "@dastkari/types/globalTypes";
import PageDetailsPage, {
  FormData,
  PageDetailsPageProps
} from "../../../pages/components/PageDetailsPage";
import { page } from "../../../pages/fixtures";
import Decorator from "../../Decorator";

const props: PageDetailsPageProps = {
  disabled: false,
  errors: [],
  onBack: () => undefined,
  onRemove: () => undefined,
  onSubmit: () => undefined,
  page,
  saveButtonBarState: "default"
};

storiesOf("Views / Pages / Page details", module)
  .addDecorator(Decorator)
  .add("default", () => <PageDetailsPage {...props} />)
  .add("loading", () => (
    <PageDetailsPage {...props} disabled={true} page={undefined} />
  ))
  .add("form errors", () => (
    <PageDetailsPage
      {...props}
      errors={([
        "title",
        "slug",
        "content",
        "publicationDate",
        "isPublished",
        "seoDescription",
        "seoTitle"
      ] as Array<keyof FormData>).map(field => ({
        __typename: "PageError",
        code: PageErrorCode.INVALID,
        field
      }))}
    />
  ));
