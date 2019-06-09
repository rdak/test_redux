// import { ICollection } from "../interfaces/shared";

/**
 * Actions enum
 */
export enum ACTION {
  BOOK_LIST_FETCH = "book_list_fetch",
  BOOK_VOTE = "book_rank",
}

/**
 * Action statuses
 */
export enum ACTION_STATUS {
  REQUEST = "request",
  SUCCESS = "success",
  FAILURE = "failure"
}

/**
 * Action entities interface
 */
export interface IActionEntities {
  [K: string]: any;
  [K: number]: any;
}

/**
 * Action interface
 */
export interface IAction<TData = null> {
  type: string;
  status?: ACTION_STATUS;
  error?: Error;
  entities?: { [K: string]: IActionEntities };
  data?: TData;
}
