import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';

import { Input } from '../Input';

interface DatePickerItemProps {
  date: Date;
  setDate: (newDate: Date) => void;
}

export const DatePickerItem = React.memo(({ date, setDate }: DatePickerItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Input type="outlined" placeholder="Due Date" icon onPressIn={() => setOpen(true)} value={date.toDateString()} />
      <DatePicker
        modal
        open={open}
        date={date}
        minimumDate={new Date()}
        mode="date"
        onConfirm={d => {
          setOpen(false);
          setDate(d);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
});
