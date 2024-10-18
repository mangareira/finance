import { Header } from '@/components/header';

type Props = {
  children: React.ReactNode;
};

export default function dashboardLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="px-4 lg:px-14">{children}</main>
    </>
  );
}
