var express = require('express');
var router = express.Router();
var { CookiejarClient } = require('./CookiejarClient');
// var fs = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'KBA' });
});

router.get('/bake', function (req, res) {
  res.render('Bake');
});

router.get('/eat', function (req, res) {
  res.render('Eat');
});

router.get('/count', function (req, res) {
  res.render('Count');
});

router.get('/home', function (req, res) {
  res.render('Home', { title: 'Sawtooth' });
});

router.post('/', function (req, res) {
  var Key = req.body.privateKey;
  var cookiejar_client = new CookiejarClient(Key);  //?
  res.send({ done: 1, privatekey: Key, message: "Your private key is " + Key });
});


router.post('/bake', function (req, res) {
  var count = req.body.cookie;
  var pri_key = req.body.pri_key;
  var cookiejar_client = new CookiejarClient(pri_key);
  var action = "bake";
  cookiejar_client.send_data(action, count);
  res.send({ message: "Bake " + count + " cookies request sent" });
});

router.post('/eat', function (req, res) {
  var count = req.body.cookie;
  var pri_key = req.body.pri_key;
  var cookiejar_client = new CookiejarClient(pri_key);
  var action = "eat";
  cookiejar_client.send_data(action, count);
  res.send({ message: "Eat " + count + " cookies request sent" });
});

router.post('/count', function (req, res) {
  var pri_key = req.body.pri_key;
  const cookiejar_client = new CookiejarClient(pri_key);
  const cookieCount = cookiejar_client._get_cookie_count();
  cookieCount.then(function (result) { res.send({ count: result }); });
})
module.exports = router;
