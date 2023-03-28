import time from './modules/date.js';
import NavFunction from './modules/navbar.js';
import RenderBooks from './modules/renders.js';

const navs = document.querySelectorAll('nav ul li');
NavFunction(navs);

const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const form = document.getElementById('form');
const timeElement = document.querySelector('.time-stamp');
const bookList = document.querySelector('.books-list');

class BookList {
  constructor() {
    this.books = [];
  }

  addBook() {
    if (bookTitle.value.length !== 0 && bookAuthor.value.length !== 0) {
      if (this.books.length !== 0) {
        this.books.push({
          title: bookTitle.value,
          author: bookAuthor.value,
          id: this.books[this.books.length - 1].id + 1,
        });
        bookTitle.value = '';
        bookAuthor.value = '';
      } else {
        this.books.push({
          title: bookTitle.value,
          author: bookAuthor.value,
          id: 1,
        });
        bookTitle.value = '';
        bookAuthor.value = '';
      }

      localStorage.setItem('books', JSON.stringify(this.books));
      this.renderBooks();
      this.setRemoveEventListeners();
    }
  }

  renderBooks() {
    RenderBooks(this.books, bookList);
  }

  setRemoveEventListeners() {
    this.books.forEach((book) => {
      const removeBtn = document.getElementById(`remove-${book.id}`);
      removeBtn.addEventListener('click', () => {
        this.books = this.books.filter((element) => element.id !== book.id);

        localStorage.setItem('books', JSON.stringify(this.books));
        this.renderBooks();
        this.setRemoveEventListeners();
      });
    });
  }
}

time(timeElement);

const booksList = new BookList();

const reterevedBooks = localStorage.getItem('books');

if (reterevedBooks) {
  booksList.books.push(...JSON.parse(reterevedBooks));
  booksList.renderBooks();
  booksList.setRemoveEventListeners();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  booksList.addBook();
});
