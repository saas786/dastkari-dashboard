import { useContext } from "react";

import { ShopContext } from "@dastkari/components/Shop";

function useShop() {
  return useContext(ShopContext);
}
export default useShop;
