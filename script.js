const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculatewealthBtn = document.getElementById('calculate-wealth');


let data = [];

getRandomUser();
getRandomUser();
getRandomUser();


// Fetch random user and fetch money

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data1 = await res.json();

    const user = data1.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
}

//Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

//Update DOM
function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// format number as money
function formatMoney(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

// Event Listener add user
addUserBtn.addEventListener('click', getRandomUser);
// Event Listener to Double Money
doubleBtn.addEventListener('click', doubleMoney);
//Event Listener to sort money
sortBtn.addEventListener('click', sortMoney);
//Event Listener to filter millionaire
showMillionairesBtn.addEventListener('click', showmillionaires);
//Event Listener to calculate wealth
calculatewealthBtn.addEventListener('click', calculatewealth);


//sort Money
function sortMoney() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}


//double money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });
    updateDOM();
}

//show millionaires
function showmillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

//calculate wealth
function calculatewealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}