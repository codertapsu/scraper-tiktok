import { useState } from 'react';

const useUndoRedo = <S,>(
  initialState: S,
): {
  state: S;
  undo: () => void;
  redo: () => void;
  updatePresent: (newState: S) => void;
} => {
  const [innerState, setInnerState] = useState({
    past: new Array<S>(),
    present: initialState,
    future: new Array<S>(),
  });

  const undo = () => {
    if (innerState.past.length === 0) {
      return;
    }
    const newPast = [...innerState.past];
    const newPresent = newPast.pop();
    setInnerState({
      past: newPast,
      future: [innerState.present, ...innerState.future],
      present: newPresent!,
    });
  };

  const redo = () => {
    if (innerState.future.length === 0) {
      return;
    }
    const newFuture = [...innerState.future];
    const newPresent = newFuture.shift();
    setInnerState({
      past: [...innerState.past, innerState.present],
      future: newFuture,
      present: newPresent!,
    });
  };

  const updatePresent = (newState: S) => {
    setInnerState({
      past: [...innerState.past, innerState.present],
      future: [],
      present: newState,
    });
  };

  return { state: innerState.present, undo, redo, updatePresent };
};

export { useUndoRedo };
