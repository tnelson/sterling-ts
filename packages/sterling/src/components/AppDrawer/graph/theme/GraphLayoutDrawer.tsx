import { PaneTitle } from '@/sterling-ui';
import { Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { Icon } from '@chakra-ui/react';
import { RiHammerFill } from 'react-icons/ri';
import { useSterlingSelector } from '../../../../state/hooks';
import { selectActiveDatum } from '../../../../state/selectors';

const GraphLayoutDrawer = () => {
  const datum = useSterlingSelector(selectActiveDatum);

  const [cndSpecText, setCndSpecText] = useState<string>("");

  if (!datum) return null;

  const openInCnd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Create a form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'http://localhost:3000';
    form.target = '_blank';

    // Create input elements for the form data
    const cndSpecTextInput = document.createElement('input');
    cndSpecTextInput.type = 'hidden';
    cndSpecTextInput.name = 'cope';
    cndSpecTextInput.value = cndSpecText;
    form.appendChild(cndSpecTextInput);

    const alloyDatumInput = document.createElement('input');
    alloyDatumInput.type = 'hidden';
    alloyDatumInput.name = 'alloydatum';
    alloyDatumInput.value = datum.data;
    form.appendChild(alloyDatumInput);

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();

    // Remove the form from the document
    document.body.removeChild(form);
  };

  return (
    <div className='absolute inset-0 flex flex-col overflow-y-auto p-4'>
      <FormControl>
        <FormLabel>CnD Layout Specification</FormLabel>
        <Textarea
          minH="20rem"
          value={cndSpecText}
          onChange={e => setCndSpecText(e.target.value)}
        />
      </FormControl>
      <Button onClick={openInCnd} colorScheme='blue' mt={4}>
        Load in CnD
      </Button>
    </div>
  );
};

export default GraphLayoutDrawer;

const GraphLayoutDrawerHeader = () => {
  return (
    <div className='w-full flex items-center px-2 space-x-2'>
      <Icon as={RiHammerFill} />
      <PaneTitle>Layout</PaneTitle>
    </div>
  );
};

export { GraphLayoutDrawer, GraphLayoutDrawerHeader };
