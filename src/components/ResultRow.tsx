type ResultRowArgumentsTypes = {
  name: string;
  unit?: string;
  value?: string;
};
export function ResultRow({
  name,
  unit = 'PLN',
  value,
}: ResultRowArgumentsTypes) {
  return (
    <div className="input-row-group">
      <span>{name}</span>
      <input
        type="number"
        min={0}
        className="input input-bordered"
        value={value}
        disabled
      />
      <span>{unit}</span>
    </div>
  );
}
