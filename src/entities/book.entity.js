class Book {
  constructor(
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
  ) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.finished = finished;
    this.reading = reading;
    this.insertedAt = insertedAt;
    this.updatedAt = updatedAt;
  }

  displayBook() {
    return {
      id: this.id,
      name: this.name,
      year: this.year,
      author: this.author,
      summary: this.summary,
      publisher: this.publisher,
      pageCount: this.pageCount,
      readPage: this.readPage,
      finished: this.finished,
      reading: this.reading,
      insertedAt: this.insertedAt,
      updatedAt: this.updatedAt,
    };
  }

  getBookById() {
    return {
      id: this.id,
      name: this.name,
      publisher: this.publisher,
    };
  }

  updateBook(data) {
    this.name = data.name;
    this.year = data.year;
    this.author = data.author;
    this.summary = data.summary;
    this.publisher = data.publisher;
    this.pageCount = data.pageCount;
    this.readPage = data.readPage;
    this.finished = data.finished;
    this.reading = data.reading;
    this.updatedAt = data.updatedAt;
  }
}

export default Book;
