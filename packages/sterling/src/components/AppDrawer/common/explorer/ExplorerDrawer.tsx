import { buttonClicked, DatumParsed } from '@/sterling-connection';
import { PaneTitle } from '@/sterling-ui';
import { Box, Button, Divider, Flex, Heading, Icon, Select, Spacer, Stack, Text, Tooltip } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { FaFilm } from 'react-icons/fa';
import { useSterlingSelector } from '../../../../state/hooks';
import { selectActiveDatum, selectData, selectProviderGeneratorNames,  } from '../../../../state/selectors';
import { ListViewData } from './ListView/ListViewData';
import { useSterlingDispatch } from '../../../../state/hooks';
import { activeDatumSet } from 'sterling/src/state/data/dataSlice';

const ExplorerDrawer = () => {
  // The datum contains its generator ID, if any
  const activeDatum = useSterlingSelector(selectActiveDatum);
  const data = useSterlingSelector(selectData);
  const generatorNames = useSterlingSelector(selectProviderGeneratorNames);
  const dispatch = useSterlingDispatch();
  const [generator, setGenerator] = useState<string|undefined>(generatorNames ? generatorNames[0]: undefined);

  // There are two expected cases here:
  //   (1) We have an active datum (and thus a generator name, if the provider uses generators);
  //   (2) We have no active datum (and thus should give the user a menu of commands).
  // In the event we have neither an active datum /or/ a list of generator names, don't show the tab.

  if (!activeDatum && (!generatorNames || generatorNames.length < 1)) return null;
  
  // The generator is *new* if we have yet to fetch any instances from it. 
  const generatorIsNew = 
    !data.some(d => d.generatorName == generator)

  // When clicking a generator name, it should request an instance if we have no
  // data for that generator yet. Otherwise, it should just change the active datum. 
  const onClickRun = useCallback(
    () => {
      if(generator !== undefined && generatorIsNew) {
        console.log(`Running new generator: ${generator}`)
        dispatch(buttonClicked({id: activeDatum?.id, 
                                onClick: "next", 
                                context: {generatorName: generator}}))}},
    [generator, data]
  );

  return (
    <>
      
      <Box p={1} shadow='md' borderWidth='1px'>
        <Heading fontSize='l' align='center'>Select an Available Command</Heading>
        <Flex>
          <Select isDisabled={!generatorNames || generatorNames.length < 1} 
                  onChange={ev => {
                    console.log(`Selecting generator: ${ev.target.value}`); 
                    const latestForGenerator = data.filter(d => d.generatorName == generator).reverse()[0]
                    if(latestForGenerator) dispatch(activeDatumSet(latestForGenerator.id));
                    setGenerator(ev.target.value)}}>
            {generatorNames?.map((name,idx) => <option key={idx}>{name}</option>)}
          </Select>
          
          <Button size='sm' 
                  margin='1'
                  onClick={onClickRun} 
                  isDisabled={!generatorNames || 
                               generatorNames.length < 1 || 
                               activeDatum?.generatorName === generator || 
                               !generatorIsNew}>
            <Tooltip hasArrow label={'Re-run Forge to refresh this command.'} 
                     isDisabled={generatorIsNew}>Run</Tooltip>
          </Button>
        </Flex>
      </Box>

      <Box p={1} shadow='md' borderWidth='1px'>
        <Heading fontSize='l' align='center'>Instance History for <i>{generator}</i></Heading>
      </Box>
      
      <hr/>
      {/* Used to have: inset-0  */}
      <div aria-label='explorer pane instance selector' className='absolute flex flex-col overflow-y-auto'>
          <ListViewData data={data.filter(d => d.generatorName == generator)} active={activeDatum}/>
      </div>
    </>
  );
};

const ExplorerDrawerHeader = () => {
  return (
    <div className='flex items-center px-2 space-x-2'>
      <Icon as={FaFilm} />
      <PaneTitle>Explorer</PaneTitle>
    </div>
  );
};

export { ExplorerDrawer, ExplorerDrawerHeader };