const myLibrary = [];

const addButton = document.querySelector(".add-button");
const newBookButton = document.querySelector(".new-book-button");

newBookButton.addEventListener('click', (event) => {
    const dialog = document.querySelector("dialog");
    dialog.showModal()
})

addButton.addEventListener('click', (event) => {
    const [ title, author, pages, status ] = getDetails();

    if (title != "" && author && pages != "" && parseInt(pages) < 10000) {
       addBookToLibrary();
       displayBooks(); 
    }
})

checkEmpty();

function checkEmpty() {
    const emptyDiv = document.querySelector(".empty");
    if (myLibrary.length === 0) {
        emptyDiv.removeAttribute("hidden");
    } else {
        emptyDiv.setAttribute("hidden", true);
    }
}

function Book(title, author, pages, status) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status
  }

function getDetails() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const status = document.querySelector("#status").checked;
    return [title, author, pages, status];
}
  
function addBookToLibrary() {
      const [ title, author, pages, status ] = getDetails();
      const newBook = new Book(title, author, pages, status);
      myLibrary.push(newBook);
}

function addToggleFunction() {
    const buttons = document.querySelectorAll(".toggle-button");
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            myLibrary[index].status = !myLibrary[index].status;
            displayBooks();
        })
    })
}

function addDeleteFunction() {
    const buttons = document.querySelectorAll(".delete");
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        })
    })
}

function displayBooks() {
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";

    myLibrary.forEach((book, index) => {
        let card = document.createElement('div');
        card.classList = "card"; 
        card.innerHTML = `
        <p class="title">${book.title}</p>
        <p class="author">by ${book.author}</p>
        <p class="pages">Pages: ${book.pages}</p>
        <div class="status-row">
          <p class="status">Status: ${book.status ? "Read" : "Not read yet"}</p>
          <button class="toggle-button" style="background-color: ${book.status ? "rgb(133, 230, 133);" : "rgb(234, 95, 95);"}"></button>
        </div>
        <button class="delete">Delete</button>
        `;
        cards.appendChild(card);
    })
    addToggleFunction();
    addDeleteFunction();
    checkEmpty();
}

