import React from 'react';
import Book from './Book';

function Bookshelf ({ name, books, updateShelf }) {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ name }</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((book) => (
              <li key={ book.id }>
                <Book
                  id={ book.id }
                  authors={ book.authors }
                  title={ book.title }
                  imageLinks={ book.imageLinks }
                  shelf={ book.shelf }
                  updateShelf={ updateShelf }
                />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;