import { LogList, LogEntry, PaneTitle } from '@/sterling-ui';
import { Icon } from '@chakra-ui/react';
import { useSterlingSelector } from '../../../state/hooks';
import { selectLogItems } from '../../../state/store';
import { MdNotes } from 'react-icons/md';

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
    <div className='flex items-center px-2 space-x-1'>
      <Icon as={MdNotes} />
      <PaneTitle>Log</PaneTitle>
    </div>
  );
};

export { LogDrawer, LogDrawerHeader };
