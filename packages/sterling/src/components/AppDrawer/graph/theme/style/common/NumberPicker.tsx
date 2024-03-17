import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { CloseButton } from './CloseButton';
import { InheritedLabel } from './InheritedLabel';

interface NumberPickerProps {
  label: string;
  value: number | '';
  inherited: boolean;
  onChange: (value: number | undefined) => void;
  onRemove: () => void;
}

const NumberPicker = (props: NumberPickerProps) => {
  const { label, value, inherited, onChange, onRemove } = props;
  return (
    <div className='px-3 py-1 first:mt-2 last:mb-2 flex items-center hover:bg-slate-100'>
      <div className='grow text-sm'>{label}</div>
      {inherited && <InheritedLabel />}
      {!inherited && <CloseButton onClick={onRemove} />}
      <NumberInput 
        size='sm' 
        className='w-20 text-xs' 
        min={0}
        max={100}
        value={value}
        onChange={(event) => {
          onChange(+event);
        }}>
        <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
      </NumberInput>
      {/* <input
        className='w-16 text-xs h-6'
        type='number'
        min='0'
        max='100'
        value={value}
        onChange={(event) => {
          onChange(+event.target.value);
        }}
      /> */}
    </div>
  );
};

export { NumberPicker };
