import { isAlloyDatum, isAlloyDatumTrace } from '@/alloy-instance';
import { MouseEvent } from 'react';
import { DatumParsed } from '@/sterling-connection';
import { Icon } from '@chakra-ui/react';
import { FaFilm } from 'react-icons/fa';
import { GoTerminal } from 'react-icons/go';
import { Row, RowItem } from './Row';

interface ListViewItemProps {
  datum: DatumParsed<any>;
  active: boolean;
  onClickItem: (event: MouseEvent, datum: DatumParsed<any>) => void;
}

const ListViewItem = (props: ListViewItemProps) => {
  const { datum, active, onClickItem } = props;
  const cn = active ? 'text-white bg-blue-600' : '';

  return (
    <Row onClick={(event) => onClickItem(event, datum)}>
      <RowItem className={cn}>Datum ID: {datum.id}</RowItem>
      <RowItem className={cn}>
        {datum.evaluator && <Icon as={GoTerminal} />}
      </RowItem>
      <RowItem className={cn}>
        {isAlloyDatum(datum.parsed) && isAlloyDatumTrace(datum.parsed) && (
          <Icon as={FaFilm} />
        )}
      </RowItem>
    </Row>
  );
};

export { ListViewItem };
