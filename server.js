const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');           
const { ObjectId } = require('mongodb');
const PORT = process.env.PORT || 6000;  

const app = express();

app.set('port', (process.env.PORT || 6000));

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

app.post('/api/addDB', async(req, res, next) =>
{
  const db = client.db("cerealbox");
  const results = db.collection('box').updateMany({}, {$set:{"rating": null}});
  res.status(200)
}
);

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  	// "login" : "Chuu",
  	// "password" : "StanLoona123"

  var error = '';

  const { login, password } = req.body;

  //Our specific DB is "cerealbox" and we want to access the "user" collection
  const db = client.db("cerealbox");
  const results = await db.collection('user').find({userName:login,password:password}).toArray();

  var id = -1;
  var fn = '';
  var ln = '';

  //Get login results - if there are none, declare error
  if( results.length > 0 )
  {
    id = results[0]._id;
    fn = results[0].fName;
    ln = results[0].lName;
  }
  else
  {
    error = "Incorrect username/password";
  }

  var ret = { id:id, fName:fn, lName:ln, error:error};
  res.status(200).json(ret);
});



app.post('/api/register', async (req, res, next) =>
{

  // "fName" : "Jiwoo",
  //   "lName" : "Kim",
  // 	"userName" : "Chuu",
  // 	"password" : "StanLoona123"


  const { fName, lName, userName, password, email } = req.body;

  const newUser = {fName:fName, lName:lName, userName:userName, password: password, email: email};
  var error = '';
  var dupe = '';
  var _search = userName.trim();

  try
  {
    const db = client.db("cerealbox");
    const userBase = db.collection('user');
    // dupe = await db.collection('user').find({"userName":{$regex:_search+'.*', $options:'ri'}}).toArray();
    
    // if (dupe != '')
    // {
    //   e = "User with this username already exist, please try again";
    //   throw(e);
    // }
    // else {
    //   const result = userBase.insertOne(newUser);
    // }
    const result = userBase.insertOne(newUser);
    // console.log(result);
  }
  catch(e)
  {
    error = e.toString();
  }
  

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/addCereal', async (req, res, next) =>
{

  const { name, description, releaseDate, willItKillYou, manufacturer } = req.body;

  const newCereal = {name:name, description:description, releaseDate:releaseDate, willItKillYou: willItKillYou, manufacturer: manufacturer};
  var error = '';
  var dupe = '';
  var _search = name.trim();

  try
  {
    const db = client.db("cerealbox");
    const userBase = db.collection('box');
    dupe = await db.collection('box').find({"name":{$regex:_search+'.*', $options:'ri'}}).toArray();
    
    if (dupe != '')
    {
      e = "Cereal with this name already exist, please try again";
      throw(e);
    }
    else {
      const result = userBase.insertOne(newCereal);
    }
  }
  catch(e)
  {
    error = e.toString();
  }
  

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/addReview', async (req, res, next) =>
{

  const {cerealName, reviewerName, rating, body, cerealID} = req.body;

  const newReview = {cerealName:cerealName, reviewerName:reviewerName, rating:rating, body:body, cerealID: new ObjectId(cerealID)};
  var error = '';

  try
  {
    const db = client.db("cerealbox").collection('reviews').insertOne(newReview);
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/editReview', async (req, res, next) =>
{
  const {_id, cerealName, reviewerName, rating, body} = req.body;
  var ObjectId = require('mongodb').ObjectId;
  var error = '';

  try
  {
    const rev = client.db("cerealbox").collection('reviews');
    const filter = {_id: new ObjectId(_id)};
    const edit = {
      $set: {
        cerealName:cerealName, reviewerName:reviewerName, rating:rating, body:body
      },
    };

    const result = await rev.updateOne(filter, edit);
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
})

app.post('/api/editUser', async (req, res, next) =>
{
  const {_id, fName, lName, userName, password} = req.body;
  var ObjectId = require('mongodb').ObjectId;
  var error = '';

  try
  {
    const rev = client.db("cerealbox").collection('user');
    const filter = {_id: new ObjectId(_id)};
    const edit = {
      $set: {
        fName:fName, lName:lName, userName:userName, password: password
      },
    };

    const result = await rev.updateOne(filter, edit);
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
})

app.post('/api/sort', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  // ascending: 1, descending: -1
  const {collection, column, order} = req.body;

  var _collection = collection.trim();
  var _column = column.trim();
  
  
  const db = client.db("cerealbox").collection(_collection);
  const results = await db.find().sort({[_column]:[order]}).toArray();


  // const results =  db
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].name );
  }
  
  // var ret = {results:_ret, error:error};
  var ret = {results:results, error:error};
  res.status(200).json(ret);
});

app.post('/api/search', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const {collection, column, target} = req.body;

  var _collection = collection.trim();
  var _column = column.trim();
  var _target = target.trim();
  
  const db = client.db("cerealbox");
  const results = await db.collection(_collection).find({[_column]:{$regex:_target+'.*', $options:'ri'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].name );
  }
  
  // var ret = {results:_ret, error:error};
  var ret = {results:results, error:error};
  res.status(200).json(ret);
});

app.post('/api/remove', async (req, res, next) => 
{
  var error = '';
  var ObjectId = require('mongodb').ObjectId;

  const {collection, _id} = req.body;
  var _collection = collection.trim();

  try
  {
    const db = client.db("cerealbox").collection(_collection).deleteOne({_id: new ObjectId(_id)});
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/editCerealID', async (req, res, next) =>
{
  const {_id, _cerealID} = req.body;
  var ObjectId = require('mongodb').ObjectId;
  var error = '';

  try
  {
    const rev = client.db("cerealbox").collection('reviews');
    const filter = {_id: new ObjectId(_id)};
    const edit = {
      $set: {
        cerealID: new ObjectId(_cerealID)
      },
    };

    const result = await rev.updateOne(filter, edit);
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
})

// what this does is that for each cereal, it gets the rating based on the average review score of corresponding cereal
app.post('/api/setAvgReview', async (req, res, next) =>
{
  var error = '';
  var avg = '';


  const box = client.db("cerealbox").collection('box');
  const rev = client.db("cerealbox").collection('reviews');


  let result = await rev.aggregate([
    {
      $group: {
        _id: "$cerealID",
        avgReview: {$avg: "$rating"}
      }
    }
  ]).toArray();

  let i = 0;
  while (i < result.length)
  {
    
    let id = result[i]._id;
    let average = result[i].avgReview

    let filter = {_id: new ObjectId(id)};
    let edit = {
      $set: {
        rating: average
      },
    };

    let edited = await box.updateOne(filter, edit);
    i++;
  }

  var ret = {result: result };
  res.status(200).json(ret);

});


app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});

