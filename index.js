let path = require('path');
let express = require('express');
let app = express();
let db = require('./db.js')

app.get('/', function(req, res){
res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/database', function (req, res) {
// Make a query to the database
db.pools
// Run query
.then((pool) => {
return pool.request()
// This is only a test query, change it to whatever you need
.query('SELECT 1')
})
// Send back the result
.then(result => {
res.send(result)
})
// If there's an error, return that with some description
.catch(err => {
res.send({
Error: err
})
})
})

// Get from database as JSON
app.get('/api/index', (req, res) => {
  const sqlQuery = `SELECT * FROM dbo.Bills`
  db.pools
      .then((pool) => {
        return pool.request()
          .query(sqlQuery)
      })
      .then(result => {
        res.json(result.recordset)
      })
      .catch(err => {
        res.json({ Error: err })
      })
})

let port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server running on port", port);
