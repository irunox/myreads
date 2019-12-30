import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    const { books } = this.props;

    const currentlyReadingShelf = books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToReadShelf = books.filter(book => book.shelf === "wantToRead");
    const readShelf = books.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              shelf={currentlyReadingShelf}
              shelfTitle="Currently Reading"
              onChangeShelf={this.props.onChangeShelf}
            />
            <BookShelf
              shelf={wantToReadShelf}
              shelfTitle="Want to Read"
              onChangeShelf={this.props.onChangeShelf}
            />
            <BookShelf
              shelf={readShelf}
              shelfTitle="Read"
              onChangeShelf={this.props.onChangeShelf}
            />
          </div>
        </div>
        <Link to="/search" className="open-search">
          Search Book
        </Link>
      </div>
    );
  }
}

export default BookList;
