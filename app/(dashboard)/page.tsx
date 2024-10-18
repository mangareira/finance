'use client';
import { Button } from '@/components/ui/button';
import { useNewAccount } from '@/features/accounts/hooks/use-new-accounts';

export default function Home() {
  const { onOpen } = useNewAccount();
  return (
    <div className="">
      {/* Criar um botton de usuario personalizado */}
      <Button onClick={onOpen}>add new Account</Button>
    </div>
  );
}
