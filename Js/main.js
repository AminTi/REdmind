let input = document.querySelector(".nav__bar-input")
let main = document.querySelector(".main")
let list = document.querySelector(".list")
let pagesNumbers = document.querySelector(".pagesnumbers")
let currentPage = 1
let rows = 20

async function getPeople(i) {
    let items = []
    // let res
    for (let i = 1; i <= 83; i++) {
        let res = await fetch(`https://swapi.dev/api/people/${i}/`)
        items.push(res.json())
        console.log("1")
        // return res.json()
    }
    return Promise.all(items)
}

getPeople().then((data) => GetArr(data))

// async function head()
// for (let i = 1; i < 84; i++) {
//     let index = i
//     getPeople(index).then((data) => {
//         items.push(data.name)
//         display(list, items, rows, currentPage)
//         pagination(items, pagesNumbers, rows)
//     })
// }

function display(list, items, rows_per_page, page) {
    list.innerHTML = ""
    page--

    let start = rows_per_page * page
    let end = start + rows_per_page
    let paginatedItems = items.slice(start, end)
    paginatedItems

    for (let i = 0; i < paginatedItems.length; i++) {
        const elm = paginatedItems[i]
        let item_elmment = document.createElement("div")
        item_elmment.classList.add("elm")
        item_elmment.innerText = elm
        list.appendChild(item_elmment)
    }
}

function pagination(items, list, rows) {
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

    if (currentPage == page) btn.classList.add("active")
    btn.addEventListener("click", function (e) {
        currentPage = page
        display(list, items, rows, currentPage)
        let current_btn = document.querySelector(".pagesnumbers button.active")
        current_btn.classList.remove("active")
        btn.classList.add("active")
    })
    return btn
}

let amin = ["amin", "ramy", "marwa"]

console.log(amin)
console.log(items)

function GetArr(items) {
    input.addEventListener("keyup", function (e) {
        let target = e.target.value
        console.log(items)
        let test = items.map(function (value) {
            // return value.toLowerCase().includes(target)
            console.log(value)
        })
        // display(list, test, rows, currentPage)
        // console.log(test)
    })
}
