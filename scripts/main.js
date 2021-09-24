/*--MODEL START--*/
let myBookshelf = [];
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.displayedOnShelf = false;
}
Book.prototype = {
    info: function() {
        return `${this.title}, by ${this.author}.\n${this.pages} pages long.\n${this.hasRead ? "Read." : "Not read."}`;
    }
}

const shelf1 = document.querySelector(".shelf1");
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 325, true);
const dune = new Book("Dune", "Frank Herbert", 880, true);
const hp4 = new Book("Harry Potter and the Goblet of Fire", "J.K. Rowling", 600, true);
const theStand = new Book("The Stand", "Stephen King", 1200, false);

/*--MODEL END--*/

/*--CONTROL START--*/
function addBookToBookshelf(...books) {
    books.forEach(book => myBookshelf.push(book));
}
console.log(theHobbit.info());
addBookToBookshelf(dune, theHobbit, hp4, theStand);
console.table(myBookshelf);

/*--CONTROL END--*/

/*--VIEW START--*/
// maybe this whole function should go within addBookToBookshelf.
// removes need for displayedOnShelf
function displayBooks() {
    // this might make more sense as a for loop starting at the
    // end of myBookshelf, counting down, and breaking once it reaches
    // an already-displayed book
    myBookshelf.forEach(book => {
        if (book.displayedOnShelf === true) {
            return;
        }

        const newBook = document.createElement("div");
        newBook.classList.add("book");
        newBook.style.width = `${book.pages / 60}rem`;
        const bookTitle = document.createElement("div");
        bookTitle.classList.add("title");
        bookTitle.textContent = book.title;
        const titleUnderline = document.createElement("hr");
        titleUnderline.classList.add("title-underline");
        const bookAuthor = document.createElement("div");
        bookAuthor.classList.add("author");
        bookAuthor.textContent = book.author;
        const bookPages = document.createElement("div");
        bookPages.classList.add("pages");
        bookPages.textContent = `${book.pages} pages`;
        const bookInfo = [bookTitle, titleUnderline, bookAuthor, bookPages];
        newBook.append(...bookInfo);
        //newBook.textContent = book.info();

        shelf1.appendChild(newBook);
        book.displayedOnShelf = true;
    })
}
displayBooks();
/*--VIEW END--*/