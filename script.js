'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-05-01T23:36:17.929Z',
    '2021-05-03T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];


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



// function for display date and time

const formatMovementDate = function(date) {

  var calcDayPassed = (date1, date2) => Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const dayPassed = calcDayPassed(new Date, date);
  console.log(dayPassed);

  if (dayPassed === 0) return 'Today';
  if (dayPassed === 1) return 'Yesterday';
  if (dayPassed <= 7) return `${dayPassed} days ago`;

  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth()}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}


// function for show the movements data into data table
const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements


  movs.forEach(function(mov, i) {

    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${mov.toFixed(2)}€</div>
        </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}

// function for show the total balance of account
const calcPrintAmount = (acc) => {
  acc.balance = acc.movements.reduce((accu, currentValue) => {
    return accu + currentValue
  }, 0)

  labelBalance.textContent = `${acc.balance.toFixed(2)} €`
}


const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${out.toFixed(2)}€`

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate / 100)).filter((int, i, arr) => {
    return int >= 1
  }).reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`
}


// function for create the username from given data
const createUsernames = (accs) => {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map((name) => {
      return name[0]
    }).join('')
  })
}
createUsernames(accounts)


//Update UI

const updatUI = function(acc) {
  //Display movements
  displayMovements(acc);
  // Display balance
  calcPrintAmount(acc)
  // Display summary
  calcDisplaySummary(acc);
}


const startLogOutTimer = function() {

  const tickTimer = function() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // print remaining time on UI
    labelTimer.textContent = `${min}:${sec}`;

    // stop timer when reach at 0 and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
      alert(`Due to security reasons, you can't login into Application more than 2 minutes!`)
    }

    // decrease time one second each

    time--;

  }
  // set time to 5 minutes
  let time = 120;

  // call timeer on each second
  tickTimer();
  const timer = setInterval(tickTimer, 1000);

  return timer;
}

// event listner

let currentAccount, timer;


// Fake always logged In

// currentAccount = account1;
// updatUI(currentAccount);
// containerApp.style.opacity = 100;


btnLogin.addEventListener('click', function(e) {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // show current date and time for logged in user
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth()}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //timer
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();

    updatUI(currentAccount);

  } else {
    alert('Please enter correct details for login into your account!');
  }

  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();
})


// transfer the amount

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && recieverAccount && currentAccount.balance >= amount && recieverAccount?.username !== currentAccount.username) {

    // doing the transfer
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);

    // add transfer date 
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updatUI(currentAccount);

    // reset the timer
    clearInterval(timer);
    timer = startLogOutTimer();

  }
})


btnLoan.addEventListener('click', function(e) {
  e.preventDefault()

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

    // add movement
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      // update UI

      updatUI(currentAccount);
      // reset the timer
      clearInterval(timer);
      timer = startLogOutTimer();

      inputLoanAmount.value = '';
    }, 3000)
  }
})

btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {

    const index = accounts.findIndex((acc) => acc.username === currentAccount.username);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = '';
  } else {
    alert('Username or Password is mismatched! Please check again');
  }

});

// sort the data

let sorted = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(acc.movements, !sorted);

  sorted = !sorted;
})

// // var calcDayPassed = (date1, date2) => Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

// // var totalDaysBetween = calcDayPassed(new Date(2020, 3, 3), new Date(2021, 1, 2));
// // console.log(totalDaysBetween);

// const ingradients = ['olives', 'cheez', ''];

// const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your Pizz with ${ing1} and ${ing2}`), 3000, ...ingradients)

// if (ingradients.includes('spinach')) {
//   clearTimeout(pizzaTimer);
// }


// // set TimeInterval

// // setInterval(() => {
// //     const currentDate = new Date();
// //     console.log(currentDate)
// // }, 1000)