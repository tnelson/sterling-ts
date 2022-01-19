import { DatumParsed } from '@/sterling-connection';
import { AddProjectionButton } from './AddProjectionButton';
import { ProjectionList } from './ProjectionList';

interface ProjectionsSectionProps {
  datum: DatumParsed<any>;
}

const ProjectionSection = (props: ProjectionsSectionProps) => {
  const { datum } = props;

  return (
    <div className='flex flex-col justify-middle'>
      <ProjectionList datum={datum} />
      <AddProjectionButton datum={datum} />
    </div>
  );
};

export { ProjectionSection };
