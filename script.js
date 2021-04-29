'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// function for show the movements data into data table
const displayMovements = (movements) => {
    containerMovements.innerHTML = '';

    movements.forEach(function(mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
`;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    })
}

displayMovements(account1.movements);

// function for show the total balance of account
const calcPrintAmount = (movements) => {
    const balance = movements.reduce((accu, currentValue) => {
        return accu + currentValue
    }, 0)
    labelBalance.textContent = `${balance} €`
}

calcPrintAmount(account1.movements)


const calcDisplaySummary = function(movements) {
    const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
    labelSumIn.textContent = `${incomes}€`

    const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
    labelSumOut.textContent = `${Math.abs(out)}€`

    const interest = movements.filter(mov => mov > 0).map(deposit => (deposit * 1.2/100)).filter((int, i, arr) => {
        return int >= 1
    }).reduce((acc, int) => acc + int, 0)
    labelSumInterest.textContent = interest
}

calcDisplaySummary(account1.movements)


// function for create the username from given data
const createUsernames = (accs) => {
    accs.forEach(function(acc) {
        acc.username = acc.owner.toLowerCase().split(' ').map((name) => {
            return name[0]
        }).join('')
    })
}
createUsernames(accounts)


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);


/////////////////////////////////////////////////

// Slice Method

// let arr = ['a', 'b', 'c', 'd', 'e']

// console.log(arr.slice(2))
// console.log(arr.slice(2, 4))
// console.log(arr.slice(-2))

// console.log([...arr])

// // splice method

// console.log(arr.splice(2))
// console.log(arr)

// const newArray = ['n', 'h', 't', 'o', 'p']
// //console.log(newArray.sort())
// //console.log(newArray)

// const letters = arr.concat(newArray)
// console.log(letters.sort())

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //for(const movement of movements) {
//   for (const [i, movement] of movements.entries()){
//   if(movement > 0) {
//     console.log(`Movement ${i + 1} Your despoited ${movement}`)
//   } else {
//     console.log(`Movement ${i + 1} You withdraw ${Math.abs(movement)}`)
//   }
// }
// console.log('---------------------')
// movements.forEach(function (movement, index) {
//   if(movement > 0) {
//     console.log(`Movement ${index + 1} Your despoited ${movement}`)
//   } else {
//     console.log(`Movement ${index + 1} You withdraw ${Math.abs(movement)}`)
//   }
// })

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value, key, map) {
//   console.log(`${key} : ${value}`)
// })

// const euruToUSD = 1.12

// const allMovements = movements.map((movement, index) => {
// return Math.floor(movement * euruToUSD)
// })
// console.log(movements)
// console.log(allMovements)

// const moveMovementsToUSD = []

// for (const move of movements) {
//   moveMovementsToUSD.push(move * euruToUSD)
// }

// console.log(moveMovementsToUSD)

// movements.map((moving, i) => {
//   if(moving > 0) {
//     console.log(`Movement ${i + 1} : You deposited ${moving}`)
//   } else {
//     console.log(`Movement ${i + 1} : You withdrawal ${moving}`)
//   }
// })

// const deposits = movements.filter(function(mov) {
//   return mov > 0
// })

// console.log(movements)
// console.log(deposits)

// console.log(movements)

// const balance = movements.reduce(function(accu, currentValue, index, array) {
//     console.log(`Iteration : ${index} -> ${accu} `)
//     return accu + currentValue
// })

// console.log(balance)

// let balanceTwo = 0;
// for (const moc of movements) {
//     balanceTwo += moc
// }

// console.log(balanceTwo)

// get the maximum value of an array
const maximumValue = movements.reduce(function(accum, currentVal) {
    if (accum > currentVal)
        return accum
    else return currentVal
}, movements[0])

console.log(maximumValue)

console.log(movements)

// PIPELINE
const euruToUSD = 1.1
const totalDepositsUSD = movements.filter( mov => mov > 0).map(mov => mov * euruToUSD).reduce((acc, mov) => acc + mov, 0)
console.log(totalDepositsUSD)

const firstWithdrawal = movements.filter((mov => mov < 0))
console.log(firstWithdrawal)

console.log(accounts)

const account = accounts.find((acc => acc.owner === "Jessica Davis"))
console.log(account)