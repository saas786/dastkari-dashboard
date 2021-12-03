import React from "react";

import useNavigator from "@dastkari/hooks/useNavigator";
import ResetPasswordSuccessPage from "../components/ResetPasswordSuccessPage";

const ResetPasswordSuccessView: React.FC = () => {
  const navigate = useNavigator();

  return <ResetPasswordSuccessPage onBack={() => navigate("/")} />;
};
ResetPasswordSuccessView.displayName = "ResetPasswordSuccessView";
export default ResetPasswordSuccessView;
