/*--MODEL START--*/
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    addBookToBookshelf(this);
}
Book.prototype.info = function() {
    return `${this.title}, by ${this.author}.\n${this.pages} pages long.\n${this.hasRead ? "Read." : "Not read."}`;
};
Book.prototype.toggleReadState = function() {
    this.hasRead = !this.hasRead;
};

let currentShelf = 0;
let sortingMethod = "default";
let myBookshelf = [];
if (localStorage.getItem("storedBookshelf") != null) {
    const preexistingBooks = JSON.parse(localStorage.getItem("storedBookshelf"));
    preexistingBooks.forEach(book => { new Book(book.title, book.author, book.pages, book.hasRead); });
}

new Book("Dune", "Frank Herbert", 798, true);
new Book("The Hobbit", "J.R.R. Tolkien", 366, true);
new Book("Harry Potter and the Goblet of Fire", "J.K. Rowling", 734, true);
new Book("The Stand", "Stephen King", 1152, false);
new Book("Perdido Street Station", "China Miéville", 710, true);
new Book("Later", "Stephen King", 248, true);
new Book("Jonathan Strange & Mr. Norrell", "Susanna Clarke", 1006, true);
new Book("Neuromancer", "William Gibson", 292, false);
new Book("Where'd you go, Bernadette?", "Maria Semple", 330, true);
new Book("The Scar", "China Miéville", 578, true);
new Book("Console Wars", "Blake J. Harris", 576, false);
new Book("Word by Word", "Kory Stamper", 296, true);
new Book("The Terror", "Dan Simmons", 769, true);
new Book("Antkind", "Charlie Kaufman", 720, false);
new Book("The Divine Comedy", "Dante Alighieri", 798, false);

adjustHeaderStructureForResizing();
updateBooksDisplay();

function addBookToBookshelf(book) {
    if (!book) {
        return;
    }
    if (myBookshelf.some(b => b.title === book.title && b.author === book.author)) {
        return;
    }
    myBookshelf.push(book);
}
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
    setTimeout(() => focusOnTitleField(), 50);
}
// why tf doesn't this work
function focusOnTitleField() {
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
    updateBooksDisplay();
    toggleAddBookScreenVisibility();
    const newBookElement = document.querySelector(`.book[data-order-loc="${myBookshelf.indexOf(newBook)}"]`);
    newBookElement.style.borderColor = "pink";
    setTimeout(() => {newBookElement.style.borderColor = "var(--clr-sec-dark)";}, 650);
    setTimeout(() => updateBooksDisplay(), 900);
}

const clearButton = document.querySelector("#clear-shelves-button");
clearButton.addEventListener("click", clearConfirmPrompt, {once: true});
function clearConfirmPrompt(e) {
    clearButton.textContent = "Are you sure?";
    clearButton.addEventListener("click", confirmedClear, {once: true});
    e.stopPropagation();
    window.addEventListener("click", dismissClearPrompt, {once: true});
}
function confirmedClear() {
    clearButton.textContent = "Clear shelves";
    myBookshelf = [];
    updateBooksDisplay();
    clearButton.addEventListener("click", clearConfirmPrompt, {once: true});
    window.removeEventListener("click", dismissClearPrompt, {once: true});

}
function dismissClearPrompt(e) {
    if (e.target != clearButton) {
        clearButton.textContent = "Clear shelves";
        clearButton.addEventListener("click", clearConfirmPrompt, {once: true});
        clearButton.removeEventListener("click", confirmedClear, {once: true});
    }
}
function deleteBook(deleteButton) {
    myBookshelf.splice(deleteButton.dataset.orderLoc, 1);
    updateBooksDisplay();
}
function clearShelves() {
    const shelves = document.querySelectorAll(".shelves");
    shelves.forEach(shelf => {
        const booksOnShelf = document.createRange();
        booksOnShelf.selectNodeContents(shelf);
        booksOnShelf.deleteContents();
    });
}

