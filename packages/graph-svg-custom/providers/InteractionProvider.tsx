import { createContext, ReactNode, useContext } from 'react';

export interface InteractionContext {
  onClickNode: (nodeId: string) => void;
}

const interactionContext = createContext<InteractionContext>(
  defaultInteractionContext()
);

const useInteractions = () => {
  return useContext(interactionContext);
};

const useInteractionState = (
  onClickNode?: (nodeId: string) => void
): InteractionContext => {
  const handleClickNode = (nodeId: string) => {
    if (onClickNode) onClickNode(nodeId);
  };
  return {
    onClickNode: handleClickNode
  };
};

const InteractionProvider = ({
  children,
  onClickNode
}: {
  children?: ReactNode;
  onClickNode?: (nodeId: string) => void;
}) => {
  const interactionState = useInteractionState(onClickNode);
  return (
    <interactionContext.Provider value={interactionState}>
      {children}
    </interactionContext.Provider>
  );
};

function defaultInteractionContext(): InteractionContext {
  return {
    onClickNode: () => {}
  };
}

export { InteractionProvider, useInteractions };
