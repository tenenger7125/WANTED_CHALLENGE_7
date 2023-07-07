type InitialStateType<T> = T;

export type ActionType<T extends string = string> = {
  type: T;
  [index: string]: any;
};

type ReducerType<T> = (state: InitialStateType<T>, action: ActionType) => InitialStateType<T>;

type SubScribeType = () => void;

export function createStore<T>(reducer: ReducerType<T>, initialState: InitialStateType<T>) {
  let state = initialState;
  let subscribe: SubScribeType;

  return {
    subscribe(callback: SubScribeType) {
      subscribe = callback;
    },
    dispatch(action: ActionType) {
      state = reducer(state, action);
      if (subscribe) subscribe();
    },
    getState() {
      return state;
    },
  };
}
