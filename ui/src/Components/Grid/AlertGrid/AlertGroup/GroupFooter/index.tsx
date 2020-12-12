import React, { FC } from "react";

import { observer } from "mobx-react-lite";

import { APIAlertGroupT } from "Models/APITypes";
import { StaticLabels } from "Common/Query";
import { AlertStore } from "Stores/AlertStore";
import { SilenceFormStore } from "Stores/SilenceFormStore";
import FilteringLabel from "Components/Labels/FilteringLabel";
import { RenderNonLinkAnnotation, RenderLinkAnnotation } from "../Annotation";
import { RenderSilence } from "../Silences";
import { Settings } from "Stores/Settings";

const GroupFooter: FC<{
  group: APIAlertGroupT;
  alertmanagers: string[];
  afterUpdate: () => void;
  alertStore: AlertStore;
  silenceFormStore: SilenceFormStore;
  showAnnotations?: boolean;
  showSilences?: boolean;
  settingsStore: Settings;
}> = ({
  group,
  alertmanagers,
  afterUpdate,
  alertStore,
  silenceFormStore,
  showAnnotations = true,
  showSilences = true,
  settingsStore,
}) => {
  return (
    <div className="card-footer components-grid-alertgrid-alertgroup-footer px-2 py-1">
      <div className="mb-1">
        {showAnnotations
          ? group.shared.annotations
              .filter((a) => a.isLink === false)
              .map((a) => (
                <RenderNonLinkAnnotation
                  key={a.name}
                  name={a.name}
                  value={a.value}
                  visible={a.visible}
                  afterUpdate={afterUpdate}
                />
              ))
          : null}
      </div>
      {Object.entries(group.shared.labels).map(([name, value]) => (
        <FilteringLabel
          key={name}
          name={name}
          value={value}
          alertStore={alertStore}
          settingsStore={settingsStore}
        />
      ))}
      {alertmanagers.map((cluster) => (
        <FilteringLabel
          key={cluster}
          name={StaticLabels.AlertmanagerCluster}
          value={cluster}
          alertStore={alertStore}
          settingsStore={settingsStore}
        />
      ))}
      {alertStore.data.receivers.length > 1 ? (
        <FilteringLabel
          name={StaticLabels.Receiver}
          value={group.receiver}
          alertStore={alertStore}
          settingsStore={settingsStore}
        />
      ) : null}
      {showAnnotations
        ? group.shared.annotations
            .filter((a) => a.isLink === true)
            .map((a) => (
              <RenderLinkAnnotation
                key={a.name}
                name={a.name}
                value={a.value}
              />
            ))
        : null}
      {Object.keys(group.shared.silences).length === 0 ? null : showSilences ? (
        <div className="components-grid-alertgrid-alertgroup-shared-silence rounded-0 border-0">
          {Object.entries(group.shared.silences).map(([cluster, silences]) =>
            silences.map((silenceID) => (
              <RenderSilence
                key={silenceID}
                alertStore={alertStore}
                silenceFormStore={silenceFormStore}
                afterUpdate={afterUpdate}
                cluster={cluster}
                silenceID={silenceID}
                settingsStore={settingsStore}
              />
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};

export default observer(GroupFooter);
