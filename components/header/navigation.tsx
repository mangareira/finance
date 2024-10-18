'use client';

import { useState } from 'react';

import { Menu } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useMedia } from 'react-use';

import { routes } from '@/utils/routes';

import { NavButton } from '../nav';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname();
  const router = useRouter();
  const isMobile = useMedia('(max-width: 1024px)', false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
            size={'sm'}
            variant={'outline'}
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="px-2" side="left">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((r) => (
              <Button
                key={r.href}
                className="w-full justify-start"
                variant={r.href === pathName ? 'secondary' : 'ghost'}
                onClick={() => onClick(r.href)}
              >
                {r.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((r) => (
        <NavButton
          key={r.href}
          href={r.href}
          isActive={pathName === r.href}
          label={r.label}
        />
      ))}
    </div>
  );
};
