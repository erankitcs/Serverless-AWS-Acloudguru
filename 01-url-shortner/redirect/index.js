'use strict';

const AWS = require("aws-sdk")
const tableName = process.env['TABLE_NAME']
const docClient = new AWS.DynamoDB.DocumentClient()

module.exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));
    const slug = event.pathParameters.slug;

    docClient.get(
      {
        TableName: tableName,
        Key:{
          slug: slug
        }
      }
    , (err, data) => {
      console.log(data)
      if (err){
        console.log(err)
        return callback(err)
      }
      if (data.Item){
        callback(
          null,
          {
            statusCode: 302,
            body: data.Item.url,
            headers: {
                'Location': data.Item.url,
                'Content-Type': 'text/plain',
            },
          }
        )
      }
      else {
        callback(
          null,
          {
            statusCode: 404,
            body: "This shortened link does not exist, pls recheck entered url.",
            headers: {'Content-Type': 'text/html'},
          }
        )
      }
    } )
}
