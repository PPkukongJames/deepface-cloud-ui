
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerValueProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void; // C
}

export default function DatePickerValue({ value, onChange }: DatePickerValueProps) {
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['DatePicker', 'DatePicker']}> */}
        {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
        <DatePicker
          label="Controlled picker"
          value={value}
          onChange={onChange}
        />
      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
}
