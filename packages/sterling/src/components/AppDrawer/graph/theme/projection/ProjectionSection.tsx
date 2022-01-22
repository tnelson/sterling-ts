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
      <div className='prose prose-md font-bold mx-2 my-2 border-b'>
        Projections
      </div>
      <ProjectionList datum={datum} />
      <AddProjectionButton datum={datum} />
    </div>
  );
};

export { ProjectionSection };
