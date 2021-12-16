import { DragHandle } from '@/sterling-ui';
import { BoxProps } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

interface SplitPaneProps {
  initialWidth: number;
  isCollapsed: boolean;
  leftComponent: FC<BoxProps>;
  leftPad: number;
  rightComponent: FC<BoxProps>;
}

const SplitPane = (props: SplitPaneProps) => {
  const { initialWidth, isCollapsed, leftComponent, leftPad, rightComponent } =
    props;

  const [active, setActive] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(initialWidth);

  const leftLeft = useMemo(
    () => (isCollapsed ? leftPad - width : leftPad),
    [isCollapsed, leftPad, width]
  );
  const rightLeft = useMemo(() => leftLeft + width, [leftLeft, width]);

  const onMouseDown = useCallback(() => {
    window.getSelection()?.empty();
    setActive(true);
  }, [setActive]);
  const onMouseMove = useCallback(
    (event) => {
      if (active) setWidth(event.clientX - leftPad);
    },
    [active, leftPad, setWidth]
  );
  const onMouseUp = useCallback(() => {
    setActive(false);
  }, [setActive]);

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseUp, onMouseMove]);

  const Left = leftComponent;
  const Right = rightComponent;

  return (
    <>
      <Left width={`${width}px`} left={`${leftLeft}px`}>
        <DragHandle onMouseDown={onMouseDown} />
      </Left>
      <Right left={`${rightLeft}px`} transition={active ? 'none' : undefined} />
    </>
  );
};

export { SplitPane };
