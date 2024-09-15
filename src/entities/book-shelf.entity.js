import books from '../repositories/book.repository.js';

class BookShelf {
  constructor() {
    this.books = books;
  }

  addBook(book) {
    this.books.push(book);
  }

  listBooks() {
    return this.books.map((book) => book.displayBook());
  }

  deleteBook(index) {
    this.books.splice(index, 1);
  }

  filteredBooks(data) {
    return data.map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      };
    });
  }

  getBooks() {
    return this.books.map((book) => book.getBookById());
  }

  findBook(id) {
    return this.books.find((book) => book.id === id);
  }

  findBookIndex(id) {
    return this.books.findIndex((book) => book.id === id);
  }

  updateBookByIndex(index, data) {
    this.books[index].updateBook(data);
  }
}

export default BookShelf;
