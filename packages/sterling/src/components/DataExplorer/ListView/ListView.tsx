import { DatumParsed } from '@/sterling-connection';
import { useCallback, MouseEvent } from 'react';
import { datumSelected, datumToggled } from '../../../state/data/dataSlice';
import { useSterlingDispatch } from '../../../state/hooks';
import { ListViewItem } from './ListViewItem';

interface ListViewProps {
  data: DatumParsed<any>[];
  activeById: Record<string, boolean>;
}

const ListView = (props: ListViewProps) => {
  const { data, activeById } = props;
  const dispatch = useSterlingDispatch();

  const onClickRow = useCallback(
    (event: MouseEvent, datum: DatumParsed<any>) => {
      if (event.shiftKey) {
        dispatch(datumToggled(datum.id));
      } else {
        dispatch(datumSelected(datum.id));
      }
    },
    []
  );

  return (
    <div className='w-full grid grid-cols-[minmax(max-content,auto)_repeat(2,min-content)]'>
      {data.map((datum) => {
        const { id } = datum;
        return (
          <ListViewItem
            key={id}
            datum={datum}
            active={activeById[id]}
            onClickItem={onClickRow}
          />
        );
      })}
    </div>
  );
};

export { ListView };
