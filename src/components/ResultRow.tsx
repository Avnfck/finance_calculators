type ResultRowArgumentsTypes = {
  name: string;
  unit?: string;
  value?: string;
};

function handleProfitLimits(value: string | undefined) {
  if (!value) {
    return '0';
  }

  const numValue = parseFloat(value);
  if (numValue < 0) {
    changeInputType('text');
    return 'Profit less than 0.';
  }
  if (numValue > 1000000) {
    changeInputType('text');
    return 'Profit over 1 mln.';
  }
  changeInputType('number')

  function changeInputType(type: string) {
    document.querySelectorAll('input[disabled]').forEach((el) => {
      el.setAttribute('type', type)
    })
  }

  return value;
}

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
        value={handleProfitLimits(value)}
        disabled
      />
      <span>{unit}</span>
    </div>
  );
}