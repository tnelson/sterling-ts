import { PaneTitle } from '@/sterling-ui';
import { Icon } from '@chakra-ui/react';
import { FaFilm } from 'react-icons/fa';
import { useSterlingSelector } from '../../../../state/hooks';
import { selectActiveDatum } from '../../../../state/selectors';
import { TimeProjectionSection } from './projections/TimeProjectionSection';
import { TimeSection } from './time/TimeSection';

const GraphStateDrawer = () => {
  const activeDatum = useSterlingSelector(selectActiveDatum);

  if (!activeDatum) return null;
  return (
    <div className='absolute inset-0 flex flex-col overflow-y-auto'>
      <TimeProjectionSection datum={activeDatum} />
      <TimeSection datum={activeDatum} />
    </div>
  );
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
