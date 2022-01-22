import { ShapeDef } from '@/graph-svg';
import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { CloseButton } from './CloseButton';
import { InheritedLabel } from './InheritedLabel';
import { NumberPicker } from './NumberPicker';

interface ShapePickerProps {
  label: string;
  value: ShapeDef;
  inherited: boolean;
  onChange: (value: ShapeDef) => void;
  onRemove: () => void;
}

const ShapePicker = (props: ShapePickerProps) => {
  const { label, value, inherited, onChange, onRemove } = props;

  const isCircle = value.shape === 'circle';
  const isRect = value.shape === 'rectangle';
  const dimension = isCircle
    ? 2 * value.radius
    : Math.min(value.width, value.height) / 2;

  const onDimensionChange = (dimension: string, val: number | undefined) => {
    if (val === undefined) return;
    switch (value.shape) {
      case 'rectangle':
        onChange({
          shape: 'rectangle',
          width: dimension === 'width' ? val : value.width,
          height: dimension === 'height' ? val : value.height
        });
        break;
      case 'circle':
        onChange({
          shape: 'circle',
          radius: val
        });
    }
  };

  const onShapeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const targetShape = event.target.value;
    switch (targetShape) {
      case 'rectangle':
        onChange({
          shape: 'rectangle',
          width: (5 / 3) * dimension,
          height: dimension
        });
        break;
      case 'circle':
        onChange({
          shape: 'circle',
          radius: dimension
        });
        break;
    }
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
          value={value.shape}
          onChange={onShapeChange}
        >
          <option value='circle'>Circle</option>
          <option value='rectangle'>Rectangle</option>
        </Select>
      </div>
      {isCircle && (
        <NumberPicker
          label='Radius'
          value={value.radius}
          inherited={inherited}
          onChange={(value) => onDimensionChange('radius', value)}
          onRemove={onRemove}
        />
      )}
      {isRect && (
        <>
          <NumberPicker
            label='Width'
            value={value.width}
            inherited={inherited}
            onChange={(value) => onDimensionChange('width', value)}
            onRemove={onRemove}
          />
          <NumberPicker
            label='Height'
            value={value.height}
            inherited={inherited}
            onChange={(value) => onDimensionChange('height', value)}
            onRemove={onRemove}
          />
        </>
      )}
    </>
  );
};

export { ShapePicker };
