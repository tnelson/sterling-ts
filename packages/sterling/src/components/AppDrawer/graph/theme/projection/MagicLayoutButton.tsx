import { DatumParsed } from '@/sterling-connection';
import {
  Button,
  Center,
  Menu,
  MenuButton
} from '@chakra-ui/react';
import { keys } from 'lodash-es';
import { useCallback, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
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
import {
  useSterlingDispatch,
  useSterlingSelector
} from '../../../../../state/hooks';
import { renameSet } from '../../../../../state/graphs/graphsSlice';
import { BooleanPicker } from '../style/common/BooleanPicker';

// Using a color-blind safe high-contrast color scheme, although that means a limited set of colors
// https://personal.sron.nl/~pault/#sec:qualitative
// HT https://github.com/AlloyTools/org.alloytools.alloy/issues/234

// "MUTED qualitative color scheme"
const cssColorNames_muted: string[] = [
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

const cssColorNames_bright: string[] = [
  '#4477AA', // blue
  '#66CCEE', // cyan
  '#228833', // green
  '#CCBB44', // yellow
  '#EE6677', // red 
  '#AA3377', // purple
  '#BBBBBB', // grey
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
  
  const onRenameChange = (rename: boolean) => {
    dispatch(
      renameSet({
        datum: datum,
        rename: rename
      })
    );
  };  

  // colors available for use in auto-theming
  const [colorsLeft, setColorsLeft] = useState<string[]>(cssColorNames_bright)  
  const onClick =  
    () => {          

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

      // Do not reset the available-colors array, because reloading etc. should 
      // use colors consistently, rather than running out.
      //setColorsLeft(colorsLeftTemp)    
      
      // "magic layout" renames atoms according to most-specific sigs
      onRenameChange(true)  
    }

  return (
    // Note: "use original" means _not_ renaming, hence the negation
    <Center my={2}>
      <BooleanPicker
        label='Use original atom names'
        value={theme.rename !== undefined ? !theme.rename : false}
        onChange={(b) => onRenameChange(!b)}
      />

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
