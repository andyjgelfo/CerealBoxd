const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');           
const { ObjectId } = require('mongodb');
const PORT = process.env.PORT || 5050;  

const app = express();

app.set('port', PORT);

require('dotenv').config();
const url = 'mongodb+srv://Andy:yGxWWlynMTgYcdVV@cluster0.r74qhgh.mongodb.net/?retryWrites=true&w=majority';
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect(console.log("mongodb connected"));



app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

///////////////////////////////////////////////////
// For Heroku deployment

// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}



var api = require('./api.js');
api.setApp( app, client );


app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});


// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey("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");

// const msg = {
//   to: "thomasnguyen3212@gmail.com",
//   from: "cerealboxdd@outlook.com",
//   subject: "test",
//   text: "stan loona"
// }

// await sgMail.send(msg, function(err, info) {
//   if (err) {
//     console.log("email not sent 2");
//   }
//   else {
//     console.log("email success 2");
//   }
// }); 
