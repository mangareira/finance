import React from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { navProps } from '@/utils/interfaces/navProps';

import { Button } from '../ui/button';

export const NavButton = ({ href, label, isActive }: navProps) => {
  return (
    <Button
      asChild
      className={cn(
        'w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition',
        isActive ? 'bg-white/10 text-white' : 'bg-transparent'
      )}
      size={'sm'}
      variant={'outline'}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
