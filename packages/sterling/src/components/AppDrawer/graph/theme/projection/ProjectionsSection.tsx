import { DatumParsed } from '@/sterling-connection';
import { keys } from 'lodash';
import { useSterlingSelector } from '../../../../../state/hooks';
import {
  selectAvailableProjectableTypes,
  selectProjections
} from '../../../../../state/selectors';
import { AddProjectionButton } from './AddProjectionButton';

interface ProjectionsSectionProps {
  datum: DatumParsed<any>;
}

const ProjectionsSection = (props: ProjectionsSectionProps) => {
  const { datum } = props;
  const projections = useSterlingSelector((state) =>
    selectProjections(state, datum.id)
  );
  const availableTypes = useSterlingSelector((state) =>
    selectAvailableProjectableTypes(state, datum.id)
  );

  const typeNames = keys(availableTypes);

  return (
    <div>
      {typeNames.length > 0 && (
        <AddProjectionButton
          types={typeNames}
          onSelectType={(type: string) => {
            console.log(type);
          }}
        />
      )}
    </div>
  );
};

export { ProjectionsSection };
