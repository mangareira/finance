import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';
import { AccountColumnsProps } from '@/utils/interfaces/account-columns-props';

export const AccountColumn = ({ account, accountId }: AccountColumnsProps) => {
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => {
    onOpenAccount(accountId);
  };

  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={onClick}
    >
      {account}
    </div>
  );
};
