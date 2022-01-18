import {
  AlloyAtom,
  AlloyInstance,
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
import { DatumParsed, isDatumAlloy } from '@/sterling-connection';
import { Projection, SterlingTheme } from '@/sterling-theme';
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
import { themeChanged } from '../../../../statenew/theme/themeSlice';
import { AddTimeProjectionButton } from './AddTimeProjectionButton';
import { AddTimeProjectionMenu } from './AddTimeProjectionMenu';

const ProjectionRow = (props: {
  datum: DatumParsed<any>;
  theme: SterlingTheme;
  projection: Projection;
  atoms: AlloyAtom[];
}) => {
  const { datum, theme, projection, atoms } = props;
  const { type, atom } = projection;
  const dispatch = useSterlingDispatch();
  const index = atoms.findIndex((a) => a.id === atom);

  const onPrev = () => {
    if (index > 0) {
      const prev = atoms[index - 1];
      const projections = theme.projections || [];
      const oldIndex = projections.findIndex((proj) => proj.type === type);
      const newprojections = projections.slice();
      newprojections[oldIndex] = { type, atom: prev.id, time: true };
      if (oldIndex > -1) {
        dispatch(
          themeChanged({
            datum,
            theme: {
              ...theme,
              projections: newprojections
            }
          })
        );
      }
    }
  };

  const onNext = () => {
    if (index < atoms.length - 1) {
      const next = atoms[index + 1];
      const projections = theme.projections || [];
      const oldIndex = projections.findIndex((proj) => proj.type === type);
      const newprojections = projections.slice();
      newprojections[oldIndex] = { type, atom: next.id, time: true };
      if (oldIndex > -1) {
        dispatch(
          themeChanged({
            datum,
            theme: {
              ...theme,
              projections: newprojections
            }
          })
        );
      }
    }
  };

  return (
    <div className='flex text-sm'>
      <div className='first: pl-2 px-1 py-0.5'>{type}</div>
      <div
        className='first: pl-2 px-1 py-0.5 cursor-pointer'
        onClick={onPrev}
      >{`<`}</div>
      <div className='first: pl-2 px-1 py-0.5'>{atom || ''}</div>
      <div
        className='first: pl-2 px-1 py-0.5 cursor-pointer'
        onClick={onNext}
      >{`>`}</div>
    </div>
  );
};

const TimeProjectionsList = (props: {
  datum: DatumParsed<any>;
  theme: SterlingTheme;
  projections: Projection[] | undefined;
  instance: AlloyInstance;
}) => {
  const { datum, theme, projections, instance } = props;
  if (!projections) return null;
  return (
    <div className='flex flex-col'>
      {projections.map((projection) => {
        const atoms = getTypeAtoms(getInstanceType(instance, projection.type));
        return (
          <ProjectionRow
            key={projection.type}
            datum={datum}
            theme={theme}
            projection={projection}
            atoms={atoms}
          />
        );
      })}
    </div>
  );
};

const GraphStateDrawer = () => {
  const activeDatum = useSterlingSelector(selectActiveDatum);
  const activeTheme = useSterlingSelector(selectActiveTheme);
  const [addingTimeProjection, setAddingTimeProjection] = useState(false);

  const instance =
    activeDatum && isDatumAlloy(activeDatum)
      ? activeDatum.parsed.instances[0]
      : undefined;

  return (
    <div className='absolute inset-0 flex flex-col'>
      {activeDatum && activeTheme && instance && (
        <TimeProjectionsList
          datum={activeDatum}
          theme={activeTheme}
          projections={activeTheme.projections}
          instance={instance}
        />
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
