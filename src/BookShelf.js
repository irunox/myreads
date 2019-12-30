import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class BookShelf extends Component {
  static propTypes = {
    shelf: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    const shelf = this.props.shelf;
    const shelfTitle = this.props.shelfTitle;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {shelf.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  onChangeShelf={this.props.onChangeShelf}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
