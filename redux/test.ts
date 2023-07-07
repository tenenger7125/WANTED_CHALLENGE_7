import { ActionType, createStore } from "./createStore";

function todos(state: string[] = [], action: ActionType) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.text];
    default:
      return state;
  }
}

const store = createStore<string[]>(todos, ["Use Redux"]);

console.log(store.getState());

store.subscribe(() => {
  console.log("subscribe");
});

store.dispatch({
  type: "ADD_TODO",
  text: "Read the docs",
});

console.log(store.getState());
