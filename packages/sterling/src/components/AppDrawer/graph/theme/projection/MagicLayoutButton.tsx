import { DatumParsed } from '@/sterling-connection';
import {
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { keys } from 'lodash-es';
import { useCallback, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import {
  useSterlingDispatch,
  useSterlingSelector
} from '../../../../../state/hooks';
import { selectTheme } from '../../../../../state/selectors';
import {
  EdgeStyleSpec,
  getRelationIsAttribute,
  getRelationSTIndexes,
  NodeStyleSpec,
  SterlingTheme
} from '@/sterling-theme';
import { getInstanceRelations } from '@/alloy-instance';
import { edgeStyleSet } from 'sterling/src/state/graphs/graphsSlice';

// Using a color-blind safe high-contrast color scheme, although that means a limited set of colors
// https://personal.sron.nl/~pault/#sec:qualitative
// Specifically, using Figure 4, "MUTED qualitative color scheme"
// HT https://github.com/AlloyTools/org.alloytools.alloy/issues/234
const cssColorNames: string[] = [
  '#332288',
  '#88CCEE',
  '#44AA99',
  '#117733',
  '#999933',
  '#DDCC77',
  '#CC6677',
  '#882255',
  '#AA4499'
]

interface MagicLayoutButtonProps {
  datum: DatumParsed<any>;
}

const MagicLayoutButton = (props: MagicLayoutButtonProps) => {
  const { datum } = props;  
  const dispatch = useSterlingDispatch();
  const theme: SterlingTheme = useSterlingSelector((state) =>
         selectTheme(state, datum));
  const instance = datum.parsed.instances[0];
  
  // colors available for use in auto-theming
  const [colorsLeft, setColorsLeft] = useState<string[]>(cssColorNames)  
  const onClick =  
    () => {          

      // For each sig, update its shape. Copy the state into a temporary list
      

      // For each edge relation, update its color. Copy the state into a temporary list
      const colorsLeftTemp = colorsLeft.slice()      
      getInstanceRelations(instance).forEach(relation => { 
        const colorName = colorsLeftTemp.length > 0 ? colorsLeftTemp[0] : 'black'
        if(colorsLeftTemp.length > 0) colorsLeftTemp.splice(0, 1)
        console.log(`Setting color for ${relation.name} to ${colorName}. ${colorsLeftTemp.length} colors remaining in high-contrast list.`)
        dispatch(
          edgeStyleSet({
            datum: datum,            
            relation: relation.id,
            style: 'stroke',
            value: colorName
          }))
      });
      setColorsLeft(colorsLeftTemp)      
    }

  return (
    <Center my={2}>
      <Menu>
        <MenuButton
          onClick={() => onClick()}
          as={Button}
          colorScheme='blue'
          size='xs'
          leftIcon={<IoMdAddCircleOutline />}
        >
          Auto Theme
        </MenuButton>        
      </Menu>
    </Center>
  );
};

export { MagicLayoutButton };
