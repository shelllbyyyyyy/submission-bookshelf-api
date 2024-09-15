import books from '../repositories/book.repository.js';

class BookShelf {
  constructor() {
    this.books = books;
  }

  addBook(book) {
    this.books.push(book);
  }

  listBook() {
    return this.books.map((book) => book.displayBook());
  }

  deleteBook(index) {
    this.books.splice(index, 1);
  }
}

export default BookShelf;
