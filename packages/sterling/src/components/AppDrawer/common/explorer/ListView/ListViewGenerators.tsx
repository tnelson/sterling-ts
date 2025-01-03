import { buttonClicked, DatumParsed } from '@/sterling-connection';
import { useCallback, MouseEvent } from 'react';
import { useSterlingDispatch } from '../../../../../state/hooks';
import { ListViewGeneratorItem } from './ListViewGeneratorItem';

interface ListViewGeneratorsProps {
  generators: string[];
  activeDatum: DatumParsed<any> | undefined;
}

const ListViewGenerators = (props: ListViewGeneratorsProps) => {
  const { generators, activeDatum } = props;
  const dispatch = useSterlingDispatch();

  const onClickRow = useCallback(
    (event: MouseEvent, generatorName: string) => {
      console.log(`Starting the query for ${generatorName}`)
      // TODO Problem: how can we _programmatically_ ask for a new instance?
      // We'd like to click the next button with the "context" field populated 
      // with the target generator name (among other things, perhaps). 
      // Do we just click "a button" with "next" as the button name?
      dispatch(buttonClicked(generatorName));
      
      
    },
    []
  );

  return (
    <div className='w-full grid grid-cols-[1]'>
      {generators.map((name,idx) => {
        return ( 
          <ListViewGeneratorItem
            key={idx}
            generatorName={name}
            onClickItem={onClickRow}
            isActive={activeDatum?.generatorName === name}
          />
        );
      })}
    </div>
  );
};

export { ListViewGenerators };
