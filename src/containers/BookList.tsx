import * as React from "react";
import { connect } from "react-redux";

// Interfaces
import * as Interfaces from "../interfaces";

// Actions
import { doFetchBookList } from "../actions";
import { IStore, IEntityState } from "../reducers";
import { IBook, IBookCollection } from "../interfaces/book";

/**
 * Component props
 */
interface IBookListProps {
  bookList: IBook[];
}

/**
 * Component actions
 */
interface IBookListDispatch {
  getBookList: () => void;
}

/**
 * Store state to props mapper
 *
 * @param store Store
 */
function mapStateToProps(store: IStore): any {
  // console.log(store);
  return {
    bookList: store.books.items,
  };
}

/**
 * Dispatch action mapper
 *
 * @param dispatch Dispatch function
 */
function mapDispatchActions(dispatch): IBookListDispatch {

  return {
    getBookList: () =>
      dispatch(doFetchBookList()),
  };

}

/**
 * Book List view component
 */
class _BookList extends React.Component<IBookListProps & IBookListDispatch, {}> {

  public componentDidMount() {

    this.props.getBookList();

  }

	/**
	 * Render method
	 */
  public render() {

    const {
      bookList
    } = this.props;

    return (
      <div className="book-list">
        <h1>Book list</h1>
        {
          bookList && bookList.length ?
            bookList.map((book: Interfaces.Book.IBook) => {
              return <BookRow
                item={book}
                key={book.id}
              />
            }) : "No books"
        }
      </div>
    );

  }

}

/**
 * Org List view component
 */
export const BookList = connect<IBookListProps, IBookListDispatch, {}>(
  mapStateToProps,
  mapDispatchActions
)(_BookList);

const BookRow: React.SFC<{ item: IBook; }> = (props) => {
  return (
    <div className="book">

        <div className="book__title">{props.item.name}</div>

        <div className="book__description">{props.item.description}</div>

    </div>
  );
};
