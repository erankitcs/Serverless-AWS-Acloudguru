'use strict'
module.exports.handler = (event, context, callback) =>{
  console.log(event)
  event.response.autoConfirmUser = true
  return callback(null, event)
}
