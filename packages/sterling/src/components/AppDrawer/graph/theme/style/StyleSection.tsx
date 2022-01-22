import { DatumParsed, isDatumAlloy } from '@/sterling-connection';
import {
  useSterlingDispatch,
  useSterlingSelector
} from '../../../../../state/hooks';
import {
  selectGraphDrawerThemeRelationExpanded,
  selectGraphDrawerThemeTypeExpanded
} from '../../../../../state/selectors';
import {
  graphDrawerThemeRelationToggled,
  graphDrawerThemeTypeToggled
} from '../../../../../state/ui/uiSlice';
import { alloyRelationTree } from './alloyRelationTree';
import { alloyTypeTree } from './alloyTypeTree';
import { RelationStylePanel } from './RelationStylePanel';
import { StylesTree } from './tree/StylesTree';
import { DatumNode } from './tree/types';
import { TypeStylePanel } from './TypeStylePanel';

const StyleSection = ({ datum }: { datum: DatumParsed<any> }) => {
  const isAlloy = isDatumAlloy(datum);
  const typeTree = isAlloy ? alloyTypeTree(datum.parsed) : null;
  const relationTree = isAlloy ? alloyRelationTree(datum.parsed) : null;
  const dispatch = useSterlingDispatch();

  const typeIsOpen = (node: DatumNode): boolean => {
    return useSterlingSelector((state) =>
      selectGraphDrawerThemeTypeExpanded(state, datum.id, node.id)
    );
  };

  const relationIsOpen = (node: DatumNode): boolean => {
    return useSterlingSelector((state) =>
      selectGraphDrawerThemeRelationExpanded(state, datum.id, node.id)
    );
  };

  const onTypeToggle = (node: DatumNode) => {
    dispatch(
      graphDrawerThemeTypeToggled({
        type: node.id,
        datumId: datum.id
      })
    );
  };

  const onRelationToggle = (node: DatumNode) => {
    dispatch(
      graphDrawerThemeRelationToggled({
        relation: node.id,
        datumId: datum.id
      })
    );
  };

  return (
    <div className='flex flex-col justify-middle'>
      {typeTree && (
        <StylesTree
          datum={datum}
          tree={typeTree}
          panel={TypeStylePanel}
          isOpen={typeIsOpen}
          onToggle={onTypeToggle}
        />
      )}
      {relationTree && (
        <StylesTree
          datum={datum}
          tree={relationTree}
          panel={RelationStylePanel}
          isOpen={relationIsOpen}
          onToggle={onRelationToggle}
        />
      )}
    </div>
  );
};

export { StyleSection };
