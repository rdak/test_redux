/**
 * Book object interface
 */
export interface IBook {
  id: number;
  name: string;
  description: string;
  ranking: number;
}

export interface IBookDetails {
  id: number;
  ranking: number;
}

/**
 * Collection of books
 */
export interface IBookCollection extends ICollection<IBook> {}

export interface ICollection<TItem> {
  items: Array<TItem>;
}
