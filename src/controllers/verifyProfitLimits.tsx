export function verifyProfitLimits(value: string | undefined) {
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
  changeInputType('number');

  function changeInputType(type: string) {
    document.querySelectorAll('input[disabled]').forEach((el) => {
      el.setAttribute('type', type);
    });
  }

  return value;
}
