// import { mockRequest, apiRequest, HTTP_METHOD as METHOD, HTTP_STATUS } from "./request";

// import Interfaces from "../interfaces/";
import * as Interfaces from "../interfaces";
import { mockRequest, HTTP_STATUS, HTTP_METHOD } from "./request";
import { IBook } from "../interfaces/book";

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
    [
      {
        id: 1,
        name: "test",
        description: "test",
        vote: 0
      },
      {
        id: 2,
        name: "test 2",
        description: "test 2",
        vote: 213
      }
    ]
  );

}

export function updateBook(bookId: number) {

  return mockRequest<null>(
    HTTP_METHOD.PUT,
    `/books/${bookId}`,
    null,
    null,
    HTTP_STATUS.OK
  );

}
