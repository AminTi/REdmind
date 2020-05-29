let input = document.querySelector(".nav__bar-input")
let main = document.querySelector(".main")
let list = document.querySelector(".list")
let pagesNumbers = document.querySelector(".pagesnumbers")

let currentPage = 1;
let rows = 20;

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


    })
}



function display(list, items, rows_per_page, page) {
    list.innerHTML = ""
    page--

    let start = rows_per_page * page
    let end = start + rows_per_page
    let paginatedItems = items.slice(start, end)
    paginatedItems

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
        currentPage = page
        display(list, items, rows, currentPage)
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
    let names = input.value
    hide(namess)

    getCountry(names).then(data => {
        newData = data.results

        let result = newData.map(a => a.name);
        display(list, result, rows, currentPage)

    })
})


function hide(names) {
    if (names.length > 1) {
        pagesNumbers.style.display = "none"
    } else if (names.length < 1) {
        pagesNumbers.style.display = "block"
    }
}