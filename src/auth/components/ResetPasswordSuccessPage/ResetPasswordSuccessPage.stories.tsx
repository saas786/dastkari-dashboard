import { storiesOf } from "@storybook/react";
import React from "react";

import CardDecorator from "@dastkari/storybook/CardDecorator";
import Decorator from "@dastkari/storybook/Decorator";
import ResetPasswordSuccessPage from "./ResetPasswordSuccessPage";

storiesOf("Views / Authentication / Reset password success", module)
  .addDecorator(CardDecorator)
  .addDecorator(Decorator)
  .add("default", () => <ResetPasswordSuccessPage onBack={() => undefined} />);
