import * as React from "react";
import { connect } from "react-redux";
import rn from 'random-number';

// Interfaces
import * as Interfaces from "../interfaces";

// Actions
import { doFetchBookList, doUpdateBook, doRandomUpdate } from "../actions";
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
  updateRank: (id: number, rank: number) => void;
  randomUpdate: (items: IBook[]) => void;
}

/**
 * Store state to props mapper
 *
 * @param store Store
 */
function mapStateToProps(store: IStore): any {
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
    updateRank: (id, rank) =>
      dispatch(doUpdateBook(id, rank)),
    randomUpdate: (items: IBook[]) =>
      dispatch(doRandomUpdate(items)),
  };

}

interface IBookListState {
  randomMode: boolean;
}

/**
 * Book List view component
 */
class _BookList extends React.Component<IBookListProps & IBookListDispatch, IBookListState> {

  protected timer;

  constructor(props) {
    super(props);

    this.state = {
      randomMode: false,
    }

    this.updateRank = this.updateRank.bind(this);
    this.randomMode = this.randomMode.bind(this);
    this.randomUpdate = this.randomUpdate.bind(this);
  }

  public componentDidUpdate() {
    if (this.state.randomMode) {
      this.randomUpdate();
    } else {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    }
  }

  public componentDidMount() {

    this.props.getBookList();

  }

  public componentWillUnmount() {

    if (this.timer)
      clearTimeout(this.timer);

  }

  public randomMode() {
    this.setState({
      randomMode: !this.state.randomMode,
    });
  }

  public randomUpdate() {
    if (this.state.randomMode) {

      const randomIndex = rn({ min: 0, max: this.props.bookList.length-1, integer: true});
      const randomRank = rn({ min: -1000, max: 1000, integer: true });
      const randomTimeout = rn({ min: 500, max: 1000 });
      this.timer = setTimeout(() => {
        this.props.updateRank(this.props.bookList[randomIndex].id, randomRank);
      }, randomTimeout);

    }

  }

  public updateRank(id: number, rank: number) {
    this.props.updateRank(id, rank);
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
        <div className="book-list__header">
          <h1 className="book-list__title">Book list</h1>
          <div className="book-list__action">
            <button onClick={this.randomMode}>{this.state.randomMode ? "Turn off" : "Turn on"} "Random Update"</button>
          </div>
        </div>
        {
          // worst choice : array+sort
          // better: array + sorting in the store
          // the best for updating: using normalized object
          bookList && bookList.length ?
            bookList.sort((a, b) => {return (a.ranking > b.ranking) ? -1 : 1}).map((book: Interfaces.Book.IBook) => {
              return <BookRow
                item={book}
                key={book.id}
                onChange={this.updateRank}
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

const BookRow: React.SFC<{ item: IBook; onChange: (id: number, rank: number) => void; }> = (props) => {
  const [rank, setRank] = React.useState(props.item.ranking);

  React.useEffect(() => {
    setRank(props.item.ranking);
  }, [props.item]);

  return (
    <div className="book">
      <div className="book__info">
        <div className="book__title">{props.item.name}</div>

        <div className="book__description">{props.item.description}</div>
      </div>

      <div className="book__action">
        <input type="number" value={String(rank)} onChange={ (e) => {setRank(Number(e.target.value))}} />
        <button onClick={() => props.onChange(props.item.id, rank)}>Rank it</button>
      </div>

    </div>
  );
};
