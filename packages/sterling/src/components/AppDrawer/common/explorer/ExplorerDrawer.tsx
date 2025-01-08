import { PaneTitle } from '@/sterling-ui';
import { Box, Divider, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaFilm } from 'react-icons/fa';
import { useSterlingSelector } from '../../../../state/hooks';
import { selectActiveDatum, selectData, selectProviderGeneratorNames,  } from '../../../../state/selectors';
import { ListViewData } from './ListView/ListViewData';
import { ListViewGenerators } from './ListView/ListViewGenerators';

const ExplorerDrawer = () => {
  // The datum contains its generator ID, if any
  const activeDatum = useSterlingSelector(selectActiveDatum);
  const data = useSterlingSelector(selectData);
  const generatorNames = useSterlingSelector(selectProviderGeneratorNames);

  // There are two expected cases here:
  //   (1) We have an active datum (and thus a generator name, if the provider uses generators);
  //   (2) We have no active datum (and thus should give the user a menu of commands).
  // In the event we have neither an active datum /or/ a list of generator names, don't show the tab.

  if (!activeDatum && (!generatorNames || generatorNames.length < 1)) return null;
  
  return (
    <>
      
      <Box p={1} shadow='md' borderWidth='1px'>
        <Heading fontSize='l' align='center'>Available Commands</Heading>
      </Box>

      <div aria-label='explorer pane run selector' className='flex flex-col'>
        <ListViewGenerators generators={generatorNames ?? []} activeDatum={activeDatum} />
      </div>

      <Box p={1} shadow='md' borderWidth='1px'>
        <Heading fontSize='l' align='center'>Instance History</Heading>
      </Box>
      
      <hr/>
      {/* Used to have: inset-0  */}
      <div aria-label='explorer pane instance selector' className='absolute flex flex-col overflow-y-auto'>
          <ListViewData data={data} active={activeDatum} />
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
/*const TestDatumBox = ({
    active,
    onClick
  }: {
    active: boolean;
    onClick: () => void;
  }) => {
    return (
      <Box
        position='relative'
        flex='0 1 auto'
        mx={2}
        my={1}
        border='1px'
        borderColor={active ? 'blue.400' : 'gray.200'}
        borderRadius='0'
        onClick={onClick}
        _first={{ mt: 2 }}
        _hover={{
          borderColor: 'gray.400',
          cursor: 'pointer',
          shadow: 'base'
        }}
        _active={{
          borderColor: 'gray.300',
          shadow: 'sm'
        }}
      >
        <GraphPreview />
        <Box
          position='absolute'
          bottom='0'
          right='0'
          left='0'
          display='flex'
          justifyContent='flex-end'
          bg={active ? 'blue.100' : 'gray.50'}
          opacity={0.95}
          px={2}
          py={1}
        >
          <Icon as={FaFilm} />
        </Box>
      </Box>
    );
  };*/

export { ExplorerDrawer, ExplorerDrawerHeader };