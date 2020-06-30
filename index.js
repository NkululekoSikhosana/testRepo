let path = require('path');
let express = require('express');
let app = express();

app.get('/', function(req, res){
res.sendFile(path.join(__dirname, 'index.html'));
});

let port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server running on port", port);
