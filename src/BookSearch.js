import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book";

class BookSearch extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  state = {
    query: "",
    searchedBooks: [],
    myBooks: [],
    noBooksFound: false
  };

  /**
  * @description Updates query in state and calls the updateSearchedBooks function
  * @param {string} query - current query string from input
  */
  handleChange = query => {
    this.setState(() => ({ query }));
    this.updateSearchedBooks(query);
  };

  /**
  * @description Performs search and saves results updating searchedBooks in state
  * @param {string} query - current query string from input
  */
  updateSearchedBooks = query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(searchedBooks => {
        if (searchedBooks.error) {
          this.setState({ searchedBooks: [], noBooksFound: true });
        } else {
          this.setState(prevState => ({
            ...prevState,
            searchedBooks: searchedBooks,
            noBooksFound: false
          }));
        }
      });
    } else {
      this.setState({ searchedBooks: [], noBooksFound: false });
    }
  };

  render() {
    const { query } = this.state;
    const myBooks = this.props.myBooks;
    const searchedBooks = this.state.searchedBooks;
    let errorMessage = "";

    if (myBooks) {
      myBooks.forEach(myBook => {
        let index = searchedBooks.findIndex(x => x.id === myBook.id);
        if (index > 0) {
          searchedBooks.splice(index, 1, myBook);
        }
      });
    }
    if (this.state.noBooksFound === true) {
      errorMessage = <h1 style={{ textAlign: `center` }}>No books found</h1>;
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div>{errorMessage}</div>
          <ol className="books-grid">
            {searchedBooks &&
              searchedBooks.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  onChangeShelf={this.props.onChangeShelf}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookSearch;
