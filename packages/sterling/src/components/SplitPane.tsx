import { DragHandle } from '@/sterling-ui';
import { BoxProps } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { throttle } from 'lodash';

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
  const [offset, setOffset] = useState<number>(0);
  const [width, setWidth] = useState<number>(initialWidth);

  const leftLeft = useMemo(
    () => (isCollapsed ? leftPad - width : leftPad),
    [isCollapsed, leftPad, width]
  );
  const rightLeft = useMemo(() => leftLeft + width, [leftLeft, width]);

  const onMouseDown = useCallback(
    (event) => {
      window.getSelection()?.empty();
      const rect = event.target.getBoundingClientRect();
      setOffset(event.clientX - rect.left);
      setActive(true);
    },
    [setActive]
  );
  const onMouseMove = useCallback(
    throttle((event) => {
      if (active) {
        window.getSelection()?.empty();
        setWidth(event.clientX - leftPad + (8 - offset));
      }
    }, 10),
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
