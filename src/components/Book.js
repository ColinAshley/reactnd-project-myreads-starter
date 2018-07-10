/* Name: Book.js
** Desc: Define, manage and display a book.
*/

import React, { Component } from 'react';

class Book extends Component {
  constructor () {
    super();
    // book has no shelf initially
    this.state = { shelf: 'none' };
  }

  changeShelf (value) {
    const { updateShelf } = this.props;
      updateShelf(this.props, value);
      // update shelf state
      this.setState({ shelf: value });
  };

  // causes book to be re-rendered on target shelf
  componentDidMount () {
    const { shelf } = this.props;
    this.setState({ shelf });
  };

  // display the book and options list
  render () {
    const { title, authors, imageLinks } = this.props;
    const { thumbnail } = imageLinks;
    const { shelf } = this.state;

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={ { backgroundImage: `url("${ thumbnail }")` } }></div>
          <div className="book-shelf-changer">
            <select value={ shelf }
                    onChange={ (event) => this.changeShelf(event.target.value) }>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ title }</div>
        <div className="book-authors">{ authors }</div>
      </div>
    );
  }
}

export default Book;