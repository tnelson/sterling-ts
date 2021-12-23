import { Box, useStyleConfig } from '@chakra-ui/react';
import { clamp, throttle } from 'lodash';
import {
  Children,
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import sizes from '../../sizes';
import { HANDLE_PAD } from './constants';
import { DragHandle } from './DragHandle';

interface DashboardProps {
  leftPaneCollapsed: boolean;
  leftPaneInitialWidth: number;
  leftPaneMinWidth: number;
  leftPaneMaxWidth: number;
  rightPaneCollapsed: boolean;
  rightPaneInitialWidth: number;
  rightPaneMinWidth: number;
  rightPaneMaxWidth: number;
}

const Dashboard = (props: PropsWithChildren<DashboardProps>) => {
  const {
    children,
    leftPaneCollapsed,
    leftPaneInitialWidth,
    leftPaneMinWidth,
    leftPaneMaxWidth,
    rightPaneCollapsed,
    rightPaneInitialWidth,
    rightPaneMinWidth,
    rightPaneMaxWidth
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const styles = useStyleConfig('Dashboard');

  const [leftClickOffset, setLeftClickOffset] = useState<number>(0);
  const [leftDragging, setLeftDragging] = useState<boolean>(false);
  const [leftWidth, setLeftWidth] = useState<number>(leftPaneInitialWidth);
  const [rightClickOffset, setRightClickOffset] = useState<number>(0);
  const [rightDragging, setRightDragging] = useState<boolean>(false);
  const [rightWidth, setRightWidth] = useState<number>(rightPaneInitialWidth);

  const leftL = useMemo(
    () => (leftPaneCollapsed ? -leftWidth : 0),
    [leftPaneCollapsed, leftWidth]
  );
  const middleL = useMemo(
    () => (leftPaneCollapsed ? 0 : leftWidth),
    [leftPaneCollapsed, leftWidth]
  );
  const middleR = useMemo(
    () => (rightPaneCollapsed ? 0 : rightWidth),
    [rightPaneCollapsed, rightWidth]
  );
  const rightR = useMemo(
    () => (rightPaneCollapsed ? -rightWidth : 0),
    [rightPaneCollapsed, rightWidth]
  );

  const leftStyle = useMemo<CSSProperties>(
    () => style(leftWidth, leftL, undefined, leftDragging),
    [leftWidth, leftL, leftDragging]
  );
  const middleStyle = useMemo<CSSProperties>(
    () => style(undefined, middleL, middleR, leftDragging || rightDragging),
    [middleL, middleR, leftDragging, rightDragging]
  );
  const rightStyle = useMemo<CSSProperties>(
    () => style(rightWidth, undefined, rightR, rightDragging),
    [rightWidth, rightR, rightDragging]
  );
  const leftHandleStyle = useMemo<CSSProperties>(
    () => style(undefined, leftL + leftWidth, undefined, leftDragging),
    [leftL, leftWidth, leftDragging]
  );
  const rightHandleStyle = useMemo<CSSProperties>(
    () => style(undefined, undefined, rightR + rightWidth, rightDragging),
    [rightR, rightWidth, rightDragging]
  );

  const onMouseDown = useCallback(
    (side, event) => {
      const rect = event.target.getBoundingClientRect();
      const offset = event.clientX - rect.left;
      switch (side) {
        case 'left':
          setLeftClickOffset(offset);
          setLeftDragging(true);
          break;
        case 'right':
          setRightClickOffset(offset);
          setRightDragging(true);
          break;
      }
    },
    [setLeftDragging, setRightDragging]
  );

  const onMouseMove = useCallback(
    throttle((event) => {
      if (leftDragging) {
        window.getSelection()?.empty();
        const w = event.clientX - leftClickOffset + HANDLE_PAD;
        setLeftWidth(clamp(w, leftPaneMinWidth, leftPaneMaxWidth));
      }
      if (rightDragging) {
        const current = ref.current;
        if (current) {
          window.getSelection()?.empty();
          const bbox = current.getBoundingClientRect();
          const w = bbox.width - event.clientX + rightClickOffset - HANDLE_PAD;
          setRightWidth(clamp(w, rightPaneMinWidth, rightPaneMaxWidth));
        }
      }
    }, 16),
    [
      leftClickOffset,
      rightClickOffset,
      leftDragging,
      rightDragging,
      leftPaneMinWidth,
      rightPaneMinWidth,
      leftPaneMaxWidth,
      rightPaneMaxWidth
    ]
  );

  const onMouseUp = useCallback(() => {
    setLeftDragging(false);
    setRightDragging(false);
  }, [setLeftDragging, setRightDragging]);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const definedChildren = Children.toArray(children).filter((c) => c);

  return definedChildren.length === 3 ? (
    <Box ref={ref} __css={styles}>
      <div style={leftStyle}>{definedChildren[0]}</div>
      <div style={middleStyle}>{definedChildren[1]}</div>
      <div style={rightStyle}>{definedChildren[2]}</div>
      <div
        style={leftHandleStyle}
        onMouseDown={(event) => onMouseDown('left', event)}
      >
        <DragHandle />
      </div>
      <div
        style={rightHandleStyle}
        onMouseDown={(event) => onMouseDown('right', event)}
      >
        <DragHandle />
      </div>
    </Box>
  ) : null;
};

const DashboardTheme = {
  baseStyle: {
    position: 'fixed',
    top: `${sizes.navBarSize}px`,
    right: `${sizes.sideBarSize}px`,
    bottom: `${sizes.statusBarSize}px`,
    left: '0'
  }
};

function style(
  width?: number,
  left?: number,
  right?: number,
  noTransitions?: boolean
): CSSProperties {
  const style: CSSProperties = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    transition: noTransitions
      ? undefined
      : 'all 200ms cubic-bezier(0.85, 0, 0.15, 1)'
  };
  if (width !== undefined) style.width = `${width}px`;
  if (left !== undefined) style.left = `${left}px`;
  if (right !== undefined) style.right = `${right}px`;
  return style;
}

export { Dashboard, DashboardTheme };
