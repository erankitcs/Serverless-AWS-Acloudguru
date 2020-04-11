'use strict'
const graphql = require('graphql')
const schema = require('./lib/schema')

function runQuery(query, claims, variables){
  //return graphql.graphql(schema.Schema,query, {claims: claims}, null, variables)
  if (claims === null) {
   return graphql.graphql(schema.PublicSchema, query, {}, null, variables)
 }
 return graphql.graphql(schema.Schema, query, {claims: claims}, null, variables)
}

module.exports.handler = (event, context, cb) => {
  console.log('Recieved event',JSON.stringify(event))
  var userInfo = null;
  if (event.requestContext.authorizer) {
        userInfo = event.requestContext.authorizer.claims
    }
  const request = JSON.parse(event.body)
  console.log('Query: '+ JSON.stringify(request.query))
  console.log('Variables: '+ JSON.stringify(request.variables))

  return runQuery(request.query, userInfo , request.variables )
          .then(response =>{
            console.log(response)
            const respified = {
              statusCode: 200,
              headers: { 'Access-Control-Allow-Origin': '*' },
              body: JSON.stringify(response)
            }
            console.log('Built response')
            console.log(respified)
            return respified
          })
          .then(response => cb(null, response))
          .catch(err => cb(err))
}
