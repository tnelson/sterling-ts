import { PaneTitle } from '@/sterling-ui';
import { Icon } from '@chakra-ui/react';
import { FaFilm } from 'react-icons/fa';
import { useSterlingSelector } from '../../../state/hooks';
import { selectActiveDatum } from '../../../state/selectors';
import { TimeSection } from '../graph/state/time/TimeSection';

const TableStateDrawer = () => {
  const datum = useSterlingSelector(selectActiveDatum);

  if (!datum) return null;
  return (
    <div className='absolute inset-0 flex flex-col overflow-y-auto'>
      <TimeSection datum={datum} />
    </div>
  );
};

const TableStateDrawerHeader = () => {
  return (
    <div className='flex items-center px-2 space-x-2'>
      <Icon as={FaFilm} />
      <PaneTitle>Time</PaneTitle>
    </div>
  );
};

export { TableStateDrawer, TableStateDrawerHeader };
