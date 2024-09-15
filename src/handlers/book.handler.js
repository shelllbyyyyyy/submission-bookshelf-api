import { nanoid } from 'nanoid';

import Book from '../entities/book.entity.js';
import BookShelf from '../entities/book-shelf.entity.js';

class BookHandler {
  static addBook(request, h) {
    const bookShelf = new BookShelf();

    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    try {
      if (!name) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });

        response.code(400);
        return response;
      }

      if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message:
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });

        response.code(400);
        return response;
      }

      const book = new Book(
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
      );

      bookShelf.addBook(book);

      const isSuccess =
        bookShelf.listBooks().filter((book) => book.id === id).length > 0;

      if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        });

        response.code(201);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
      });

      response.code(500);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static getAllBooks(request, h) {
    const bookShelf = new BookShelf();

    const { name, reading, finished } = request.query;

    try {
      if (name !== undefined) {
        const book = bookShelf
          .listBooks()
          .filter((book) =>
            book.name.toLowerCase().includes(name.toLowerCase()),
          );

        const response = h.response({
          status: 'success',
          data: {
            books: bookShelf.filteredBooks(book),
          },
        });

        response.code(200);
        return response;
      }

      if (reading !== undefined) {
        const book = bookShelf
          .listBooks()
          .filter((book) => Number(book.reading) === Number(reading));

        const response = h.response({
          status: 'success',
          data: {
            books: bookShelf.filteredBooks(book),
          },
        });

        response.code(200);
        return response;
      }

      if (finished !== undefined) {
        const book = bookShelf
          .listBooks()
          .filter((book) => Number(book.finished) === Number(finished));

        const response = h.response({
          status: 'success',
          data: {
            books: bookShelf.filteredBooks(book),
          },
        });

        response.code(200);
        return response;
      }

      const response = h.response({
        status: 'success',
        data: {
          books: bookShelf.getBooks(),
        },
      });

      response.code(200);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static getBookById(request, h) {
    const bookShelf = new BookShelf();

    const { bookId } = request.params;

    try {
      const book = bookShelf.findBook(bookId);

      if (!book) {
        const response = h.response({
          status: 'fail',
          message: 'Buku tidak ditemukan',
        });

        response.code(404);
        return response;
      }

      const response = h.response({
        status: 'success',
        data: {
          book,
        },
      });

      response.code(200);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static updateBookById(request, h) {
    const bookShelf = new BookShelf();

    const { bookId } = request.params;

    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();

    try {
      const index = bookShelf.findBookIndex(bookId);

      if (name === undefined) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });

        response.code(400);
        return response;
      }

      if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message:
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });

        response.code(400);
        return response;
      }

      if (index !== -1) {
        bookShelf.updateBookByIndex(index, {
          name,
          year,
          author,
          summary,
          publisher,
          pageCount,
          readPage,
          reading,
          finished,
          updatedAt,
        });

        const response = h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        });

        response.code(200);
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });

      response.code(404);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static deleteBookById(request, h) {
    const bookShelf = new BookShelf();

    const { bookId } = request.params;

    try {
      const index = bookShelf
        .listBooks()
        .findIndex((book) => book.id === bookId);

      if (index !== -1) {
        bookShelf.deleteBook(index);
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil dihapus',
        });

        response.code(200);
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });

      response.code(404);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default BookHandler;
