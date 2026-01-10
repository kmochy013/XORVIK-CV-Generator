import { useState, useCallback } from 'react';

interface HistoryState<T> {
  state: T;
  set: (newVal: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clearHistory: () => void;
}

export function useHistoryState<T>(initialState: T): HistoryState<T> {
  const [state, setState] = useState<T>(initialState);
  const [past, setPast] = useState<T[]>([]);
  const [future, setFuture] = useState<T[]>([]);

  const set = useCallback((newVal: T) => {
    setPast((prevPast) => [...prevPast, state]);
    setState(newVal);
    setFuture([]);
  }, [state]);

  const undo = useCallback(() => {
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setFuture((prevFuture) => [state, ...prevFuture]);
    setState(previous);
    setPast(newPast);
  }, [state, past]);

  const redo = useCallback(() => {
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast((prevPast) => [...prevPast, state]);
    setState(next);
    setFuture(newFuture);
  }, [state, future]);

  const clearHistory = useCallback(() => {
    setPast([]);
    setFuture([]);
  }, []);

  return {
    state,
    set,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    clearHistory
  };
}