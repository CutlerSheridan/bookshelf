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
    },
    toggleReadState: function() {
        this.hasRead = !this.hasRead;
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
const addBookButton = document.querySelector("#add-book-button");
addBookButton.addEventListener("click", clearAndDisplayAddBookScreen);
const addBookScreen = document.querySelector(".form-container");
const bookForm = document.getElementById("book-form");


function clearAndDisplayAddBookScreen(e) {
    e.preventDefault();
    bookForm.reset();
    toggleAddBookScreenVisibility();
    focusOnTitleField();
}
// why tf doesn't this work
function focusOnTitleField() {
    addBookButton.blur();
    bookForm.elements["title"].focus();
    console.log(bookForm.elements["title"]);
}
function toggleAddBookScreenVisibility() {
    addBookScreen.classList.toggle("invisible");
    if (!addBookScreen.classList.contains("invisible")) {
        addBookScreen.addEventListener("click", implementFormOutskirtClickBehavior);
    } else {
        addBookScreen.removeEventListener("click", implementFormOutskirtClickBehavior);
    }
}
function implementFormOutskirtClickBehavior(e) {
    if (e.target === addBookScreen) {
        toggleAddBookScreenVisibility();
    }
}

bookForm.addEventListener("submit", createBookFromForm);
function createBookFromForm(e) {
    e.preventDefault();
    const newTitle = bookForm.elements["title"];
    const newAuthor = bookForm.elements["author"];
    const newPageCount = bookForm.elements["page-count"];
    const newHasRead = bookForm.elements["read-or-not"];

    const newBook = new Book(
        newTitle.value,
        newAuthor.value,
        newPageCount.value,
        newHasRead.checked
    );
    //
    // sorting logic here
    //
    updateBooksDisplay();
    toggleAddBookScreenVisibility();
}
function sortBooks(sortMethod) {
    // actual sorting logic here

}
/*--CONTROL END--*/

/*--VIEW START--*/
window.addEventListener("resize", updateBooksDisplay);

function updateBooksDisplay() {
    currentShelf = 0;
    clearShelves();
    //myBookshelf.forEach(book => createBookElement(book));
    for (let i = 0; i < myBookshelf.length; i++) {
        const newBookElement = createBookElement(myBookshelf[i]);
        calculateCurrentShelf(parseInt(newBookElement.style.width) * 10);
        const shelfToUse = document.querySelector(`.shelf${currentShelf}`);
        shelfToUse.appendChild(newBookElement);
    }

    const allReadToggles = document.querySelectorAll(".read-toggle-icon");
    allReadToggles.forEach(readToggle => readToggle.addEventListener("click", () => toggleReadStyle(readToggle)));
}
function clearShelves() {
    const shelves = document.querySelectorAll(".shelves");
    shelves.forEach(shelf => {
        const booksOnShelf = document.createRange();
        booksOnShelf.selectNodeContents(shelf);
        booksOnShelf.deleteContents();
    });
}
function createBookElement(book) {
    const bookIndex = myBookshelf.indexOf(book);

    const bookElement = document.createElement("div");
    bookElement.dataset.orderLoc = bookIndex;
    bookElement.classList.add("book", "read", "not-read");
    if (!book.hasRead) {
        bookElement.classList.toggle("read");
    }
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

    const bookControls = document.createElement("div");
    bookControls.classList.add("book-controls");
    const readToggle = document.createElement("input");
    readToggle.type = "checkbox";
    readToggle.checked = book.hasRead;
    readToggle.classList.add("read-toggle");
    readToggle.id = `read-toggle-${bookIndex}`;
    const readToggleIconLabel = document.createElement("label");
    readToggleIconLabel.dataset.orderLoc = bookIndex;
    readToggleIconLabel.htmlFor = `read-toggle-${bookIndex}`;
    readToggleIconLabel.classList.add("read-toggle-icon", "read-toggle-icon-checked");
    if (!book.hasRead) {
        readToggleIconLabel.classList.toggle("read-toggle-icon-checked");
    }
    const readToggleIconSpan = document.createElement("span");
    readToggleIconSpan.classList.add("material-icons-outlined");
    readToggleIconSpan.textContent = "check_circle_outlined";
    readToggleIconLabel.append(readToggleIconSpan);
    bookControls.append(...[readToggle, readToggleIconLabel]);
    console.log(readToggle, readToggleIconLabel);

    //const bookInfo = [bookTitle, titleUnderline, bookAuthor, bookPages, bookControls];
    bookElement.append(...[bookTitle, titleUnderline, bookAuthor, bookPages, bookControls]);
    return bookElement;
}
function calculateCurrentShelf(newBookWidth) {
    const shelves = document.querySelectorAll(".shelves");
    const shelfStyle = getComputedStyle(shelves[0]);
    const shelfPadding = parseInt(shelfStyle.paddingLeft) + parseInt(shelfStyle.paddingRight);
    const shelfWidth = parseInt(shelfStyle.width) - shelfPadding;
    const bookGap = parseInt(shelfStyle.gap);

    for (let i = currentShelf; i < shelves.length; i++) {
        const booksOnShelf = document.querySelectorAll(`.shelf${i} > *`);
        let booksOnShelfWidth = 0;
        let booksGapSum = 0;
        booksOnShelf.forEach(bookElement => {
            const bookWidth = parseInt(getComputedStyle(bookElement).width);
            booksOnShelfWidth += bookWidth;
        });

        if (booksOnShelf.length > 1) {
            booksGapSum = bookGap * (booksOnShelf.length - 1);
        }
        /*console.log(`shelf width: ${shelfWidth}`);
        console.log(`booksOnShelfWidth: ${booksOnShelfWidth}`);
        console.log(`newBookWidth: ${newBookWidth}`);*/
        if (newBookWidth < (shelfWidth - (booksOnShelfWidth + booksGapSum))) {
            currentShelf = i;
            return;
        }
    }
    currentShelf = 0;
}
function toggleReadStyle(readToggle) {
    myBookshelf[readToggle.dataset.orderLoc].toggleReadState();
    const bookElement = document.querySelector(`.book[data-order-loc="${readToggle.dataset.orderLoc}"]`);
    bookElement.classList.toggle("read");
    readToggle.classList.toggle("read-toggle-icon-checked");
}
/*--VIEW END--*/