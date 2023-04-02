import { ChangeEventHandler } from 'react';

type InputRowHandlerType = ChangeEventHandler<HTMLInputElement> | undefined;
type InputRowArgumentsTypes = {
  name: string;
  value: string;
  unit?: string;
  handler: InputRowHandlerType;
};
export function InputRow({
  name,
  value = '0',
  unit = 'PLN',
  handler,
}: InputRowArgumentsTypes) {
  return (
    <div className="input-row-group">
      <span>{name}</span>
      <input
        type="number"
        min={0}
        className="input input-bordered"
        value={value}
        onChange={handler}
      />
      <span>{unit}</span>
    </div>
  );
}
