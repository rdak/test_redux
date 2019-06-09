import * as Interfaces from "../interfaces";
import { mockRequest, HTTP_STATUS, HTTP_METHOD } from "./request";
import { IBookDetails } from "../interfaces/book";
import items from "../constants/items";

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
