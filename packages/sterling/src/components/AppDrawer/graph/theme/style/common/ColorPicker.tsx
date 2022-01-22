import { CloseButton } from './CloseButton';
import { InheritedLabel } from './InheritedLabel';

interface ColorPickerProps {
  label: string;
  value: string;
  inherited: boolean;
  onChange: (value: string | undefined) => void;
  onRemove: () => void;
}

const ColorPicker = (props: ColorPickerProps) => {
  const { label, value, inherited, onChange, onRemove } = props;
  return (
    <div className='px-3 py-1 first:mt-2 last:mb-2 flex items-center hover:bg-slate-100'>
      <div className='grow text-sm'>{label}</div>
      {inherited && <InheritedLabel />}
      {!inherited && <CloseButton onClick={onRemove} />}
      <input
        className='cursor-pointer'
        type='color'
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </div>
  );
};

export { ColorPicker };
