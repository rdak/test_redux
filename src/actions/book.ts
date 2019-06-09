// Api
import { BookApi } from "../api";

// Intefaces
import { ACTION, ACTION_STATUS } from "./action";
import * as Interfaces from "../interfaces";
import { IBook } from "../interfaces/book";

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

export function doUpdateBook(bookId: number, data: number) {

  return (dispatch) => {

    dispatch({
      type: ACTION.BOOK_VOTE,
      status: ACTION_STATUS.REQUEST
    });

    return BookApi.updateBook(bookId, data).then((res) => {

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

export function doRandomUpdate(items: IBook[]) {
  return (dispatch) => {
    dispatch(doUpdateBook(1, 123));
  };
}