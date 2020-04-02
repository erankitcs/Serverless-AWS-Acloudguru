'use strict';

const AWS = require("aws-sdk")
const querystring = require('querystring');
const path = require('path');
const crypto = require('crypto')
AWS.config.setPromisesDependency(Promise)
const tableName = process.env['TABLE_NAME']
const env_stage = process.env['ENV_STAGE']
const docClient = new AWS.DynamoDB.DocumentClient()

function RenderPage(link, submitted){
  return `
  <html>
  <body>
  <h3>
    <a href="${link}">${link}</a>
  </h3>
  <p> URL ${submitted} was shortened to :
    <a href="${link}">${link}</a>
  </p>
  <p>This is ${env_stage} version.</p>
  </body>
  </html>
  `
}


module.exports.handler = (event, context, callback) =>{

  console.log(JSON.stringify(event));
  const submitted = querystring.parse(event.body).link;
  console.log('URL submitted: ' + submitted);
  const prefix = event.headers.Referer || "http://mysite.com/";
  console.log(`prefix : ${prefix} `);
  return new Promise((resolve, reject) =>{
    resolve(
      crypto.randomBytes(8)
            .toString('base64')
            .replace(/[=+/]/g,'')
            .substring(0,4)
    )
  }).then(slug => {
    console.log(`Trying to save URL ${submitted} slug ${slug} now`)
    return docClient.put({
      TableName: tableName,
      Item:{
        slug: slug,
        url: submitted
      },
      Expected: {
        url: {
          Exists: false
        }
      }

    }
  ).promise().then(()=>{return slug})
}).then((slug) =>{
  console.log('Wow..Its successful.')
  console.log(`Saved to save URL ${submitted} slug ${slug} now`)
  return callback(null,{
    statusCode:200 ,
    body: RenderPage(path.join(String(prefix), String(slug)).replace(':/', '://'), submitted),
    headers:{
       'Content-Type': 'text/html',
    }
  })
}).catch(error =>{
  console.log('Error occurred !!!'+error)
  callback(
    null,
    {
      statusCode: 400,
      body:"Something went wrong, pls try again !!!"
    }
  )
})
}
