'use strict';

// PART 1: SHOW A FORTUNE

function showFortune() {
    fetch('/fortune')
    .then((response) => response.text())
    .then((responseData) => {
      document.querySelector('#fortune-text').innerHTML = responseData;
    });

}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  fetch(`${url}?zipcode=${zipcode}`)
  .then((response) => response.json())
  .then((responseData) => {
    console.log(responseData)
    document.querySelector('#weather-info').innerHTML = responseData['forecast'];
  });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.getElementById('melon-type-field').value,
    qty: document.getElementById('qty-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },

  })
    .then((response) => response.json())
    .then((responseJson) => {     
      
      // put const and if else for error message

      document.querySelector('#order-status').innerHTML = responseJson['msg'];
      // document.querySelector('#order-status').insertadjacentHTML('afterbegin', responseJson['code'])

      document.querySelector('#order-status')
      .classList.add('.order-error');
    });
    


    
 
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
