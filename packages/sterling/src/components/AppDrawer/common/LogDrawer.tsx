import { LogList, LogEntry, PaneTitle } from '@/sterling-ui';
import { Icon } from '@chakra-ui/react';
import { GoNote } from 'react-icons/go';
import { useSterlingSelector } from '../../../statenew/hooks';
import { selectLogItems } from '../../../statenew/selectors';

const LogDrawer = () => {
  const items = useSterlingSelector(selectLogItems);
  return (
    <LogList h='full' px={2} py={1} overflowY='auto'>
      {items.map((item, index) => {
        return (
          <LogEntry
            key={index}
            text={item.text}
            time={new Date(item.time)}
            variant={item.type}
          />
        );
      })}
    </LogList>
  );
};

const LogDrawerHeader = () => {
  return (
    <div className='flex items-center px-2 space-x-2'>
      <Icon className='mt-0.5' as={GoNote} />
      <PaneTitle>Log</PaneTitle>
    </div>
  );
};

export { LogDrawer, LogDrawerHeader };
