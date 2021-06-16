const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactform', { useNewUrlParser: true, useUnifiedTopology: true });

const contactform = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  issue: String,
});
const Contact = mongoose.model('contact', contactform);


app.use("/static", express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  const pramas = {};
  res.status(200).render('home.pug', pramas);
})

app.get('/contact', (req, res) => {
  const pramas = {};
  res.status(200).render('contact.pug', pramas);
})

app.post('/contact', (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(() => {
    res.send("This item has been saved to the database");
  }).catch(() => {
    res.status(400).send("item was not saved to the databse");
  })
})


app.listen(port, () => {
  console.log(`This is application start on port ${port}`);
})