const sortBtns = document.querySelectorAll(".sort-btn");
sortBtns.forEach(btn => btn.addEventListener("click", (e) => sortBtnPress(e.target)));
function sortBtnPress(sortBtn) {
    if (sortingMethod === sortBtn.value) {
        sortingMethod = `${sortBtn.value}Reversed`;
    } else {
        sortingMethod = sortBtn.value;
    }
    sortBtns.forEach(btn => btn.classList.add("sort-btn-unselected"));
    sortBtn.classList.remove("sort-btn-unselected");
    updateBooksDisplay();
}
function sortBooks() {
    switch(sortingMethod) {
        case "author":
            myBookshelf.sort((x, y) => {
                const xAuthorArray = x.author.split(" ");
                const xLast = xAuthorArray[xAuthorArray.length - 1];
                const yAuthorArray = y.author.split(" ");
                const yLast = yAuthorArray[yAuthorArray.length - 1];
                return xLast > yLast ? 1 : xLast < yLast ? -1 : 0;
            });
            break;
        case "authorReversed":
            myBookshelf.sort((x, y) => {
                const xAuthorArray = x.author.split(" ");
                const xLast = xAuthorArray[xAuthorArray.length - 1];
                const yAuthorArray = y.author.split(" ");
                const yLast = yAuthorArray[yAuthorArray.length - 1];
                return xLast < yLast ? 1 : xLast > yLast ? -1 : 0;
            });
            break;
        case "title":
            myBookshelf.sort((x, y) => {
                const xTitle = removeTheForSorting(x);
                const yTitle = removeTheForSorting(y);
                return xTitle > yTitle ? 1 : xTitle < yTitle ? -1 : 0;
            });
            break;
        case "titleReversed":
            myBookshelf.sort((x, y) => {
                const xTitle = removeTheForSorting(x);
                const yTitle = removeTheForSorting(y);
                return xTitle < yTitle ? 1 : xTitle > yTitle ? -1 : 0;
            });
            break;
        case "hasRead":
        case "pages":
            myBookshelf.sort((x, y) => x[sortingMethod] > y[sortingMethod] ? 1 : x[sortingMethod] < y[sortingMethod] ? -1 : 0);
            break;
        case "hasReadReversed":
        case "pagesReversed":
            const sortingRoot = sortingMethod.slice(0, sortingMethod.indexOf("Reversed"));
            myBookshelf.sort((x, y) => x[sortingRoot] < y[sortingRoot] ? 1 : x[sortingRoot] > y[sortingRoot] ? -1 : 0);
            break;
        default:
            return;
    }
    const sortArrow = document.getElementById("sort-label-icon");
    if (sortingMethod.indexOf("Reversed") != -1) {
        sortArrow.textContent = "north";
    } else {
        sortArrow.textContent = "south";
    }
}
function removeTheForSorting(book) {
    let newTitle = book.title;
    if (newTitle.toLowerCase().indexOf("the") === 0) {
        newTitle = book.title.split(" ");
        newTitle.splice(0, 1);
        newTitle.push(", The");
    }
    return newTitle.toString();
}
/*--CONTROL END--*/

/*--VIEW START--*/
let windowWidth = window.innerWidth;
window.addEventListener("resize", () => {
    if (windowWidth != window.innerWidth) {
        updateBooksDisplay();
        windowWidth = window.innerWidth;
    }
});
window.addEventListener("resize", adjustHeaderStructureForResizing);

