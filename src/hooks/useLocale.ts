import { useContext } from "react";

import { LocaleContext } from "@dastkari/components/Locale";

function useLocale() {
  const localeInfo = useContext(LocaleContext);
  return localeInfo;
}
export default useLocale;
