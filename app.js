const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.listen(3000);

app.get('/', (req,res) => {
  res.send('hellllo');
});


app.get('/profile/:id', (req,res) => {
  res.send("You requested to see " + req.params.id);
});
app.use(bodyParser.json());
