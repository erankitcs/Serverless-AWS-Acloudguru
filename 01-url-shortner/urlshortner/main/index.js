'use strict';

const env_stage = process.env['ENV_STAGE']

const base_page=`<html>
<h1>Hi Ankit...</h1>
  <form method="POST" action="">
    <label for="uri">Link:</label>
    <input type="text" id="link" name="link" size="40" autofocus />
    <br/>
    <br/>
    <input type="submit" value="Shorten it!" />
  </form>
<p>This is ${env_stage} version.</p>
</html>
`
module.exports.handler= (event, context, callback) =>{
  console.log(JSON.stringify(event));
  callback(
    null,
    {
      statusCode: 200,
      body: base_page,
      headers: {'Content-Type': 'text/html'},
    }
  );
}
