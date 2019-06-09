// import { mockRequest, apiRequest, HTTP_METHOD as METHOD, HTTP_STATUS } from "./request";

// import Interfaces from "../interfaces/";
import * as Interfaces from "../interfaces";
import { mockRequest, HTTP_STATUS, HTTP_METHOD } from "./request";
import { IBook, IBookDetails } from "../interfaces/book";
import items from "../constants/items";

// import { IPermissionResponse, IAssignedRoles } from "../interfaces/Permission";
// import { IUser } from "../interfaces/User";

/**
 * Request organization list
 */

export function getBookCollection() {

  return mockRequest<Interfaces.Book.IBook[]>(
    HTTP_METHOD.GET,
    `/books`,
    {},
    {},
    HTTP_STATUS.OK,
    items
  );

}

export function updateBook(bookId: number, rank: number) {

  return mockRequest<IBookDetails>(
    HTTP_METHOD.PUT,
    `/books/${bookId}`,
    null,
    null,
    HTTP_STATUS.OK,
    {
      id: bookId,
      ranking: Number(rank)
    }
  );

}
