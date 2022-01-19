import { DatumParsed } from '@/sterling-connection';
import { useSterlingSelector } from '../../../../../state/hooks';
import {
  selectProjectableTypes,
  selectProjections
} from '../../../../../state/selectors';
import { ProjectionListItem } from './ProjectionListItem';

const ProjectionList = ({ datum }: { datum: DatumParsed<any> }) => {
  // Get Record<string, string[]> mapping type names to atom names
  const projectable = useSterlingSelector((state) =>
    selectProjectableTypes(state, datum.id)
  );

  // Get the existing projections and ignore the time ones
  const projections = useSterlingSelector((state) =>
    selectProjections(state, datum.id)
  );
  const projs = projections.filter((proj) => proj.time !== true);

  // Render nothing if there are no projections
  if (projs.length === 0) return null;

  return (
    <div className='p-2 grid grid-cols-[minmax(min-content,max-content)_minmax(max-content,auto)_minmax(min-content,max-content)] gap-y-2'>
      {projs.map((projection) => {
        const type = projection.type;
        const atoms = projectable[type];
        return (
          <ProjectionListItem
            datum={datum}
            projection={projection}
            atoms={atoms}
          />
        );
      })}
    </div>
  );
};

export { ProjectionList };
