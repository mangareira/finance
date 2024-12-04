'use client';

import { useState } from 'react';

import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { DateRange } from 'react-day-picker';

import { formatDateRange } from '@/lib/utils';

import { Button } from './button';
import { Calendar } from './calendar';
import {
  Popover,
  PopoverCloser,
  PopoverContent,
  PopoverTrigger,
} from './popover';

export const DateFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const accountId = params.get('accountId');
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      from: format(dateRange?.from || defaultFrom, 'yyyy-MM-dd', {
        locale: ptBR,
      }),
      to: format(dateRange?.to || defaultTo, 'yyyy-MM-dd', {
        locale: ptBR,
      }),
      accountId,
    };

    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
          disabled={false}
          size={'sm'}
          variant={'outline'}
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="lg:w-auto w-full p-0">
        <Calendar
          initialFocus
          defaultMonth={date?.from}
          disabled={false}
          mode="range"
          numberOfMonths={2}
          selected={date}
          onSelect={setDate}
        />
        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverCloser asChild>
            <Button
              className="w-full"
              disabled={!date?.from || !date.to}
              variant={'outline'}
              onClick={onReset}
            >
              Resetar
            </Button>
          </PopoverCloser>
          <PopoverCloser asChild>
            <Button
              className="w-full"
              disabled={!date?.from || !date.to}
              onClick={() => pushToUrl(date)}
            >
              Confirmar
            </Button>
          </PopoverCloser>
        </div>
      </PopoverContent>
    </Popover>
  );
};
