// Opening Prompt
document.getElementById('prompt').onclick =  function() {
    var onClick = prompt();
  while (length < 8 || length > 128) {
    length = prompt("Length must be 8-128 characters. How many characters would you like your password to be?");
  }

  // Variables to define prompt options
  var upperCase = confirm("Would you like to use uppercase letters?");
  var lowerCase = confirm("Would you like to use lowercase letters?");
  var numbers = confirm("would you like to use numbers?");
  var symbols = confirm("would you like to use special characters?");

  // Prompts for variables
  while (!(upperCase || lowerCase || numbers || symbols)) {
    alert("You must select at least one character type!");

    upperCase = confirm("Would you like to use uppercase letters?");
    lowerCase = confirm("Would you like to use lowercase letters?");
    numbers = confirm("would you like to use numbers?");
    symbols = confirm("would you like to use special characters?");
  }

  // DOM elements
  const resultEl = document.getElementById('password');

  // Event to click generate button that results in password
  document.getElementById('generate').addEventListener('click', () => {
    resultEl.value = generatePassword(lowercase, upperCase, numbers, symbols, length);
  });
  
  {
    const textarea = document.createElement('password');
    const password = resultEl.value;

    if (!password) {
      return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
  });

// Constant to create random arrangement
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{
    lower
  }, {
    upper
  }, {
    number
  }, {
    symbol
  }].filter(item => Object.values(item)[0]);

  // a loop for different password combinations
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Generator functions
function getRandomLower() {
  return rando("abcdefghijklmnopqrstuvwxyz")
}

function getRandomUpper() {
  return rando("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
}

function getRandomNumber() {
  return rando(9);
}

function getRandomSymbol() {
  return rando('!@#$%^&*(){}[]=<>/,.');
}
