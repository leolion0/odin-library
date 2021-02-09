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

const newBook = new Book("Happy Feet", "Wizard Man", "420", false);
console.log(newBook.info())