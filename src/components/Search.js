//import React & APIs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
// import App components
import Book from './Book';

class Search extends Component {
  constructor () {
    super();
    this.state = {
      query: '',
      books: []
    };
  }

  // Send Query via API and set the state of the page
  updateQuery = (query) => {
    const { libraryBooks } = this.props;
    // If query is empty, clear current books.
    if (query === '') {
      this.setState({books: [] })
    }
    else {
        this.setState({ query: query });
        // perform the search
        BooksAPI.search(query, 20).then((response) => {
          if (response && response.length) {
            const books = response.map((book) => {
            const libBook = libraryBooks.find((libBook) => libBook.id === book.id);
            book.shelf = libBook ? libBook.shelf : 'none';
            return book
          });
          this.setState({ books });
        }
      });
    };
  };

  render () {
    const { books } = this.state;
    const { updateShelf } = this.props;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={ (event) => this.updateQuery(event.target.value) }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.map((book) => (
                <li key={ book.id }>
                  <Book
                    id={ book.id }
                    shelf={ book.shelf }
                    authors={ book.authors }
                    title={ book.title }
                    imageLinks={ book.imageLinks }
                    updateShelf={ updateShelf }
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
