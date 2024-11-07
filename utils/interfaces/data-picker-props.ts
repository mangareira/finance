import { SelectSingleEventHandler } from 'react-day-picker';

export type DatePickerProps = {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disable?: boolean;
};
