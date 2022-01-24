import { CSSProperties } from 'react';
import { TableData } from '../../state/table/table';

interface TableProps {
  data: TableData;
}

const Table = (props: TableProps) => {
  const { data } = props;
  const nrows = data.data.length;
  const ncols = nrows > 0 ? data.data[0].length : 0;

  const style: CSSProperties = {
    gridTemplateColumns: `repeat(${ncols}, minmax(0, 1fr))`
  };

  return (
    <div className='flex flex-col border shadow m-2'>
      <div className='prose prose-sm font-semibold px-2 py-1 border-b'>
        {data.title}
      </div>
      <div
        className='prose text-xs font-mono grid gap-px bg-slate-100'
        style={style}
      >
        {data.headers &&
          data.headers.map((header, index) => {
            return (
              <div
                key={`header-${index}`}
                className='font-semibold px-2 py-0.5'
              >
                {header}
              </div>
            );
          })}
        {data.data.map((row, rowIndex) => {
          return row.map((val, colIndex) => {
            return (
              <div
                className='px-2 py-0.5 bg-white'
                key={`${rowIndex}${colIndex}`}
              >
                {val}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export { Table };
