let input = document.querySelector(".nav__bar-input")
let main = document.querySelector(".main")
let list = document.querySelector(".list")
let pagesNumbers = document.querySelector(".pagesnumbers")
let currentPage = 1;
let rows = 20;




let hpCharacters = [];


input.addEventListener("input", function (e) {
    let serach = e.target.value.toLowerCase()
    let test = hpCharacters.filter((character) => {
        return (character.name.toLowerCase().includes(serach))
    })
    displayCharacters(test);

})

async function getPeople(i) {
    let res = await fetch(`https://swapi.dev/api/people/${i}/`)
    return res.json()
}

for (let i = 1; i < 84; i++) {
    let index = i
    getPeople(index).then(data => {
        hpCharacters.push(data)
        displayCharacters(hpCharacters)
    })
}

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li>
            <h2 class="elm">${character.name}</h2>
            </li>
        `;
        })
        .join('');
    list.innerHTML = htmlString;
};