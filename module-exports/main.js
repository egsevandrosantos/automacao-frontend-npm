const plugin = require('./plugin');
const moment = require('moment');

console.log(plugin.imc(70, 1.6));
console.log(plugin.quadrado(5));

console.log(moment().endOf('day').fromNow());
