import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookSearch from "./BookSearch";
import BookList from "./BookList";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  /**
  * @description Changes shelf of the book
  * @param {string} shelf - The title of the shelf
  * @param {object} book - The current book
  */
  changeShelf = (shelf, book) => {
    BooksAPI.update(book, shelf).then(res => {
      book.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }));
    });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              books={this.state.books}
              onChangeShelf={this.changeShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <BookSearch
              myBooks={this.state.books}
              onChangeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
