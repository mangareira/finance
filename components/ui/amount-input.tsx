import { Info, MinusCircle, PlusCircle } from 'lucide-react';
import CurrencyInput from 'react-currency-input-field';

import { cn } from '@/lib/utils';
import { AmountInputProps } from '@/utils/interfaces/amount-input-props';

import { Button } from './button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

export const AmountInput = ({
  onChange,
  value,
  disable,
  placeholder,
}: AmountInputProps) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) return;
    onChange((parseFloat(value) * -1).toString());
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              className={cn(
                'bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex  items-center justify-center transition h-7',
                isIncome && 'bg-emerald-500 hover:bg-emerald-600',
                isExpense && 'bg-rose-500 hover:bg-rose-600'
              )}
              type="button"
              onClick={onReverseValue}
            >
              {!parsedValue && <Info className="size-3 text-white" />}
              {isIncome && <PlusCircle className="size-3 text-white" />}
              {isExpense && <MinusCircle className="size-3 text-white" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Use [+] para renda e [-] despesa</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        decimalScale={2}
        decimalsLimit={2}
        disabled={disable}
        placeholder={placeholder}
        prefix="R$"
        value={value}
        onValueChange={onChange}
      />
      <p className="text-xs text-muted-foreground mt-2">
        {isIncome && 'Isso contara como renda'}
        {isExpense && 'Isso contara como despesa'}
      </p>
    </div>
  );
};
