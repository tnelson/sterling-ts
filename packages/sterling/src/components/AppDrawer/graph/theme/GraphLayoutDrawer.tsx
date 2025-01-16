import { PaneTitle } from '@/sterling-ui';
import { Button, FormControl, FormLabel, Icon, Textarea, VisuallyHidden, VisuallyHiddenInput } from '@chakra-ui/react';
import { useState } from 'react';
import { RiHammerFill, RiPaletteLine } from 'react-icons/ri';
import { useSterlingSelector } from '../../../../state/hooks';
import { selectActiveDatum } from '../../../../state/selectors';
import { ProjectionSection } from './projection/ProjectionSection';
import { StyleSection } from './style/StyleSection';
import { ThemeFileSection } from './ThemeFileSection';

const GraphLayoutDrawer = () => {
  const datum = useSterlingSelector(selectActiveDatum);

  const [cndSpectext, setCndSpecText] = useState<string>("")

  if (!datum) return null;
  return (
    <div className='absolute inset-0 flex flex-col overflow-y-auto'>
      <form action='does.not.exist.com'>
        <FormControl>
            <VisuallyHidden>{datum.data}</VisuallyHidden>
        </FormControl>
        <FormControl>
            <FormLabel>CnD Layout Specification</FormLabel>
            <Textarea minH="20rem"
                      value={cndSpectext}
                      onChange={e => setCndSpecText(e.target.value)}/>
        </FormControl>
        <button type='submit'>Load in CnD</button>
      </form>
    </div>
  );
};

const GraphLayoutDrawerHeader = () => {
  return (
    <div className='w-full flex items-center px-2 space-x-2'>
      <Icon as={RiHammerFill} />
      <PaneTitle>Layout</PaneTitle>
    </div>
  );
};

export { GraphLayoutDrawer, GraphLayoutDrawerHeader };
