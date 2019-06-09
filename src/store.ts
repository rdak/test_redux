import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers/index";

let initStore = {
  books: {}
};

/**
 * Create default app redux store
 */
export function createAppStore() {

  const store = createStore(
    // Reducers
    reducers,

    initStore,

    // Middlewares
    applyMiddleware(
      reduxThunk
    )
  );
      console.log(store);
  return store;

}
