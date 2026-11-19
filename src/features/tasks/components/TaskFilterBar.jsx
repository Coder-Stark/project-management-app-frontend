import Button from "../../../shared/components/Button.jsx";
import SelectField from "../../../shared/components/SelectField.jsx";
import {
  DEFAULT_FILTERS,
  SORT_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from "../tasks.constants.js";

export default function TaskFilterBar({ filters, onChange }) {
  const isDefault =
    filters.status === DEFAULT_FILTERS.status && filters.sort === DEFAULT_FILTERS.sort;

  return (
    <div className="mt-4 flex flex-wrap items-end gap-3">
      <div className="w-48">
        <SelectField
          id="statusFilter"
          label="Status"
          options={STATUS_FILTER_OPTIONS}
          value={filters.status}
          onChange={(event) => onChange({ ...filters, status: event.target.value })}
        />
      </div>

      <div className="w-56">
        <SelectField
          id="sortBy"
          label="Sort by"
          options={SORT_OPTIONS}
          value={filters.sort}
          onChange={(event) => onChange({ ...filters, sort: event.target.value })}
        />
      </div>

      {!isDefault && (
        <Button
          type="button"
          variant="secondary"
          fullWidth={false}
          onClick={() => onChange(DEFAULT_FILTERS)}
        >
          Clear
        </Button>
      )}
    </div>
  );
}