import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  changeBookShelf = event => {
    this.props.onChangeShelf(event.target.value, this.props.book);
  };

  render() {
    const book = this.props.book;

    if (book.imageLinks === undefined || book.authors === undefined) return null;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
              }}
            />
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf?this.props.book.shelf:"none"} onChange={this.changeBookShelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors.join(", ")}</div>
        </div>
      </li>
    );
  }
}

export default Book;
