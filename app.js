require('dotenv').config();

const express = require("express");
const https = require('https');
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(express.json());

app.get('/', (req, res) => {
  // res.render("index");
  const url = 'https://api.giphy.com/v1/gifs/trending?api_key=' + process.env.API_KEY + '&limit=3';
  https.get(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      const trendData = JSON.parse(data);
      const trendGif1 = trendData.data[0].images.original.url;
      const trendGif2 = trendData.data[1].images.original.url;
      const trendGif3 = trendData.data[2].images.original.url;
      const link1 = trendData.data[0].url;
      const link2 = trendData.data[1].url;
      const link3 = trendData.data[2].url;
      res.render('index', {
        trend1: trendGif1,
        trend2: trendGif2,
        trend3: trendGif3,
        link1: link1,
        link2: link2,
        link3: link3,
      });
    });
  }).on('error', (err) => {
    console.log('Error: ' + err.message);
  });

});
// const gif = '';
app.post('/', (req, res) => {

  const inputSearch = req.body.search;
  const url = 'https://api.giphy.com/v1/gifs/search?api_key=' + process.env.API_KEY + '&limit=1&q=' + inputSearch + '';
  https.get(url, (response) => {
    let data = '';
    // let gif = '';
    response.on('data', (chunk) => {
      // const gifData = JSON.parse(JSON.stringify(data));
      // // const picture = data.data[0].url;
      // console.log(gifData);
      data += chunk;
    });
    response.on('end', () => {
      // 'use strict';
      let gifData = JSON.parse(data);
      const gif = gifData.data[0].images.original.url;
      //console.log(gif);
      res.render('gif', {
        image: gif
      });
    });
  }).on('error', (err) => {
    console.log('Error: ' + err.message);
  });

});

app.listen(3000, function() {
  console.log('Server is running on port 3000.')
});

// key: WPoc0EuScuZUe8d8PvzLQ8QzRZ0wrHl2
