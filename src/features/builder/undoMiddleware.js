import { loadSavedDesignData } from './builderSlice';

const TRACKED_ACTIONS = new Set([
  'builder/updateMeshStates',
  'builder/updateMeshProp',
  'builder/addDecal',
  'builder/updateDecal',
  'builder/removeDecal',
  'builder/setGlobalPattern',
  'builder/setMaterialFinish',
  'builder/setLightingPreset',
  'builder/setRoster',
  'builder/loadSavedDesignData',
]);

const MAX_HISTORY = 50;
const DEBOUNCE_MS = 300;

let past = [];
let future = [];
let isUndoRedoing = false;
let debounceTimer = null;
let pendingSnapshot = null;
let listeners = new Set();

function takeSnapshot(builderState) {
  return JSON.parse(JSON.stringify({
    meshStates: builderState.meshStates,
    decals: builderState.decals,
    globalPattern: builderState.globalPattern,
    materialFinish: builderState.materialFinish,
    lightingPreset: builderState.lightingPreset,
    roster: builderState.roster,
  }));
}

function notify() {
  listeners.forEach(fn => fn());
}

export const undoMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type === 'builder/setSelectedDesign') {
    past = [];
    future = [];
    pendingSnapshot = null;
    clearTimeout(debounceTimer);
    notify();
    return next(action);
  }

  if (isUndoRedoing || !TRACKED_ACTIONS.has(action.type)) {
    return next(action);
  }

  const currentState = storeAPI.getState().builder;

  if (!pendingSnapshot) {
    pendingSnapshot = takeSnapshot(currentState);
  }

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    if (pendingSnapshot) {
      past.push(pendingSnapshot);
      if (past.length > MAX_HISTORY) past.shift();
      future = [];
      pendingSnapshot = null;
      notify();
    }
  }, DEBOUNCE_MS);

  return next(action);
};

export function undo(dispatch, getState) {
  if (past.length === 0) return;

  clearTimeout(debounceTimer);
  if (pendingSnapshot) {
    past.push(pendingSnapshot);
    pendingSnapshot = null;
  }

  const snapshot = past.pop();
  const currentState = getState().builder;
  future.push(takeSnapshot(currentState));

  isUndoRedoing = true;
  dispatch(loadSavedDesignData(snapshot));
  isUndoRedoing = false;
  notify();
}

export function redo(dispatch, getState) {
  if (future.length === 0) return;

  clearTimeout(debounceTimer);
  pendingSnapshot = null;

  const snapshot = future.pop();
  const currentState = getState().builder;
  past.push(takeSnapshot(currentState));

  isUndoRedoing = true;
  dispatch(loadSavedDesignData(snapshot));
  isUndoRedoing = false;
  notify();
}

export function canUndo() {
  return past.length > 0 || pendingSnapshot !== null;
}

export function canRedo() {
  return future.length > 0;
}

export function subscribeUndoRedo(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
