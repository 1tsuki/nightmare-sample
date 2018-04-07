var Nightmare = require('nightmare');
var vo = require('vo');
var config = require('./config.json');

vo(function* () {
  var nightmare = Nightmare({ show: true });
  var link = yield nightmare
	  .goto('https://vu.sfc.keio.ac.jp/sfc-sfs/')
		.type('input[name="u_login"]', config.account)
    .type('input[name="u_pass"]', config.password)
		.click('input[type="submit"]')
		.wait(1000)
    .click('.navi01 a')
    .wait(5000)
	yield nightmare.end();
})(function (err, result) {
  if (err) return console.log(err);
  console.log(result);
});


var Nightmare = require('nightmare');
var vo = require('vo');

vo(function* () {
  var nightmare = Nightmare({ show: false });
  var classes = yield nightmare
    .goto('https://vu.sfc.keio.ac.jp/sfc-sfs/')
    .type('input[name="u_login"]', config.account)
    .type('input[name="u_pass"]', config.password)
    .click('input[type="submit"]')
    .wait(1000)
    .click('.navi01 a') // 授業ページ
		.evaluate(function () {
			return document.querySelector('body > table:nth-child(3) > tbody > tr > td:nth-child(3) > table > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(1)').textContent;
		});
	yield nightmare.end();
  return classes;
})(function (err, result) {
  if (err) return console.log(err);
  console.log(result);
});