function adjustHeaderStructureForResizing() {
    const headerBtnsContainer = document.querySelector(".btns-container");
    const logoContainer = document.querySelector(".logo-container");
    const sortContainer = document.querySelector(".sort-container");

    if (parseInt(getComputedStyle(document.querySelector("header")).height) > 107) {
        logoContainer.append(headerBtnsContainer);
    } else {
        sortContainer.append(headerBtnsContainer);
    }
}
function updateBooksDisplay() {
    currentShelf = 0;
    clearShelves();
    sortBooks();
    for (let i = 0; i < myBookshelf.length; i++) {
        const newBookElement = createBookElement(myBookshelf[i]);
        calculateCurrentShelf(parseInt(newBookElement.style.width) * 10);
        const shelfToUse = document.querySelector(`.shelf${currentShelf}`);
        shelfToUse.appendChild(newBookElement);

        const newBookTitle = document.querySelector(`.book[data-order-loc="${i}"] > .title`);
        shortenText(newBookTitle, newBookElement);
        const newBookAuthor = document.querySelector(`.book[data-order-loc="${i}"] > .author`);
        shortenText(newBookAuthor, newBookElement);
    }

    const allReadToggles = document.querySelectorAll(".read-toggle-icon");
    allReadToggles.forEach(readToggle => readToggle.addEventListener("click", () => toggleReadStyle(readToggle)));
    const allDeleteButtons = document.querySelectorAll(".delete-icon");
    allDeleteButtons.forEach(deleteButton => deleteButton.addEventListener("click", () => deleteBook(deleteButton)));

    localStorage.setItem("storedBookshelf", JSON.stringify(myBookshelf));

    /*const allBookElements = document.querySelectorAll(".book");
    allBookElements.forEach(book => book.addEventListener("touchend", highlightBook));*/
    document.addEventListener("touchend", highlightBook);
}
function highlightBook(e) {
    if (e.target.classList.contains("book")) {
        e.target.style.borderColor = "var(--clr-sec-dark)";
        const bookElement = document.querySelector(`.book[data-order-loc="${e.target.dataset.orderLoc}" > .book-controls`);
        bookElement.style.opacity = "1";
        bookElement.style.background = "rgba(var(--clr-pri-dark-nums), .9)";
    }
}
function shortenText(bookTextElement, bookElement) {
    const bookWidth = parseInt(getComputedStyle(bookElement).width) - 4;
    const textStyle = getComputedStyle(bookTextElement);

    if (parseInt(getComputedStyle(bookTextElement).width) > bookWidth) {
        shrinkText(bookTextElement, textStyle);
    }
    if (parseInt(getComputedStyle(bookTextElement).width) > bookWidth) {
        bookTextElement.style.fontSize = `${parseInt(textStyle.fontSize) / 10 + .25}rem`
        bookTextElement.title = bookTextElement.textContent;
        const newTextArray = bookTextElement.textContent.split(/-| |\./);
        bookTextElement.textContent = newTextArray.map(word => word ? word.charAt(0) + "." : "").join(bookTextElement.classList.contains("title") ? " " : "");

    }
    
    if (bookTextElement.classList.contains("title")) {
        const bookHeight = parseInt(getComputedStyle(bookElement).height);
        let textHeight = parseInt(textStyle.height);
        while (textHeight > bookHeight / 2) {
            shrinkText(bookTextElement, textStyle);
            textHeight = parseInt(getComputedStyle(bookTextElement).height);
        }
    }
}
function shrinkText(bookTextElement, textStyle) {
    const titleFontSize = parseInt(textStyle.fontSize) / 10 - .25;
    bookTextElement.style.fontSize = `${titleFontSize}rem`;
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
    const titleUnderline = document.createElement("div");
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
    const deleteBookIconDiv = document.createElement("div");
    deleteBookIconDiv.dataset.orderLoc = bookIndex;
    deleteBookIconDiv.classList.add("delete-icon");
    const deleteBookIconSpan = document.createElement("span");
    deleteBookIconSpan.classList.add("material-icons-outlined");
    deleteBookIconSpan.textContent = "close_outlined";
    deleteBookIconDiv.append(deleteBookIconSpan);
    bookControls.append(...[readToggle, readToggleIconLabel, deleteBookIconDiv]);
    if (book.pages / 60 < 7) {
        bookControls.style.gap = "0";
    }

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
        const booksOnShelf = document.querySelectorAll(`.shelf${i} > .book`);
        let booksOnShelfWidth = 0;
        let booksGapSum = 0;
        booksOnShelf.forEach(bookElement => {
            const bookWidth = parseInt(getComputedStyle(bookElement).width);
            booksOnShelfWidth += bookWidth;
        });
        if (booksOnShelf.length > 1) {
            booksGapSum = bookGap * (booksOnShelf.length - 1);
        }

        if (newBookWidth < (shelfWidth - (booksOnShelfWidth + booksGapSum + bookGap))) {
            currentShelf = i;
            if (shelves.length >= i + 1 && shelves.length > 3) {
                for (let n = i + 1; n < shelves.length; n++) {
                    document.querySelector(`.shelf${n}`).remove();
                }
            }
            return;
        } else if (i === shelves.length - 1) {
            createShelf(++i);
            currentShelf = i;
            return;
        }
    }
    currentShelf = 0;
}
function createShelf(loc) {
    const newShelf = document.createElement("div");
    newShelf.classList.add("shelves", `shelf${loc}`);
    document.querySelector(".bookshelf-container").append(newShelf);
}
function toggleReadStyle(readToggle) {
    myBookshelf[readToggle.dataset.orderLoc].toggleReadState();
    const bookElement = document.querySelector(`.book[data-order-loc="${readToggle.dataset.orderLoc}"]`);
    bookElement.classList.toggle("read");
    readToggle.classList.toggle("read-toggle-icon-checked");
    localStorage.setItem("storedBookshelf", JSON.stringify(myBookshelf));
}
/*--VIEW END--*/