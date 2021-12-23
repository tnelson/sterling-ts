import { createContext, ReactNode, useContext, useState } from 'react';
import { identity, Matrix } from 'transformation-matrix';

export interface InteractionContext {
  spreadMatrix: Matrix;
}

const interactionContext = createContext<InteractionContext>(
  defaultInteractionContext()
);

const useInteractions = () => {
  return useContext(interactionContext);
};

const useInteractionState = (
  initialSpreadMatrix?: Matrix
): InteractionContext => {
  const [spreadMatrix, setSpreadMatrix] = useState<Matrix>(
    initialSpreadMatrix || identity()
  );
  return {
    spreadMatrix
  };
};

const InteractionProvider = ({
  children,
  spread
}: {
  children?: ReactNode;
  spread?: Matrix;
}) => {
  const interactionState = useInteractionState(spread);
  return (
    <interactionContext.Provider value={interactionState}>
      {children}
    </interactionContext.Provider>
  );
};

function defaultInteractionContext(): InteractionContext {
  return {
    spreadMatrix: identity()
  };
}

export { InteractionProvider, useInteractions };
