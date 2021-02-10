
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let hasBeenReadString = () => {
            if (!this.read) return "not read yet";
            else return "has been read";
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${hasBeenReadString()}.`
    }
}

let myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    let tempBook = new Book(title, author, pages, read)
    console.log(tempBook.title)
    return myLibrary.push(tempBook);
}

addBookToLibrary("Porry Harter", "J.K. Rolling", 678, false)
addBookToLibrary("Making Music: 74 Creative Strategies for Electronic Music Producers",
        "Dennis DeSantis", 254, true)
addBookToLibrary("Deep Work", "Cal Newport", 423, false)
addBookToLibrary("Happy Feet", "Wizard Man", "420", false)

Book.prototype.toggleRead = function () {
    this.read = !this.read
}




const bookContainer = document.querySelector("#book-container")
let bookRowDivs = []

for (bookIndex = 0; bookIndex < myLibrary.length; bookIndex++){
    bookRowDivs.push(document.createElement('div'))
    bookRowDivs[bookIndex].id = `book-${bookIndex}`
    bookRowDivs[bookIndex].classList.add("book-row")

    function createSpanFromString(text){
        const tempSpan = document.createElement('span');
        tempSpan.textContent = text;
        return tempSpan
    }

    function createBookInfoSpanFromString(text){
        tempSpan = createSpanFromString(text)
        tempSpan.classList.add("book-info")
        return tempSpan
    }

    let currentBook = myLibrary[bookIndex]

    let titleSpan = createBookInfoSpanFromString(currentBook.title);
    let authorSpan = createBookInfoSpanFromString(currentBook.author);
    let pagesSpan = createBookInfoSpanFromString(currentBook.pages);
    let readSpan = createBookInfoSpanFromString(currentBook.read);

    bookRowDivs[bookIndex].appendChild(titleSpan);
    bookRowDivs[bookIndex].appendChild(authorSpan);
    bookRowDivs[bookIndex].appendChild(pagesSpan);
    bookRowDivs[bookIndex].appendChild(readSpan);

    let btnRemove = document.createElement('button');
    btnRemove.classList.add('remove-button');
    btnRemove.dataset.index = bookIndex;
    btnRemove.textContent = "Remove Book"

    let btnToggleRead = document.createElement('button');
    btnToggleRead.classList.add('toggle-read-button');
    btnToggleRead.dataset.index = bookIndex;
    btnToggleRead.textContent = "Toggle Read"

    bookRowDivs[bookIndex].appendChild(btnToggleRead);
    bookRowDivs[bookIndex].appendChild(btnRemove);


    bookContainer.appendChild(bookRowDivs[bookIndex])
}

document.querySelectorAll('.remove-button').forEach(item => {
    item.addEventListener('click', event => {
        myLibrary.splice(item.dataset.index, 1)
        bookRowDivs[item.dataset.index].remove()

    })
})
document.querySelectorAll('.toggle-read-button').forEach(item => {
    item.addEventListener('click', event => {
        let bookIndex = item.dataset.index
        myLibrary[bookIndex].toggleRead()
        let bookReadDiv = bookRowDivs[bookIndex].children.item(3);
        bookReadDiv.textContent = myLibrary[bookIndex].read;
    })
})