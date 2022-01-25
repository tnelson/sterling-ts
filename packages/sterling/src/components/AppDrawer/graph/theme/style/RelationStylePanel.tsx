import { CurveDef } from '@/graph-svg';
import {
  asAttributeSet,
  curveRemoved,
  curveSet,
  edgeLabelStyleRemoved,
  edgeLabelStyleSet,
  edgeStyleRemoved,
  edgeStyleSet
} from '../../../../../state/graphs/graphsSlice';
import {
  useSterlingDispatch,
  useSterlingSelector
} from '../../../../../state/hooks';
import { selectRelationStyle } from '../../../../../state/selectors';
import { BooleanPicker } from './common/BooleanPicker';
import { ColorPicker } from './common/ColorPicker';
import { CurvePicker } from './common/CurvePicker';
import { NumberPicker } from './common/NumberPicker';
import { TextPicker } from './common/TextPicker';
import { StylesTreePanel } from './tree/types';

const RelationStylePanel = (props: StylesTreePanel) => {
  const { datum, id } = props;
  const dispatch = useSterlingDispatch();
  const style = useSterlingSelector((state) =>
    selectRelationStyle(state, datum, id)
  );
  const { asAttribute, curve, stroke, strokeWidth, fontSize, textColor } =
    style;

  const onAsAttributeChange = (selected: boolean) => {
    dispatch(
      asAttributeSet({
        datum,
        relation: id,
        asAttribute: selected
      })
    );
  };

  const onCurveChange = (curve: CurveDef) => {
    dispatch(
      curveSet({
        datum,
        relation: id,
        curve
      })
    );
  };

  const onCurveRemove = () => {
    dispatch(
      curveRemoved({
        datum,
        relation: id
      })
    );
  };

  const onLabelStyleChange = (style: string, value: any) => {
    dispatch(
      edgeLabelStyleSet({
        datum,
        relation: id,
        style,
        value
      })
    );
  };

  const onLabelStyleRemove = (style: string) => {
    dispatch(
      edgeLabelStyleRemoved({
        datum,
        relation: id,
        style
      })
    );
  };

  const onStyleChange = (style: string, value: any) => {
    dispatch(
      edgeStyleSet({
        datum,
        relation: id,
        style,
        value
      })
    );
  };

  const onStyleRemove = (style: string) => {
    dispatch(
      edgeStyleRemoved({
        datum,
        relation: id,
        style
      })
    );
  };

  return (
    <div className='flex flex-col'>
      {curve && (
        <CurvePicker
          label='Curve'
          value={curve.value}
          inherited={curve.inherited}
          onChange={onCurveChange}
          onRemove={onCurveRemove}
        />
      )}
      {asAttribute !== undefined && (
        <BooleanPicker
          label='Display as attribute'
          value={asAttribute}
          onChange={onAsAttributeChange}
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

export { RelationStylePanel };
