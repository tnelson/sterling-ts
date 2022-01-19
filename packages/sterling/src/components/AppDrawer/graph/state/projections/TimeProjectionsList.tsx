import { DatumParsed } from '@/sterling-connection';
import { keys } from 'lodash';
import { useSterlingSelector } from '../../../../../state/hooks';
import {
  selectActiveDatum,
  selectActiveTheme,
  selectAvailableProjectableTypes,
  selectProjectableTypes,
  selectProjections,
  selectRelations,
  selectTheme
} from '../../../../../state/selectors';
import { TimeProjectionsListItem } from './TimeProjectionsListItem';

interface TimeProjectionsListProps {
  datum: DatumParsed<any>;
}

const TimeProjectionsList = (props: TimeProjectionsListProps) => {
  const { datum } = props;

  // Get Record<string, string[]> mapping type names to atom names
  const projectable = useSterlingSelector((state) =>
    selectProjectableTypes(state, datum.id)
  );

  // Get the existing projections and extract the time ones
  const projections = useSterlingSelector((state) =>
    selectProjections(state, datum.id)
  );
  const time = projections.filter((proj) => proj.time === true);

  // Get the names of all relations that could be used to define an ordering
  const relations = useSterlingSelector((state) =>
    selectRelations(state, datum.id)
  );

  return (
    <div className='p-2 grid grid-cols-[minmax(min-content,max-content)_minmax(max-content,auto)_minmax(min-content,max-content)]'>
      {time.map((projection) => {
        const type = projection.type;
        const atoms = projectable[type];
        return (
          <TimeProjectionsListItem
            datum={datum}
            projection={projection}
            atoms={atoms}
            relations={relations}
          />
        );
      })}
    </div>
  );
};

export { TimeProjectionsList };
