import { CurveDef } from '@/graph-svg';
import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { CloseButton } from './CloseButton';
import { InheritedLabel } from './InheritedLabel';

interface CurvePickerProps {
  label: string;
  value: CurveDef;
  inherited: boolean;
  onChange: (value: CurveDef) => void;
  onRemove: () => void;
}

const CurvePicker = (props: CurvePickerProps) => {
  const { label, value, inherited, onChange, onRemove } = props;

  const onCurveChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value as CurveDef['type'];
    onChange({ type });
  };

  return (
    <>
      <div className='px-3 py-1 first:mt-2 last:mb-2 flex items-center hover:bg-slate-100'>
        <div className='grow text-sm'>{label}</div>
        {inherited && <InheritedLabel />}
        {!inherited && <CloseButton onClick={onRemove} />}
        <Select
          maxWidth={28}
          size='xs'
          value={value.type}
          onChange={onCurveChange}
        >
          <option value='bspline'>B-Spline</option>
          <option value='bundle'>Bundle</option>
          <option value='cardinal'>Cardinal</option>
          <option value='catmullrom'>Catmull-Rom</option>
          <option value='line'>Line</option>
          <option value='monotonex'>Monotone X</option>
          <option value='monotoney'>Monotone Y</option>
          <option value='natural'>Natural</option>
          <option value='step'>Step</option>
          <option value='stepafter'>Step After</option>
          <option value='stepbefore'>Step Before</option>
        </Select>
      </div>
    </>
  );
};

export { CurvePicker };
