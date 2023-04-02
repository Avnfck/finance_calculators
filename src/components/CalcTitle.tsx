import { MouseEventHandler } from "react";

type CalcTitleType = {
  name: string;
  reset: MouseEventHandler<HTMLButtonElement> | undefined;
};

export function CalcTitle({ name, reset }: CalcTitleType) {
  return (
    <div className="navbar bg-base-100">
      <p className="calc-title normal-case text-xl">{name}</p>
      <button className="btn btn-outline btn-warning" onClick={reset}>Reset</button>
    </div>
  );
}
