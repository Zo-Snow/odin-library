const myLibrary = [
    // {id: 0, title: 'MDZS', author: 'Mo Xiang Tong Xiu', pages: 396, status: 'Read'},  
];

const cards = document.querySelector(".cards");
const modal = document.querySelector("dialog");

document.querySelector(".add-button").addEventListener('click', (event) => {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const checkStatus = document.querySelector("#status").checked;
    let status = document.querySelector("#status").checked;

    if (status === true) {
        status = "Status: Read";
    } else {
        status = "Status: Not read yet";
    }

    let newId = myLibrary.length;

    console.log(`${title}, ${author}, ${pages}, ${status}`);
    let newBook = new Book(newId, title, author, pages, status);
    myLibrary.push(newBook);
    document.querySelector("form").reset();
    displayBooks(checkStatus);
    addToggleFunction(newId, title);
    addDeleteFunction(newId, title);
    modal.close();

    event.preventDefault();
})

const addButton = document.querySelector(".new-book-button");

addButton.addEventListener('click' , () => {
    modal.showModal();
})

function Book(id, title, author, pages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addElementProperties(name, className, text, appendTo) {
    name.classList = className;
    name.textContent = text;
    appendTo.appendChild(name);
}

function displayBooks(status) {

    const card = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    const newInput = document.createElement('input');
    const newButton = document.createElement('button');

    myLibrary.forEach((book) => {

        card.setAttribute("id", `card-${book.id}-${book.title}`);
        
        addElementProperties(card, "card", "", cards); 
        addElementProperties(p1, "title", book.title, card);    
        addElementProperties(p2, "author", book.author, card);     
        addElementProperties(p3, "pages", book.pages, card);      
        addElementProperties(p4, "status", book.status, card);
        p4.setAttribute("id", `status-${book.id}-${book.title}`);

        newInput.setAttribute("name", `status-toggle-${book.id}-${book.title}`);
        newInput.setAttribute("type", "checkbox");
        newInput.setAttribute("id", `status-toggle-${book.id}-${book.title}`);
        newInput.setAttribute("aria-label", "toggle read status" ); 
        newInput.setAttribute("class", "toggle-inputs" ); 
        if (status === true) {
            newInput.setAttribute("checked", true); 
        } 
        card.appendChild(newInput);

        newButton.textContent = "Delete";
        newButton.setAttribute("id", `delete-${book.id}-${book.title}`);
        card.appendChild(newButton);
    })
}

function addToggleFunction(id, title) {
    const toggle = document.querySelector(`#status-toggle-${id}-${title}`);

    let currentToggle = toggle.id.slice(14).split("-");
    let neededId = currentToggle[0];
    let neededTitle = currentToggle[1];
    let currentPara = document.querySelector(`#status-${neededId}-${neededTitle}`);

    toggle.addEventListener('click', () => {
    if (toggle.checked === true) {
        currentPara.textContent = "Status: Read";
    } else {
        currentPara.textContent = "Status: Not read yet.";
    }})}

function addDeleteFunction(id, title) {
    const button = document.querySelector(`#delete-${id}-${title}`);
    button.addEventListener('click', (event) => { 

        let currentCard = document.querySelector(`#card-${id}-${title}`);
        currentCard.remove();

        myLibrary.forEach((book) => {
            if (book.id === id && book.title === title) {
                const index = myLibrary.indexOf(book);
                const x = myLibrary.splice(index, 1);
            }
        });
        event.preventDefault();
    })
}

