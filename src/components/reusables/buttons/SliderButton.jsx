import { Switch } from "@headlessui/react";
import "../../../components/styles/slider-button.css";

export default function SliderButton({ value, onSelect }) {
  return (
    <div className="slider-button-container">
      <Switch
        checked={value}
        onChange={onSelect}
        className={`switch ${value ? "switch-on" : "switch-off"}`}
      >
        <span className={`knob ${value ? "knob-on" : "knob-off"}`} />
      </Switch>
    </div>
  );
}
