import {
  AlloyRelation,
  AlloyType,
  getInstanceAtoms,
  getInstanceRelations,
  getInstanceType,
  getInstanceTypes,
  getTypeAtoms,
  isAlloyDatum,
  isAlloyDatumTrace
} from '@/alloy-instance';
import { Projection } from '@/sterling-theme';
import { PaneTitle } from '@/sterling-ui';
import { Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { FaFilm } from 'react-icons/fa';
import {
  nextStateProjClicked,
  prevStateProjClicked,
  stateProjectionAdded
} from '../../../../state/data/dataSlice';
import {
  useSterlingDispatch,
  useSterlingSelector
} from '../../../../statenew/hooks';
import {
  selectActiveDatum,
  selectActiveTheme
} from '../../../../statenew/selectors';
import { AddTimeProjectionButton } from './AddTimeProjectionButton';
import { AddTimeProjectionMenu } from './AddTimeProjectionMenu';

const TimeProjectionsList = (props: {
  projections: Projection[] | undefined;
}) => {
  const { projections } = props;
  if (!projections) return null;
  return (
    <div className='flex flex-col'>
      {projections.map((projection) => {
        return (
          <div key={projection.type} className='flex'>
            <div>{projection.type}</div>
            <div>{projection.atom || ''}</div>
          </div>
        );
      })}
    </div>
  );
};

const GraphStateDrawer = () => {
  const activeDatum = useSterlingSelector(selectActiveDatum);
  const activeTheme = useSterlingSelector(selectActiveTheme);
  const [addingTimeProjection, setAddingTimeProjection] = useState(false);

  return (
    <div className='absolute inset-0 flex flex-col'>
      {activeTheme && (
        <TimeProjectionsList projections={activeTheme.projections} />
      )}
      {activeDatum && activeTheme && !addingTimeProjection && (
        <AddTimeProjectionButton
          onClick={() => setAddingTimeProjection(true)}
        />
      )}
      {activeDatum && activeTheme && addingTimeProjection && (
        <AddTimeProjectionMenu
          datum={activeDatum}
          theme={activeTheme}
          onSubmit={() => setAddingTimeProjection(false)}
        />
      )}
    </div>
  );
  // const activeDatum = useSterlingSelector(selectActiveDatum);
  // const stateProjections = useSterlingSelector(
  //   selectActiveDatumStateProjections
  // );
  // const dispatch = useSterlingDispatch();
  // const [addingTimeProjection, setAddingTimeProjection] = useState(false);
  //
  // /**
  //  * Check that there's a single datum selected and that the selected
  //  * datum is an Alloy instance (but not a trace)
  //  */
  // if (!activeDatum) return null;
  // const id = activeDatum.id;
  // const datum = activeDatum.parsed;
  // if (!isAlloyDatum(datum)) return null;
  // if (isAlloyDatumTrace(datum)) return null;
  //
  // /**
  //  * Get the instance, the signatures, and the fields
  //  */
  // const instance = datum.instances[0];
  // const sigs = getInstanceTypes(instance);
  // const flds = getInstanceRelations(instance);
  //
  // return (
  //   <div className='absolute inset-0 flex flex-col'>
  //     {Object.entries(stateProjections).map(([type, atom], index) => {
  //       return (
  //         <div key={index} className='flex prose prose-sm'>
  //           <div className='text-sm px-1'>{type}</div>
  //           <div className='text-sm px-1'>{atom}</div>
  //           <div
  //             className='text-sm border rounded'
  //             onClick={() => {
  //               dispatch(
  //                 prevStateProjClicked({
  //                   datumId: id,
  //                   type
  //                 })
  //               );
  //             }}
  //           >
  //             Previous
  //           </div>
  //           <div
  //             className='text-sm border rounded'
  //             onClick={() => {
  //               dispatch(
  //                 nextStateProjClicked({
  //                   datumId: id,
  //                   type
  //                 })
  //               );
  //             }}
  //           >
  //             Next
  //           </div>
  //         </div>
  //       );
  //     })}
  //     {!addingTimeProjection && (
  //       <AddTimeProjectionButton
  //         onClick={() => setAddingTimeProjection(true)}
  //       />
  //     )}
  //     {addingTimeProjection && (
  //       <AddTimeProjectionMenu
  //         types={sigs}
  //         relations={flds}
  //         onSubmit={(type: AlloyType, relation: AlloyRelation) => {
  //           const atoms = getTypeAtoms(type);
  //           console.log(atoms, atoms[0]);
  //           setAddingTimeProjection(false);
  //           dispatch(
  //             stateProjectionAdded({
  //               datumId: id,
  //               type: type.id,
  //               atom: atoms[0].id,
  //               instance
  //             })
  //           );
  //         }}
  //       />
  //     )}
  //   </div>
  // );
};

const GraphStateDrawerHeader = () => {
  return (
    <div className='flex items-center px-2 space-x-2'>
      <Icon as={FaFilm} />
      <PaneTitle>Time</PaneTitle>
    </div>
  );
};

export { GraphStateDrawer, GraphStateDrawerHeader };
