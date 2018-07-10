// import React
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import App components and style
import Bookshelf from './BookShelf';

class Library extends Component {
  // find books on specific shelf using .filter
  getBooksByShelf = (shelf) => {
    const { books } = this.props;
    return books.filter((book) => book.shelf === shelf);
  }

  render () {
    const { updateShelf } = this.props;

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              name="Currently Reading"
              books={ this.getBooksByShelf('currentlyReading') }
              updateShelf={ updateShelf }
            />
            <Bookshelf
              name="Want to Read"
              books={ this.getBooksByShelf('wantToRead') }
              updateShelf={ updateShelf }
            />
            <Bookshelf
              name="Read"
              books={ this.getBooksByShelf('read') }
              updateShelf={ updateShelf }
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
          </Link>
        </div>
      </div>
      // TODO: add 'save/load/export/import my library' functionality
    );
  }
}

export default Library;
