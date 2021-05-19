// getting current date
var currentDate = moment().format('dddd, MMMM Do');

// updated current date in page
var currentDateEl = document.querySelector("#currentDay");
currentDateEl.innerHTML = currentDate;