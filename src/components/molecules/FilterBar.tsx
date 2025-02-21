import { useState } from "react";
import { FilterBarProps } from "../../models/filterbar.props";
import Button from "../atoms/Button";

function FilterBar({ labels, onFilterChange }: FilterBarProps) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  function handleFilterClick(label: string) {
    setActiveLabel(label === activeLabel ? null : label);
    onFilterChange(label === activeLabel ? "" : label);
  }
  return (
    <div className="flex space-x-2 mb-4">
      {labels.map((label) => (
        <Button
          key={label}
          label={label}
          onClick={() => handleFilterClick(label)}
          active={activeLabel === label}
        />
      ))}
    </div>
  );
}

export default FilterBar;
