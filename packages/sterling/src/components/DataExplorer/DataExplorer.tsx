import { Pane, PaneHeader, PaneTitle } from '@/sterling-ui';
import { Box, Icon } from '@chakra-ui/react';
import { FaFilm } from 'react-icons/fa';
import { useSterlingDispatch, useSterlingSelector } from '../../state/hooks';
import { selectActiveById, selectData } from '../../state/store';
import { GraphPreview } from '../GraphPreview/GraphPreview';
import { ListView } from './ListView/ListView';

const TestDatumBox = ({
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
};

const DataExplorer = () => {
  const dispatch = useSterlingDispatch();
  const activeById = useSterlingSelector(selectActiveById);
  const data = useSterlingSelector(selectData).slice().reverse();
  return (
    <Pane>
      <PaneHeader>
        <PaneTitle>Explorer</PaneTitle>
      </PaneHeader>
      <Box
        position='absolute'
        top='30px'
        right='0'
        bottom='0'
        left='0'
        display='flex'
        flexDir='column'
        overflowX='hidden'
        overflowY='auto'
      >
        <ListView data={data} activeById={activeById} />
        {/*{data.map((datum, index) => {*/}
        {/*  const id = datum.id;*/}
        {/*  const isActive = activeById[id];*/}
        {/*  return (*/}
        {/*    <TestDatumBox*/}
        {/*      key={index}*/}
        {/*      active={isActive}*/}
        {/*      onClick={() => {*/}
        {/*        dispatch(dataSelected([id]));*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  );*/}
        {/*})}*/}
      </Box>
    </Pane>
  );
};

export { DataExplorer };
