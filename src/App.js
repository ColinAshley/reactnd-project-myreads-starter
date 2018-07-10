// import React
import React from 'react';
import { Route } from 'react-router-dom';
// import APIs
import * as BooksAPI from './BooksAPI';
// import app components and style
import BookLibrary from './components/BookLibrary';
import Search from './components/Search';
import './App.css';

class BooksApp extends React.Component {
  constructor () {
    super();
    this.state = BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  updateShelf = (book, destShelf) => {
    const { books } = this.state;

    const bookIndex = books.findIndex((key) => {
      return key.id === book.id;
    });

    let stateBooks = Object.assign([], books);

    if (bookIndex === -1) {
      const newBook = Object.assign({}, book);
      newBook.shelf = destShelf;
      stateBooks.push(newBook);
    } else {
      stateBooks[bookIndex] = Object.assign({}, stateBooks[bookIndex]);
      stateBooks[bookIndex].shelf = destShelf;
    }

    BooksAPI.update(book, destShelf).then(
      this.setState({ books: stateBooks })
    );
  };

  render () {
    const { books } = this.state;

    if (!books) {
      return null;
    }

    return (
      <div className="app">
        <Route path="/search" render={ () => (
          <Search
            libraryBooks={ books }
            updateShelf={ this.updateShelf }
          />
        )} />
        <Route exact path="/" render={ () => (
          <BookLibrary
            books={ books }
            updateShelf={ this.updateShelf }
          />
        )} />
      </div>
    );
  }
}

export default BooksApp
