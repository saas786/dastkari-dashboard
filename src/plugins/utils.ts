import { ConfigurationTypeFieldEnum } from "@dastkari/types/globalTypes";
import { Plugin_plugin_configuration } from "./types/Plugin";

export function isSecretField(
  config: Plugin_plugin_configuration[],
  field: string
) {
  return [
    ConfigurationTypeFieldEnum.PASSWORD,
    ConfigurationTypeFieldEnum.SECRET
  ].includes(config.find(configField => configField.name === field).type);
}
