import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { TableHeadSelectProps } from '@/utils/interfaces/table-head-select-props';

const options = ['amount', 'payee', 'date'];

export const TableHeadSelect = ({
  columnIndex,
  onChange,
  selectedColumns,
}: TableHeadSelectProps) => {
  const currentSelect = selectedColumns[`column_${columnIndex}`];
  return (
    <Select
      value={currentSelect || ''}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          'focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize',
          currentSelect && 'text-blue-500'
        )}
      >
        <SelectValue placeholder="Pular" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Pular</SelectItem>
        {options.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${columnIndex}`] !== option;
          return (
            <SelectItem
              key={index}
              className="capitalize"
              disabled={disabled}
              value={option}
            >
              {option === 'amount' ? 'quantia' : ''}
              {option === 'payee' ? 'beneficiario' : ''}
              {option === 'date' ? 'data' : ''}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
