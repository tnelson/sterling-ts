import { buttonClicked, DatumParsed } from '@/sterling-connection';
import { useCallback, MouseEvent } from 'react';
import { DatumControls } from 'sterling/src/components/DatumControls/DatumControls';
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
      if(activeDatum !== undefined) {
        dispatch(buttonClicked({id: activeDatum.id, 
                                onClick: "next", 
                                context: {generatorName: generatorName}}));
      }      
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
