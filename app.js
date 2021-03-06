const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var wordArray = [];
var points = 0;


var jsonParser = bodyParser.json({
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/buzzwords', jsonParser, (req, res) => {
  res.json({
    "buzzWords": wordArray,
  });
});


app.route('/buzzWord')
  .post(jsonParser, (req, res) => {
    if (wordArray.indexOf(req.body.buzzWord) !== -1) {
      res.json({
        "success":false
      });
    } else {
      if (wordArray.length < 5) {
        res.json({
          "success":true
        });
        wordArray.push(req.body.buzzWord);
        console.log('this is true ' + wordArray);
      } else {
        res.json({
          "success": false
        });
      }
    }
  })
    .put(jsonParser, (req,res) => {
    if (wordArray.indexOf(req.body.buzzWord) === -1){
      res.json({
        "success":false
      });
      req.body.heard = false;
      console.log(req.body.heard);
    }else{
        points += parseInt(req.body.points);
        console.log(points);
        req.body.heard = true;
        res.json({
          "success":true,
          "newScore": points
        });
        console.log(req.body.heard);
        console.log(req.body);
    }
  })
    .delete(jsonParser, (req,res) => {
  var findWordToDelete = wordArray.indexOf(req.body.buzzWord);
  console.log(findWordToDelete);
  if(wordArray.indexOf(req.body.buzzWord) !== -1){
    res.json({
      "success":true
    });
    wordArray.splice(findWordToDelete,1);
    console.log(wordArray);
  }else{
    res.json({
      "success":false
    });
  }
});

app.post('/reset' , (req,res) => {
  wordArray = [];
  points = 0;
  console.log(wordArray + "you have " + points);
  res.json({
    "success":true
  });
});


app.listen(3000);
