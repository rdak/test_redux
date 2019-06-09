import { IAction, ACTION_STATUS, ACTION } from "../actions/action";
import { IBook, IBookCollection } from "../interfaces/book";

function bookReducer(state: IBookCollection, action: IAction<any>) {

  switch (action.type) {

    case ACTION.BOOK_VOTE: {
      if (action.status === ACTION_STATUS.SUCCESS && state.items) {
        return {
          ...state,
          items: state.items.map((item: IBook) => {

            if (item.id === action.data.id)
              return Object.assign({}, item, action.data);
            else
              return item;

          })
        };
      } else {
        return state;
      }

    }
  }

  return state;

}

export function collectionReducer<T>(
  actionType: string,
  defaultState?,
) {

  return (state = defaultState, action) => {

    if (bookReducer)
      state = bookReducer(state, action);

    if (action.type !== actionType) {
      return state;
    }

    switch (action.status) {

      case ACTION_STATUS.REQUEST:
        return {
          ...state,
          _fetching: true,
        };

      case ACTION_STATUS.SUCCESS:
        return {
          ...state,
          _fetching: false,
          items: action.data,
        };

      case ACTION_STATUS.FAILURE:

        return {
          ...state,
          _fetching: false,
          _error: action.error
        };

    }

    return state;

  };

}

