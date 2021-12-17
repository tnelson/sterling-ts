import { LogList, LogEntry } from '@/sterling-ui';
import { useSterlingSelector } from '../../../state/hooks';
import { selectLogItems } from '../../../state/store';

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

export { LogDrawer };
