import { Button, buttonClicked } from '@/sterling-connection';
import { PaneHeaderButton, PaneTitle } from '@/sterling-ui';
import { useSterlingDispatch } from '../../state/hooks';
import { ActiveGraphData } from '../../state/store';

interface GraphViewHeaderProps {
  graphData: ActiveGraphData;
}

const GraphViewHeader = (props: GraphViewHeaderProps) => {
  const { graphData } = props;
  const { datumId, datum } = graphData;
  const { buttons } = datum;
  const dispatch = useSterlingDispatch();

  return (
    <div className='w-full flex item-center space-x-2 px-2'>
      <PaneTitle>Datum ID: {datumId}</PaneTitle>
      <div className='grow' />
      {buttons &&
        buttons.map((button: Button, index: number) => {
          return (
            <PaneHeaderButton
              key={index}
              onClick={() => {
                dispatch(
                  buttonClicked({
                    id: datumId,
                    onClick: button.onClick
                  })
                );
              }}
            >
              {button.text}
            </PaneHeaderButton>
          );
        })}
    </div>
  );
};

export { GraphViewHeader };
