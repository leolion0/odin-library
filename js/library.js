function Book(title, author, pages, read) {
    title,
    author,
    pages,
    read,
    this.info = function() {
        let hasBeenReadString = () => {
            if (!read) return "not read yet";
            else return "has been read";
        }
        return `${title} by ${author}, ${pages} pages, ${hasBeenReadString()}.`
    }
}
let myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    return myLibrary.push(new Book(title, author, pages, read));
}
addBookToLibrary("Porry Harter", "J.K. Rolling", 678, false)
addBookToLibrary("Making Music: 74 Creative Strategies for Electronic Music Producers",
        "Dennis DeSantis", 254, true)
addBookToLibrary("Deep Work", "Cal Newport", 423, false)
addBookToLibrary("Happy Feet", "Wizard Man", "420", false)

console.log(myLibrary[3].info())
