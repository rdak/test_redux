// Api
import { BookApi } from "../api";

// Intefaces
import { IAction, ACTION, ACTION_STATUS } from "./action";
import * as Interfaces from "../interfaces";

/**
 * Fetch organization list
 */
export function doFetchBookList() {

  return (dispatch) => {

    dispatch({
      type: ACTION.BOOK_LIST_FETCH,
      status: ACTION_STATUS.REQUEST,
    });

    return BookApi.getBookCollection().then(
      (res) => {

        console.log(res);

        dispatch({
          type: ACTION.BOOK_LIST_FETCH,
          status: ACTION_STATUS.SUCCESS,
          data: res.body
        });

      },
      (err) => {

        dispatch({
          type: ACTION.BOOK_LIST_FETCH,
          status: ACTION_STATUS.FAILURE,
          error: err,
        });

        return err;
      }
    );
  };
}

/**
 * Save org details
 *
 * @param orgId Org ID
 * @param data Project details data
 */
export function doUpdateBook(orgId: number, data: Interfaces.Book.IBookDetails) {

  return (dispatch) => {

    dispatch({
      type: ACTION.BOOK_VOTE,
      status: ACTION_STATUS.REQUEST
    });

    return BookApi.updateBook(orgId).then((res) => {

      dispatch({
        type: ACTION.BOOK_VOTE,
        status: ACTION_STATUS.SUCCESS,
        data: res.body
      });

      return res.body;
    },
      (err) => {

        dispatch({
          type: ACTION.BOOK_VOTE,
          status: ACTION_STATUS.FAILURE,
          error: err,
        });

        return err;
      }
    );

  };

}
