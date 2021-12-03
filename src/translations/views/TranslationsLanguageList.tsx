import React from "react";

import useNavigator from "@dastkari/hooks/useNavigator";
import useShop from "@dastkari/hooks/useShop";
import { maybe } from "../../misc";
import TranslationsLanguageListPage from "../components/TranslationsLanguageListPage";
import { languageEntitiesUrl } from "../urls";

const TranslationsLanguageList: React.FC = () => {
  const navigate = useNavigator();
  const shop = useShop();

  return (
    <TranslationsLanguageListPage
      languages={maybe(() => shop.languages)}
      //   onAdd={undefined}
      onRowClick={code => navigate(languageEntitiesUrl(code, {}))}
    />
  );
};
TranslationsLanguageList.displayName = "TranslationsLanguageList";
export default TranslationsLanguageList;
