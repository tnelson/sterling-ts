import { Checkbox } from '@chakra-ui/react';

interface BooleanPickerProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const BooleanPicker = (props: BooleanPickerProps) => {
  const { label, value, onChange } = props;
  return (
    <div className='px-3 py-1 first:mt-2 last:mb-2 flex justify-end items-center hover:bg-slate-100'>
      <div className='grow text-sm'>{label}</div>
      <Checkbox
        isChecked={value}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
      />
    </div>
  );
};

export { BooleanPicker };
