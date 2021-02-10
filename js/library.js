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

console.log(myLibrary[3].info())

const bookContainer = document.querySelector("#book-container")

let booksArray = []
myLibrary.forEach(element => {
    let index = booksArray.push(document.createElement('div')) - 1
    booksArray[index].id = `book-${index}`
    booksArray[index].classList.add("book-row")

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

    let currentBook = myLibrary[index]
    console.log(currentBook.title)
    let titleSpan = createBookInfoSpanFromString(currentBook.title);
    console.log(titleSpan)
    let authorSpan = createBookInfoSpanFromString(currentBook.author);
    let pagesSpan = createBookInfoSpanFromString(currentBook.pages);
    let readSpan = createBookInfoSpanFromString(currentBook.read);

    booksArray[index].appendChild(titleSpan);
    booksArray[index].appendChild(authorSpan);
    booksArray[index].appendChild(pagesSpan);
    booksArray[index].appendChild(readSpan);


    bookContainer.appendChild(booksArray[index])
    
});
