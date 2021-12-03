import { MultiAutocompleteChoiceType } from "@dastkari/components/MultiAutocompleteSelectField";
import { ChangeEvent, FormChange } from "@dastkari/hooks/useForm";
import { toggle } from "@dastkari/utils/lists";

/**
 * @param change Use toggleValue callback delivered by form
 */
function createMultiAutocompleteSelectHandler(
  change: FormChange,
  setSelected: (choices: MultiAutocompleteChoiceType[]) => void,
  selected: MultiAutocompleteChoiceType[],
  choices: MultiAutocompleteChoiceType[]
): FormChange {
  return (event: ChangeEvent) => {
    change(event);

    const id = event.target.value;
    const choice = choices.find(choice => choice.value === id);

    setSelected(toggle(choice, selected, (a, b) => a.value === b.value));
  };
}

export default createMultiAutocompleteSelectHandler;
