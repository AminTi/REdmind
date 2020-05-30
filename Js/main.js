let input = document.querySelector(".nav__bar-input")
let main = document.querySelector(".main")
let list = document.querySelector(".list")
let pagesNumbers = document.querySelector(".pagesnumbers")
let popUp_list = document.querySelector(".popUp_list")

let currentPage = 1;
let rows = 10;

async function getPeople(i) {
    let res = await fetch(`https://swapi.dev/api/people/${i}/`)
    return res.json()
}

let items = []
for (let i = 1; i < 84; i++) {
    let index = i
    getPeople(index).then(data => {
        items.push(data.name)
        display(list, items, rows, currentPage)
        pagination(items, pagesNumbers, rows)
        popUp(data)
    })
}

function display(list, items, rows_per_page, page) {
    list.innerHTML = ""
    page--

    let start = rows_per_page * page
    let end = start + rows_per_page
    let paginatedItems = items.slice(start, end)

    for (let i = 0; i < paginatedItems.length; i++) {
        const elm = paginatedItems[i];
        let item_elmment = document.createElement('div')
        item_elmment.classList.add('elm')
        item_elmment.innerText = elm
        list.appendChild(item_elmment)
    }
}

function pagination(items, list, rows, ) {
    list.innerHTML = ""
    let countPage = Math.ceil(items.length / rows)
    for (let i = 1; i < countPage + 1; i++) {
        let btns = padinationBtn(i, items)
        btns.classList.add("btns")
        list.appendChild(btns)

    }
}

function padinationBtn(page, items) {
    let btn = document.createElement("button")
    btn.innerText = page
    if (currentPage == page)
        btn.classList.add('active')
    btn.addEventListener("click", function (e) {
        page = e.target.innerHTML
        display(list, items, rows, page)
        let current_btn = document.querySelector(".pagesnumbers button.active")
        current_btn.classList.remove("active")
        btn.classList.add("active")
    })
    return btn
}

async function getCountry(names) {
    let res = await fetch(`https://swapi.dev/api/people/?search=${names}`)
    return res.json()
}

input.addEventListener("input", function (e) {
    let names = e.target.value
    getCountry(names).then(data => {
        newData = data.results
        let result = newData.map(a => a.name);

        if (names.length > 0) {
            pagesNumbers.style.display = "none"
            display(list, result, rows, currentPage)
            popUp(data)
            notFound(result)

        } else {
            pagesNumbers.style.display = "block"
            display(list, items, rows, currentPage)
            popUp(data)
        }
    })
})

let arr = []

function popUp(data) {
    let elm = Array.from(document.querySelectorAll(".elm"))
    arr.push(data)
    for (let i = 0; i < elm.length; i++) {
        const am = elm[i];
        am.addEventListener("click", function (e) {
            list.style.display = "none"
            pagesNumbers.style.display = "none"
            popUp_list.innerHTML = `<div class="modal"><button class="btnModal">X</button>
            <h3 class="charachersName">${arr[i].name}</h3>
            <span class="charachers"> Height: ${arr[i].height}</span>
            <span class="charachers"> Mass: ${arr[i].mass}</span>
            <span class="charachers"> Gender: ${arr[i].gender}</span>
            span> class="charachers" birth_year: ${arr[i].birth_year}</span>
            <span class="charachers"> eye_color: ${arr[i].eye_color}</span>
            <span class="charachers"> skin_color: ${arr[i].skin_color}</span>
            </div>`

            popUpClose()
        })
    }
}

function popUpClose() {
    let btnModal = document.querySelector(".btnModal")
    let modal = document.querySelector(".modal")
    btnModal.addEventListener("click", function (e) {
        modal.style.display = "none"
        list.style.display = "block"
        list.style.display = "flex"
        pagesNumbers.style.display = "block"
    })
}


function notFound(result) {
    if (result.length == 0) {
        popUp_list.innerHTML = ""
        popUp_list.innerHTML = `<h2 class="notfound">Nothing Find</h2>`
        notfound.style.display = "none"
    } else {
        let notfound = document.querySelector(".notfound")
        notfound.style.display = "none"
    }
}