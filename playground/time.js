const moment = require('moment');

// const date = new Date();
// var months = ['Jan','Feb']
// console.log(date.getMonth());

var date = new moment();
// date.add(100,'years').subtract(9,'months')
// date.add(10,'hour')
console.log(date.format('h:mm a'));