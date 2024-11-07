'use client';

import { useMemo } from 'react';

import { SingleValue } from 'react-select';
import CreateableSelect from 'react-select/creatable';

import { SelectProps } from '@/utils/interfaces/select-props';

export const Select = ({
  onChange,
  disable,
  onCreate,
  options = [],
  placeholder,
  value,
}: SelectProps) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreateableSelect
      className="text-sm h-10"
      isDisabled={disable}
      options={options}
      placeholder={placeholder}
      styles={{
        control: (base) => ({
          ...base,
          borderColor: '#e2e8f0',
          ':hover': {
            borderColor: '#e2e8f0',
          },
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      onCreateOption={onCreate}
    />
  );
};
