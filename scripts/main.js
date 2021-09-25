/*--MODEL START--*/
let myBookshelf = [];
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    addBookToBookshelf(this);
}
Book.prototype = {
    info: function() {
        return `${this.title}, by ${this.author}.\n${this.pages} pages long.\n${this.hasRead ? "Read." : "Not read."}`;
    }
}

let currentShelf = 0;

const dune = new Book("Dune", "Frank Herbert", 798, true);
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 366, true);
const hp4 = new Book("Harry Potter and the Goblet of Fire", "J.K. Rowling", 734, true);
const theStand = new Book("The Stand", "Stephen King", 1152, false);
const pps = new Book("Perdido Street Station", "China Miéville", 710, true);
const later = new Book("Later", "Stephen King", 248, true);
const mrNorrell = new Book("Jonathan Strange & Mr. Norrell", "Susanna Clarke", 1006, true);
const neuromancer = new Book("Neuromancer", "William Gibson", 292, false);

// this may not need to be a spread if it's only used for singular new books + the constructor
function addBookToBookshelf(...books) {
    books.forEach(book => {
        if (!myBookshelf.includes(book)) {
            myBookshelf.push(book);
        }
    });
}
updateBooksDisplay();
/*--MODEL END--*/

/*--CONTROL START--*/
// logic
/*--CONTROL END--*/

/*--VIEW START--*/
window.addEventListener("resize", updateBooksDisplay);

function updateBooksDisplay() {
    // clear the bookshelf
    currentShelf = 0;
    clearShelves();
    myBookshelf.forEach(book => createBookElement(book));
}
function clearShelves() {
    const shelves = document.querySelectorAll(".shelves");
    shelves.forEach(shelf => {
        const booksOnShelf = document.createRange();
        booksOnShelf.selectNodeContents(shelf);
        booksOnShelf.deleteContents();
    })
}
function createBookElement(book) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.style.width = `${book.pages / 60}rem`;
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
    bookElement.append(...bookInfo);

    calculateCurrentShelf(parseInt(bookElement.style.width) * 10);
    console.log(`current shelf: ${currentShelf}`);
    const shelfToUse = document.querySelector(`.shelf${currentShelf}`);
    shelfToUse.appendChild(bookElement);
}
function calculateCurrentShelf(newBookWidth) {
    // using a flex would be sooooo much more performant
    const shelves = document.querySelectorAll(".shelves");
    const shelfStyle = getComputedStyle(shelves[0]);
    const shelfPadding = parseInt(shelfStyle.paddingLeft) + parseInt(shelfStyle.paddingRight);
    const shelfWidth = parseInt(shelfStyle.width) - shelfPadding;
    const bookGap = parseInt(shelfStyle.gap);
    console.log("\ninside calculateCurrent");

    for (let i = currentShelf; i < shelves.length; i++) {
        const booksOnShelf = document.querySelectorAll(`.shelf${i} > *`);
        let booksOnShelfWidth = 0;
        let booksGapSum = 0;
        booksOnShelf.forEach(bookElement => {
            const bookWidth = parseInt(getComputedStyle(bookElement).width);
            booksOnShelfWidth += bookWidth;
            //console.log(`bookWidth: ${bookWidth}`);
            console.log(bookElement.textContent);
        });

        if (booksOnShelf.length > 1) {
            booksGapSum = bookGap * (booksOnShelf.length - 1);
        }
        console.log(`shelf width: ${shelfWidth}`);
        console.log(`booksOnShelfWidth: ${booksOnShelfWidth}`);
        console.log(`newBookWidth: ${newBookWidth}`);
        if (newBookWidth < (shelfWidth - (booksOnShelfWidth + booksGapSum))) {
            currentShelf = i;
            return;
        }
    }
    currentShelf = 0;
}

/*--VIEW END--*/