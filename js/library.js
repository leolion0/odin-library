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
        return `${this.title} by ${this.author}, ${this.pages} pages,
                 ${hasBeenReadString()}.`
    }
}

let myLibrary = {};

function addBookToLibrary(title, author, pages, read) {
    let tempBook = new Book(title, author, pages, read)
    myLibrary[tempBook.title] = tempBook;
}

addBookToLibrary("Porry Harter", "J.K. Rolling", 678, false)
addBookToLibrary(
        "Making Music: 74 Creative Strategies for Electronic Music Producers",
        "Dennis DeSantis", 254, true)
addBookToLibrary("Deep Work", "Cal Newport", 423, false)
addBookToLibrary("Happy Feet", "Wizard Man", "420", false)

Book.prototype.toggleRead = function () {
    this.read = !this.read
}




const bookContainer = document.querySelector("#book-container")
let rowObj = {}


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

function addBookToRows(book){
    let curTitle = book.title
    
    rowObj[curTitle] = document.createElement('div');

    rowObj[curTitle].classList.add("book-row")
    rowObj[curTitle].dataset.title = book.title




    let titleSpan = createBookInfoSpanFromString(book.title);
    let authorSpan = createBookInfoSpanFromString(book.author);
    let pagesSpan = createBookInfoSpanFromString(book.pages);
    let readSpan = createBookInfoSpanFromString(book.read);

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

for (let prop in myLibrary)
    {
        addBookToRows(myLibrary[prop])
    }



document.addEventListener('click', function(e){
    if (e.target && e.target.className.includes("remove-button")){

        let bookTitle = e.target.parentElement.dataset.title;
        delete myLibrary[bookTitle]
        rowObj[bookTitle].remove()
        delete rowObj[bookTitle]
    }
})
    


document.addEventListener('click', function(e){
    if (e.target && e.target.className.includes("toggle-read-button")){

    let bookTitle = e.target.parentElement.dataset.title;

    let bookReadDiv = rowObj[bookTitle].children.item(3);
    myLibrary[bookTitle].toggleRead()
    bookReadDiv.textContent = myLibrary[bookTitle].read;
    }
})


let bookAddButton = document.querySelector("#new-book-button")
bookAddButton.addEventListener('click', event =>{
    if (bookAddButton.dataset.open == "true") return;
    bookAddButton.dataset.open = "true"
    let bookAddForm = document.createElement('form');
    bookAddForm.id = "add-form"
    let titleObj = createFormField("title", 'text', "Book title:")
    let authorObj = createFormField("author", 'text', "Author:")
    let pagesObj = createFormField("pages", 'text', "Page count:")
    let readObj = createFormField("read-status", 'checkbox', "Has been read?")


    appendFormField(bookAddForm, titleObj)
    appendFormField(bookAddForm, authorObj)
    appendFormField(bookAddForm, pagesObj)
    appendFormField(bookAddForm, readObj)
    let confirmButton = document.createElement('button')
    confirmButton.id = "confirm-button"
    confirmButton.type = 'button'
    let cancelButton = document.createElement('button')
    cancelButton.id = "cancel-button"
    cancelButton.type = 'button'

    confirmButton.textContent = "Confirm"
    cancelButton.textContent = "Cancel"

    bookAddForm.appendChild(confirmButton)
    bookAddForm.appendChild(cancelButton)


    let tempFix = document.querySelector("#temp-fix")

    toggleAddBook()
    document.querySelector('#new-book-container').insertBefore(bookAddForm, tempFix)
    bookAddButton.dataset.open 
})
document.addEventListener('click', function(e){
    if (e.target && e.target.id == "cancel-button"){
        document.querySelector("#add-form").remove()
        document.querySelector("#new-book-button").dataset.open = "false"
        toggleAddBook()
    }
})



document.addEventListener('click', function(e){
    if (e.target && e.target.id == "confirm-button"){
        console.log(myLibrary);
        let inputElements = {
            'title':document.getElementById("title"),
            'author':document.getElementById("author"),
            'pages':document.getElementById("pages"),
            'read-status':document.getElementById("read-status")
        }
        let bookTitle = inputElements['title'].value;

        let bookAuthor = inputElements['author'].value;
        let bookPages = parseInt(inputElements['pages'].value, 10);
        let readStatus = inputElements['read-status'].checked;

        addBookToLibrary(bookTitle, bookAuthor, bookPages, readStatus);
        addBookToRows(myLibrary[bookTitle])

        document.querySelector("#add-form").remove()
        document.querySelector("#new-book-button").dataset.open = "false"
        toggleAddBook()

    }
})


function createFormField(name, type, labelText) {
    let tempLable = document.createElement('label')
    tempLable.setAttribute('for', name);
    tempLable.textContent = labelText;
    tempLable.classList.add('new-book-label')

    let tempInput = document.createElement('input')
    tempInput.type = type
    tempInput.id = name;
    tempInput.name = name;
    tempInput.classList.add('new-book-input')
    return {label: tempLable, input: tempInput}
}

function appendFormField(parent, comboObj) {
    parent.appendChild(comboObj.label);
    parent.appendChild(comboObj.input)
}

function toggleAddBook(){
    let bookAddButton = document.querySelector("#new-book-button");
    if (bookAddButton.style.display === "none") {
      bookAddButton.style.display = "block";
    } else {
      bookAddButton.style.display = "none";
    }
}