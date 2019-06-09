import { ACTION_STATUS } from "../actions/action";

export function collectionReducer<T>(
  actionType: string,
  defaultState?,
) {

  return (state = defaultState, action) => {

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
