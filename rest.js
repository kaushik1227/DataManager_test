var express      = require('express'); 
var mysql        = require('mysql');
var http         = require('http');
const bodyParser = require("body-parser");

const app      = express();       // setup the express app
const PORT     = 1227;            // port for the server

var connection = mysql.createConnection({   // mysql database properties
  host     : 'localhost',
  user     : 'root',
  password : 'Password',
  port     : '3306',
  database : 'test09'
});

app.listen(PORT, () =>{           // running the server
  console.log('Magic happening at port 1227');
})

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());


app.get('/sample', (req,res) => {

  const { exec } = require("child_process");
  exec("sh sample_shell.sh", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          res.status(500);
          return;
      }
      res.status(200).send("Sample End point");
      console.log(`stdout: ${stdout}`);
  });
});