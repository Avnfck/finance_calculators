type CapitalizationCheckbox = {
  value: boolean;
};

export function Capitalization({ value }: CapitalizationCheckbox) {
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <div className="badge badge-neutral">
          Capitalization of interest
          <input
            type="checkbox"
            checked={value}
            className="checkbox checkbox-warning checkbox-xs"
          />
        </div>
      </label>
    </div>
  );
}
