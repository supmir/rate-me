import { useState } from "react";

export default function Slider(props: { statName: string }) {
  const { statName } = props;
  const [value, setValue] = useState<number>(0);
  const values = Array.from(Array(10).keys());

  function updateValue(new_value: number) {
    setValue(Math.min(Math.max(new_value, 0), 10));
  }

  function stepValue(amount: number) {
    updateValue(value + amount);
  }
  return (
    <div className="grid gap-y-1">
      <div className="mx-auto">{statName}</div>
      <div className="flex gap-x-1 grow my-auto">
        <div
          onClick={() => {
            stepValue(-1);
          }}
        >
          -
        </div>
        {values.map((v, i) => {
          return (
            <div
              key={i}
              className={`h-8 border border-neutral-100 grow${
                i < value ? " bg-neutral-100" : ""
              }`}
              onClick={() => {
                updateValue(i + 1);
              }}
            ></div>
          );
        })}
        <div
          onClick={() => {
            stepValue(1);
          }}
        >
          +
        </div>
      </div>
    </div>
  );
}
