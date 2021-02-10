function log (input) {
    return console.log(input)
}


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

let myLibrary = {};

function addBookToLibrary(title, author, pages, read) {
    let tempBook = new Book(title, author, pages, read)
    myLibrary[tempBook.title] = tempBook;
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
let rowObj = {}

for (let prop in myLibrary)
    {
        let currentBook = myLibrary[prop]
        let curTitle = currentBook.title
        
        rowObj[curTitle] = document.createElement('div');

        rowObj[curTitle].classList.add("book-row")
        rowObj[curTitle].dataset.title = currentBook.title
    
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
    
    
        let titleSpan = createBookInfoSpanFromString(currentBook.title);
        let authorSpan = createBookInfoSpanFromString(currentBook.author);
        let pagesSpan = createBookInfoSpanFromString(currentBook.pages);
        let readSpan = createBookInfoSpanFromString(currentBook.read);

        rowObj[curTitle].appendChild(titleSpan);
        rowObj[curTitle].appendChild(authorSpan);
        rowObj[curTitle].appendChild(pagesSpan);
        rowObj[curTitle].appendChild(readSpan);
    
        let btnRemove = document.createElement('button');
        btnRemove.classList.add('remove-button', 'book-info');
        btnRemove.textContent = "Remove Book"
    
        let btnToggleRead = document.createElement('button');
        btnToggleRead.classList.add('toggle-read-button', 'book-info');
        btnToggleRead.textContent = "Toggle Read"
    
        rowObj[curTitle].appendChild(btnToggleRead);
        rowObj[curTitle].appendChild(btnRemove);
    
    
        bookContainer.appendChild(rowObj[curTitle])
    }



document.querySelectorAll('.remove-button').forEach(item => {
    item.addEventListener('click', event => {
        let bookTitle = item.parentElement.dataset.title;
        delete myLibrary[bookTitle]
        rowObj[bookTitle].remove()
        delete rowObj[bookTitle]


    })
})
document.querySelectorAll('.toggle-read-button').forEach(item => {
    item.addEventListener('click', event => {
        let bookTitle = item.parentElement.dataset.title;

        let bookReadDiv = rowObj[bookTitle].children.item(3);
        myLibrary[bookTitle].toggleRead()
        bookReadDiv.textContent = myLibrary[bookTitle].read;
    })
})