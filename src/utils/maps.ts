import { MultiAutocompleteChoiceType } from "@dastkari/components/MultiAutocompleteSelectField";
import { ShopInfo_shop_countries } from "@dastkari/components/Shop/types/ShopInfo";
import { SingleAutocompleteChoiceType } from "@dastkari/components/SingleAutocompleteSelectField";

export function mapCountriesToChoices(
  countries: ShopInfo_shop_countries[]
): Array<SingleAutocompleteChoiceType | MultiAutocompleteChoiceType> {
  return countries.map(country => ({
    label: country.country,
    value: country.code
  }));
}
