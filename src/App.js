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

  // initial state
  state = {
    books: []
  };

  // load books once component mounted
  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  // Places new book or moves existing book to another shelf
  updateShelf = (book, destShelf) => {
    const { books } = this.state;

    const bookIdx = books.findIndex((key) => {
      return key.id === book.id;
    });

    let myBooks = Object.assign([], books);

    if (bookIdx === -1) {
      // Book not in my books
      const newBook = Object.assign({}, book);
      newBook.shelf = destShelf;
      myBooks.push(newBook);
    } else {
      // move existing book
      myBooks[bookIdx] = Object.assign({}, myBooks[bookIdx]);
      myBooks[bookIdx].shelf = destShelf;
    }

    BooksAPI.update(book, destShelf).then(
      this.setState({ books: myBooks })
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
