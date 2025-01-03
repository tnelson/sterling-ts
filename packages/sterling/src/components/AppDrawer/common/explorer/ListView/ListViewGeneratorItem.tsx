import { DatumParsed } from '@/sterling-connection';
import { Icon } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { FaFilm } from 'react-icons/fa';
import { GoTerminal } from 'react-icons/go';
import { GiFilmProjector } from 'react-icons/gi';
import { useSterlingSelector } from '../../../../../state/hooks';
import { Row, RowItem } from './Row';

interface ListViewGeneratorItemProps {
  generatorName: string;
  isActive: boolean;
  onClickItem: (event: MouseEvent, generatorName: string) => void;
}

const ListViewGeneratorItem = (props: ListViewGeneratorItemProps) => {
  const { generatorName, isActive, onClickItem } = props;
  const cn = isActive ? 'text-white bg-blue-600' : '';

  return (
    <Row onClick={(event) => onClickItem(event, generatorName)}>
      <RowItem className={cn}>{generatorName}</RowItem>
    </Row>
  );
};

export { ListViewGeneratorItem };
