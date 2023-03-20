const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
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

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
	
  var error = '';

  const { username, password } = req.body;

  console.log(password);

  const db = client.db("cerealbox");
  const results = await db.collection('user').find({userName:username,password:password}).toArray();

  var id = -1;
  var fn = '';
  var ln = '';

  if( results.length > 0 )
  {
    id = results[0].UserID;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }

  var ret = { id:id, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);
});


app.post('/api/register', async (req, res, next) =>
{

  // "fName" : "Jiwoo",
  //   "lName" : "Kim",
  // 	"userName" : "Chuu",
  // 	"password" : "StanLoona123"


  const { fName, lName, userName, password } = req.body;

  const newUser = {fName:fName, lName:lName, userName:userName, password: password};
  var error = '';
  var dupe = '';
  var _search = userName.trim();

  try
  {
    const db = client.db("cerealbox");
    const userBase = db.collection('user');
    dupe = await db.collection('user').find({"userName":{$regex:_search+'.*', $options:'ri'}}).toArray();
    
    if (dupe != '')
    {
      e = "User with this username already exist, please try again";
      throw(e);
    }
    else {
      const result = userBase.insertOne(newUser);
    }
    // console.log(result);
  }
  catch(e)
  {
    error = e.toString();
  }
  

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/searchUser', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { username} = req.body;

  var _search = username.trim();
  
  const db = client.db("cerealbox");
  const results = await db.collection('user').find({"userName":{$regex:_search+'.*', $options:'ri'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].userName );
  }
  
  // var ret = {results:_ret, error:error};
  var ret = {results:results, error:error};
  res.status(200).json(ret);
});

app.post('/api/removeUser', async (req, res, next) => 
{
  var error = '';
  var ObjectId = require('mongodb').ObjectId;

  const {_id} = req.body;

  try
  {
    const db = client.db("cerealbox");
    dupe = await db.collection('user').deleteOne({_id: new ObjectId(_id)});
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

app.post('/api/removeCereal', async (req, res, next) => 
{
  var error = '';
  var ObjectId = require('mongodb').ObjectId;

  const {_id} = req.body;

  try
  {
    const db = client.db("cerealbox");
    dupe = await db.collection('box').deleteOne({_id: new ObjectId(_id)});
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/searchCereal', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { name} = req.body;

  var _search = name.trim();
  
  const db = client.db("cerealbox");
  const results = await db.collection('box').find({"name":{$regex:_search+'.*', $options:'ri'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].userName );
  }
  
  // var ret = {results:_ret, error:error};
  var ret = {results:results, error:error};
  res.status(200).json(ret);
});

app.post('/api/addReview', async (req, res, next) =>
{

  const {cerealName, reviewerName, rating, body} = req.body;

  const newReview = {cerealName:cerealName, reviewerName:reviewerName, rating:rating, body:body};
  var error = '';

  try
  {
    const db = client.db("cerealbox").insertOne(newReview);
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/removeReview', async (req, res, next) => 
{
  var error = '';
  var ObjectId = require('mongodb').ObjectId;

  const {_id} = req.body;

  try
  {
    const db = client.db("cerealbox").collection('reviews').deleteOne({_id: new ObjectId(_id)});
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



app.listen(5000); // start Node + Express server on port 5000
