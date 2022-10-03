// Book Class
class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}
// UI class: handle UI tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                pages: '474'
            },
            {
                title: 'Book Two',
                author: 'BobbyJoe',
                pages: '882'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');
        container.insertBefore(div, form);
        // make disappear in 2 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    // clear form when add book is clicked
    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('pages').value = '';
    }
}
// Store class: handles storage, local storage within browser

// Event: display books
 document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: add a book
document.getElementById('book-form').addEventListener('submit', (e) => {
    // prevent actual submit
    e.preventDefault();

    // get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;

    //validate
    if(title === '' || author === '' || pages === '') {
        UI.showAlert('Please fill in all fields', 'alert-danger');
    } else {

    // instantiate book
    const book = new Book(title, author, pages);

    // Add Book to UI
    UI.addBookToList(book);

    //show success mesage
    UI.showAlert('Book Added', 'alert-success');

    // Clear fileds
    UI.clearFields()
    }
});

// Event: remove a book, both in the UI and in storage
document.getElementById('book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    UI.showAlert('Book Removed', 'alert-success');
})