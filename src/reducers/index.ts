import { combineReducers } from "redux";
import * as Interfaces from "../interfaces";
import { ACTION } from "../actions/action";
import { collectionReducer } from "./book";
import { IBookCollection } from "../interfaces/book";

/*
  export interface IEntityState<T> {
    [K: string]: T;
    [K: number]: T;
  }

  export function entityReducer<T>(entityType: string) {

    return (state: IEntityState<T> = {}, action: IAction<any>) => {

      // Cache entities
      if (action.entities && action.entities[entityType]) {
        const entities = action.entities[entityType];
        const newState = { ...state };

        for (const id in entities) {

          if (entities[id] === null && newState[id]) {

            delete newState[id];

          } else {

            if (state[id])
              newState[id] = Object.assign({}, state[id], entities[id]);
            else
              newState[id] = entities[id];

          }

        }

        return newState;

      }

      return state;

    };

  }
 */

 export interface IStore {
  books: IBookCollection;
}

export default combineReducers<IStore>({
  books: collectionReducer<Interfaces.Book.IBook>(ACTION.BOOK_LIST_FETCH, null)
});
