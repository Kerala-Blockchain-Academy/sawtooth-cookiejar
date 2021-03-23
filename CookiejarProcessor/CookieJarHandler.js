'use strict'

//require the handler module.
const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')
const { createHash } = require('crypto');
const { TextEncoder, TextDecoder } = require('text-encoding/lib/encoding')

function hash(v) {
  return createHash('sha512').update(v).digest('hex');
}

var encoder = new TextEncoder('utf8');
var decoder = new TextDecoder('utf8');

const CJ_FAMILY = 'cookiejar';
const CJ_NAMESPACE = hash(CJ_FAMILY).substring(0, 6);

//function to display the errors
var _toInternalError = function (err) {
  console.log(" in error message block");
  var message = err.message ? err.message : err;
  throw new InternalError(message);
};

//function to set the entries in the block using the "SetState" function
const _setEntry = function (context, address, stateValue) {
  let dataBytes = encoder.encode(stateValue)
  let entries = {};
  entries[address] = dataBytes;
  return context.setState(entries)
}


class CookieJarHandler extends TransactionHandler {
  constructor() {
    super(CJ_FAMILY, ['1.0'], [CJ_NAMESPACE])
  }
  apply(transactionProcessRequest, context) {

    try {
      console.log('trasactionProcessRequest=', transactionProcessRequest);
      const payload = decoder.decode(transactionProcessRequest.payload);
      let payloadData = payload.toString().split(',');
      var header = transactionProcessRequest.header;
      var userPublicKey = header.signerPublicKey;
      var Address = hash(CJ_FAMILY).substr(0, 6) + hash(userPublicKey).substr(0, 64);
      var action = payloadData[0];
      var quantity = payloadData[1];

      // Select the action to be performed
      if (action === 'bake') {

        return context.getState([Address]).then(function (stateKeyValueAddress) {
          console.log("State Address value", JSON.stringify(stateKeyValueAddress));
          var previous_data = 0;
          previous_data = stateKeyValueAddress[Address];
          if (previous_data == '' || previous_data == null) {
            console.log("No previous cookies, creating new cookie jar");
            var newCount = parseInt(quantity);
          }
          else {
            var count = 0;
            count = parseInt(decoder.decode(previous_data));
            var newCount = count + parseInt(quantity);
            console.log("new cookiejar count is :" + newCount);
          }
          var strNewCount = newCount.toString();
          return _setEntry(context, Address, strNewCount);
        });
      }
      else if (action === 'eat') {

        return context.getState([Address]).then(function (stateKeyValueAddress) {
          console.log("State Address value", JSON.stringify(stateKeyValueAddress));
          var previous_data = 0;
          previous_data = stateKeyValueAddress[Address];
          if (previous_data == '' || previous_data == null) {
            throw new InvalidTransaction("No previous cookies, Eat function not possible");
          }
          else {
            var count = 0;
            count = decoder.decode(previous_data);
            count = parseInt(count);
            if (quantity > count) {
              throw new InvalidTransaction("Not enough cookies to eat.The number should be lesser or equal to " + count);
            }
            else {
              var newCount = count - parseInt(quantity);
            }
            console.log("new cookiejar count is :" + newCount);
          }
          var strNewCount = newCount.toString();
          return _setEntry(context, Address, strNewCount);
        });
      } else {
        throw new InvalidTransaction('Action must be bake or eat ');
      }
    }
    catch (err) {
      _toInternalError(err);
    }
  }
}

module.exports = CookieJarHandler

