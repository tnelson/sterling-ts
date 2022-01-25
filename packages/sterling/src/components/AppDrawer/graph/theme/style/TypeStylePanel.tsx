import { ShapeDef } from '@/graph-svg';
import {
  nodeLabelStyleRemoved,
  nodeLabelStyleSet,
  shapeRemoved,
  shapeSet,
  shapeStyleRemoved,
  shapeStyleSet
} from '../../../../../state/graphs/graphsSlice';
import {
  useSterlingDispatch,
  useSterlingSelector
} from '../../../../../state/hooks';
import { selectTypeStyle } from '../../../../../state/selectors';
import { ColorPicker } from './common/ColorPicker';
import { NumberPicker } from './common/NumberPicker';
import { ShapePicker } from './common/ShapePicker';
import { TextPicker } from './common/TextPicker';
import { StylesTreePanel } from './tree/types';

const TypeStylePanel = (props: StylesTreePanel) => {
  const { datum, id } = props;
  const dispatch = useSterlingDispatch();
  const style = useSterlingSelector((state) =>
    selectTypeStyle(state, datum, id)
  );
  const { shape, stroke, strokeWidth, fill, fontSize, textColor } = style;

  const onLabelStyleChange = (style: string, value: any) => {
    dispatch(
      nodeLabelStyleSet({
        datum,
        type: id,
        style,
        value
      })
    );
  };

  const onLabelStyleRemove = (style: string) => {
    dispatch(
      nodeLabelStyleRemoved({
        datum,
        type: id,
        style
      })
    );
  };

  const onShapeChange = (shape: ShapeDef) => {
    dispatch(
      shapeSet({
        datum,
        type: id,
        shape
      })
    );
  };

  const onShapeRemove = () => {
    dispatch(shapeRemoved({ datum, type: id }));
  };

  const onStyleChange = (style: string, value: any) => {
    dispatch(
      shapeStyleSet({
        datum,
        type: id,
        style,
        value
      })
    );
  };

  const onStyleRemove = (style: string) => {
    dispatch(
      shapeStyleRemoved({
        datum,
        type: id,
        style
      })
    );
  };

  return (
    <div className='flex flex-col'>
      {shape && (
        <ShapePicker
          label='Shape'
          value={shape.value}
          inherited={shape.inherited}
          onChange={onShapeChange}
          onRemove={onShapeRemove}
        />
      )}
      {fill && (
        <ColorPicker
          label='Fill'
          value={fill.value}
          inherited={fill.inherited}
          onChange={(value) => onStyleChange('fill', value)}
          onRemove={() => onStyleRemove('fill')}
        />
      )}
      {stroke && (
        <ColorPicker
          label='Stroke'
          value={stroke.value}
          inherited={stroke.inherited}
          onChange={(value) => onStyleChange('stroke', value)}
          onRemove={() => onStyleRemove('stroke')}
        />
      )}
      {strokeWidth && (
        <NumberPicker
          label='Stroke Width'
          value={strokeWidth.value}
          inherited={strokeWidth.inherited}
          onChange={(value) => onStyleChange('strokeWidth', value)}
          onRemove={() => onStyleRemove('strokeWidth')}
        />
      )}
      {fontSize && (
        <TextPicker
          label='Font Size'
          value={fontSize.value}
          inherited={fontSize.inherited}
          onChange={(value) => onLabelStyleChange('fontSize', value)}
          onRemove={() => onLabelStyleRemove('fontSize')}
        />
      )}
      {textColor && (
        <ColorPicker
          label='Text Color'
          value={textColor.value}
          inherited={textColor.inherited}
          onChange={(value) => onLabelStyleChange('fill', value)}
          onRemove={() => onLabelStyleRemove('fill')}
        />
      )}
    </div>
  );
};

export { TypeStylePanel };
