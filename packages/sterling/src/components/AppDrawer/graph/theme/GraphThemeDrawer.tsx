import { PaneTitle } from '@/sterling-ui';
import { Icon } from '@chakra-ui/react';
import { RiPaletteLine } from 'react-icons/ri';
import { useSterlingSelector } from '../../../../state/hooks';
import { selectActiveDatum } from '../../../../state/selectors';
import { ProjectionSection } from './projection/ProjectionSection';
import { StyleSection } from './style/StyleSection';
import { ThemeFileSection } from './ThemeFileSection';
import { MagicLayoutButton } from './projection/MagicLayoutButton';

const GraphThemeDrawer = () => {
  const datum = useSterlingSelector(selectActiveDatum); 

  if (!datum) return null;
  return (
    <div className='absolute inset-0 flex flex-col overflow-y-auto'>
      <ThemeFileSection datum={datum} />
      <ProjectionSection datum={datum} />
      <StyleSection datum={datum} />
      <MagicLayoutButton datum={datum} />
    </div>
  );
};

const GraphThemeDrawerHeader = () => {
  return (
    <div className='w-full flex items-center px-2 space-x-2'>
      <Icon as={RiPaletteLine} />
      <PaneTitle>Theme</PaneTitle>
    </div>
  );
};

export { GraphThemeDrawer, GraphThemeDrawerHeader };
