import React, { FC } from "react";

import { observer } from "mobx-react-lite";

import Select from "react-select";

import { OptionT } from "Common/Select";
import { Settings, LabelHidingModKeyT } from "Stores/Settings";
import { ThemeContext } from "Components/Theme";

const LabelHidingConfiguration: FC<{
  settingsStore: Settings;
}> = observer(({ settingsStore }) => {
  if (
    !Object.values(settingsStore.labelHidingConfig.options)
      .map((o) => o.value)
      .includes(settingsStore.labelHidingConfig.config.labelHidingModKey)
  ) {
    settingsStore.labelHidingConfig.setLabelHidingModKey("altKey");
  }

  const valueToOption = (val: LabelHidingModKeyT): OptionT => {
    return {
      label: settingsStore.labelHidingConfig.options[val].label,
      value: val,
    };
  };

  const onModKeyChange = (newValue: LabelHidingModKeyT) => {
    settingsStore.labelHidingConfig.setLabelHidingModKey(newValue);
  };

  const context = React.useContext(ThemeContext);

  return (
    <div className="form-group mb-0">
      <Select
        styles={context.reactSelectStyles}
        classNamePrefix="react-select"
        instanceId="configuration-label-hiding"
        defaultValue={valueToOption(
          settingsStore.labelHidingConfig.config.labelHidingModKey
        )}
        options={Object.values(settingsStore.labelHidingConfig.options)}
        onChange={(option) =>
          onModKeyChange((option as OptionT).value as LabelHidingModKeyT)
        }
        hideSelectedOptions
      />
    </div>
  );
});

export { LabelHidingConfiguration };
