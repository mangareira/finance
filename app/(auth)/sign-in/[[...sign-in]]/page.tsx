import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg: flex flex-col items-center justify-center px-4">
        <div className="text-center pt-16 space-y-4">
          <h1 className="font-bold text-3xl text-[#2E2A47]">
            Bem vindo de volta!
          </h1>
          <p className="text-base text-[#7E8CA0]">
            Faça o login ou Crie uma conta para voltar para a dashboard
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          {/* Cria o modal de login e cadastro */}
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image alt="logo" height={100} src={'/logo.svg'} width={100} />
      </div>
    </div>
  );
}
