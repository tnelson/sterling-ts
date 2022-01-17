import { HTMLAttributes } from 'react';

const AddTimeProjectionButton = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className='m-2 p-1 prose prose-sm hover:text-slate-400 active:text-slate-800 cursor-pointer border rounded grid place-content-center'
      {...props}
    >
      Add Time Projection
    </div>
  );
};

export { AddTimeProjectionButton };
