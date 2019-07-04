const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dust = require('express-dustjs');

const app  = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('dust', dust.engine({
}));
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, './views'));

app.post('/api/sendData', (req, res) => {
  console.log(req.body);
  var data  = req.body;
  res.render('htmlPreview', {
    "html": data.htmlVal,
    "style": data.cssVal,
    "script": data.jsVal
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));