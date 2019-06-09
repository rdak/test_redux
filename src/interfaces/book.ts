/**
 * Book object interface
 */
export interface IBook {
  id: number;
  name: string;
  description: string;
  vote: number;
}

export interface IBookDetails {
  vote: number;
}

/**
 * Collection of books
 */
export interface IBookCollection extends ICollection<IBook> {}

export interface ICollection<TItem> {
  items: Array<TItem>;
}
