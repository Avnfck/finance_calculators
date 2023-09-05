import { ChangeEventHandler } from 'react';

type CapitalizationCheckBoxHandlerType =
  | ChangeEventHandler<HTMLInputElement>
  | undefined;

type CapitalizationCheckbox = {
  value: boolean;
  handler: CapitalizationCheckBoxHandlerType;
};

export function CapitalizationCheckbox({
  value,
  handler,
}: CapitalizationCheckbox) {
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <div className="badge badge-neutral">
          Capitalization of interest
          <input
            type="checkbox"
            checked={value}
            onChange={handler}
            className="capitalization checkbox checkbox-warning checkbox-xs"
          />
        </div>
      </label>
    </div>
  );
}
