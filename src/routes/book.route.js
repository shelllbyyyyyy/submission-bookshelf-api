import BookHandler from '../handlers/book.handler.js';

export const BookRoute = [
  {
    method: 'GET',
    path: '/books',
    handler: BookHandler.getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: BookHandler.getBookById,
  },
  {
    method: 'POST',
    path: '/books',
    handler: BookHandler.addBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: BookHandler.updateBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: BookHandler.deleteBookById,
  },
];
