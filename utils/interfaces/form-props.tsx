import { FormValues } from '@/features/accounts/components/account-form';

export type FormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (value: FormValues) => void;
  onDelete?: () => void;
  disable?: boolean;
};
