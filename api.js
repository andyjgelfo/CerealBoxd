require('express');
const { ObjectId } = require('mongodb');

exports.setApp = function (app, client)
{
    app.post('/api/addDB', async(req, res, next) =>
    {
    //   const db = client.db("cerealbox");
    //   const results = db.collection('nutrition').updateMany({}, {$set:{"vitaminA":0
    // }});
    //   res.status(200)
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

        var ret;
        if( results.length > 0 )
        {
            id = results[0].userName;
            fn = results[0].fName;
            ln = results[0].lName;

            try
            {
            const token = require("./createJWT.js");
            ret = token.createToken( fn, ln, id );
            }
            catch(e)
            {
            ret = {error:e.message};
            
            }
        }
        else
        {
            ret = {error:"Login/Password incorrect"};
        }

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

        const result = userBase.insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }
    

    var ret = { error: error };
    res.status(200).json(ret);
    });

    app.post('/api/checkUsername', async (req, res, next) => 
    {
    const {username} = req.body;
    var error = '';
    var dupe = '';
    var _search = username.trim();
    var results = 0;

    try
    {
        const db = client.db("cerealbox");
        dupe = await db.collection('user').find({"userName":{$regex:_search+'.*', $options:'i'}}).toArray();

        i = 0;
        while (i < dupe.length)
        {
        if (username.toLowerCase() === dupe[i].userName.toLowerCase())
        {
            results = 1
            break;
        }
        i++;
        }

    }
    catch(e)
    {
        error = e.toString();
    }
    

    var ret = { results:results, error: error };
    res.status(200).json(ret);
    });

    app.post('/api/addCereal', async (req, res, next) =>
    {

    const { name, description, releaseDate, willItKillYou, manufacturer, rating, image, ingredients } = req.body;

    const newCereal = {name:name, description:description, releaseDate:releaseDate, willItKillYou: willItKillYou, manufacturer: manufacturer, rating:rating, image:image, ingredients: ingredients};
    var error = '';
    var dupe = '';
    var _search = name.trim();

    try
    {
        const db = client.db("cerealbox");
        const userBase = db.collection('box');
        dupe = await db.collection('box').find({"name":{$regex:_search+'.*', $options:'i'}}).toArray();
        
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

    app.post('/api/editCereal', async (req, res, next) =>
    {
    const { name, description, releaseDate, manufacturer, image, ingredients } = req.body;
    var ObjectId = require('mongodb').ObjectId;
    var error = '';

    try
    {
        const rev = client.db("cerealbox").collection('box');
        const filter = {_id: new ObjectId(_id)};
        const edit = {
        $set: {
            name:name, description:description, releaseDate:releaseDate, manufacturer: manufacturer, image: image, ingredients: ingredients
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

    app.post('/api/addReview', async (req, res, next) =>
    {

    const {reviewerID, cerealID, rating, body,} = req.body;

    var error = '';
    var reviewerName;
    var cerealName;
    var newReview;
    var result;

    try
    {
        
        const user = client.db("cerealbox").collection('user');
        const resUser = await user.find({"_id":new ObjectId(reviewerID.trim())}).toArray();
        reviewerName = resUser[0].userName;

        const box = client.db("cerealbox").collection('box');
        let cerID = new ObjectId(cerealID.trim());
        const resBox = await box.find({"_id":cerID}).toArray();
        cerealName = resBox[0].name;

        newReview = {cerealName:cerealName, cerealID: new ObjectId(cerealID), reviewerName:reviewerName, reviewerID: new ObjectId(reviewerID), rating:rating, body:body};
        const db = client.db("cerealbox").collection('reviews').insertOne(newReview);

        result = await client.db("cerealbox").collection('reviews').aggregate([
            {
            $group: {
                _id: "$cerealID",
                avgReview: {$avg: "$rating"}
            }
            },
            {
                $match: {_id: {$eq: cerID}}
            }
        ]).toArray();

        let id = result[0]._id;
        let average = Math.round(result[0].avgReview * 1e2 ) / 1e2;
        // let average = result[i].avgReview

        let filter = {_id: cerID};
        let edit = {
        $set: {
            rating: average
        },
        };

        let edited = await box.updateOne(filter, edit);


        
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = {results:result, error: error };
    res.status(200).json(ret);
    });

    app.post('/api/editReview', async (req, res, next) =>
    {
    const {reviewID, cerealID, rating, body} = req.body;
    // var ObjectId = require('mongodb').ObjectId;
    var error = '';
    var result;

    try
    {
        const rev = client.db("cerealbox").collection('reviews')
        const box = client.db("cerealbox").collection('box');
        let cerID = new ObjectId(cerealID.trim());
        var filter = {_id: new ObjectId(reviewID)};
        var edit = {
        $set: {
            'rating':rating, 'body':body
        },
        };

        result = await rev.updateOne(filter, edit);
        result = await client.db("cerealbox").collection('reviews').aggregate([
            {
            $group: {
                _id: "$cerealID",
                avgReview: {$avg: "$rating"}
            }
            },
            {
                $match: {_id: {$eq: cerID}}
            }
        ]).toArray();

        // let resID = result[0]._id;
        let average = Math.round(result[0].avgReview * 1e2 ) / 1e2;
        // let average = result[i].avgReview

        filter = {_id: cerID};
        edit = {
        $set: {
            rating: average
        },
        };

        let edited = await box.updateOne(filter, edit);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = {result: result, error: error };
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
    
    // var _ret = [];
    // for( var i=0; i<results.length; i++ )
    // {
    //     _ret.push( results[i].name );
    // }
    
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
    const results = await db.collection(_collection).find({[_column]:{$regex:_target+'.*', $options:'i'}}).toArray();
    
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
        let average = Math.round(result[i].avgReview * 1e2 ) / 1e2;
        // let average = result[i].avgReview

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

    app.post('/api/addNutrition', async (req, res, next) =>
    {

    // "name":"Honey Kix",
    // "cerealID":"641cd7c96673a2be783689f6",
    // "image":"https://i.imgur.com/jgVjvh3.png",
    // "servingSize":40, 
    // "calories":160, 
    // "totalFat":1, 
    // "saturatedFat":0, 
    // "transFat":0, 
    // "polyunsaturatedFat":0.5, 
    // "monounsaturatedFat":0, 
    // "cholesterol":0, 
    // "sodium":220,
    // "totalCarbohydrate":34, 
    // "dietaryFiber":3, 
    // "totalSugars":7, 
    // "addedSugars":7, 
    // "protein":3, 
    // "vitaminD":0.1, 
    // "calcium":0.1,
    // "iron":0.6, 
    // "potassium":0.02, 
    // "vitaminC":0.1, 
    // "thiamin":0.2, 
    // "riboflavin":0.1,
    // "niacin":0.1, 
    // "phosphorus":0.06, 
    // "magnesium":0.06, 
    // "zinc":0.2, 
    // "selenium":0, 
    // "copper":0, 
    // "manganese":0, 
    // "vitaminB6":0, 
    // "folate":0, 
    // "vitaminB12":0

    const {cerealID, image, servingSize, calories, totalFat, saturatedFat, 
    transFat, polyunsaturatedFat, monounsaturatedFat, cholesterol, sodium,
    totalCarbohydrate, dietaryFiber, totalSugars, addedSugars, protein, vitaminD, calcium,
    iron, potassium, vitaminC, thiamin, riboflavin, niacin, phosphorus, magnesium, zinc, 
    selenium, copper, manganese, vitaminB6, folate, vitaminB12, vitaminA} = req.body;

    
    var error = '';
    var kill;

    try
    {
        const box = client.db("cerealbox").collection('box');
        const cerID = new ObjectId(cerealID.trim());
        // const cerID = cerealID;
        const resBox = await box.find({"_id":cerID}).toArray();
        let name = resBox[0].name;
        const newNutrition = {name:name, cerealID: new ObjectId(cerealID), image:image, servingSize:servingSize, calories:calories, 
            totalFat:totalFat, saturatedFat:saturatedFat, 
            transFat:transFat, polyunsaturatedFat:polyunsaturatedFat, monounsaturatedFat:monounsaturatedFat, 
            cholesterol:cholesterol, sodium:sodium,
            totalCarbohydrate:totalCarbohydrate, dietaryFiber:dietaryFiber, totalSugars:totalSugars, 
            addedSugars:addedSugars, protein:protein, vitaminD:vitaminD, calcium:calcium,
            iron:iron, potassium:potassium, vitaminC:vitaminC, thiamin:thiamin, riboflavin:riboflavin,
            niacin:niacin, phosphorus:phosphorus, magnesium:magnesium, 
            zinc:zinc, selenium:selenium, copper:copper, manganese:manganese,
            vitaminB6:vitaminB6, folate:folate, vitaminB12:vitaminB12, vitaminA: vitaminA};

        const nutrition = client.db("cerealbox").collection('nutrition')
        const db = nutrition.insertOne(newNutrition);

        // var maxSugars = await nutrition.aggregate(
        //     [
        //         {$project: {_id: 1, ratio: {$divide: ["$addedSugars", "$servingSize"]}}}, 
        //         {$sort: {ratio: -1}}
        //     ]
        //   ).toArray();
        // var maxSugar = maxSugars[0].ratio;

        // var cereals = await nutrition.find({"cerealID":cerID}).toArray();
        //     var cereal = cereals[0]
        //     if (cereal.addedSugars !== 0)
        //     {
        //         var killBefore = (cereal.addedSugars/cereal.servingSize) / maxSugar;
                
        //         kill = Math.round(killBefore * 1e2 * 10) / 1e2;
        //     }
        //     else
        //         kill = 0;

        // // editing kill score
        // let filter = {_id: cerID};
        // let edit = {
        // $set: {
        //     willItKillYou: kill
        // },
        // };

        // let edited = await box.updateOne(filter, edit);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
    });

    app.post('/api/setKill', async (req, res, next) =>
    {
        var error = '';

        const box = client.db("cerealbox").collection('box');
        const nutrition = client.db("cerealbox").collection('nutrition');

        var maxSugars = await nutrition.aggregate(
            [
                {$project: {_id: 1, ratio: {$divide: ["$addedSugars", "$servingSize"]}}}, 
                {$sort: {ratio: -1}}
            ]
          ).toArray();
        var maxSugar = maxSugars[0].ratio;


        let result = await nutrition.aggregate([
            {
                $group: {
                    _id: "$cerealID",
                }
            }
        ]).toArray();

        var i = 0;
        while (i < result.length)
        {
            let id = result[i]._id;
            var cereals = await nutrition.find({"cerealID":new ObjectId(id)}).toArray();
            var cereal = cereals[0]
            if (cereal.addedSugars !== 0)
            {
                var killBefore = (cereal.addedSugars/cereal.servingSize) / maxSugar;
                
                kill = Math.round(killBefore * 1e2 * 10) / 1e2;
            }
            else
                kill = 0;

            let filter = {_id: new ObjectId(id)};
            let edit = {
            $set: {
                willItKillYou: kill
            },
            };

            let edited = await box.updateOne(filter, edit);
            i++;
        }

        var ret = {result: result, error: error};
        res.status(200).json(ret);

    });

    app.post('/api/searchByID', async (req, res, next) => 
    {
    // incoming: userId, search
    // outgoing: results[], error

    var error = '';

    const {collection, column, target} = req.body;

    var _collection = collection.trim();
    var _column = column.trim();
    var _target = (target.trim());
    
    const db = client.db("cerealbox");
    const results = await db.collection(_collection).find({[_column]:new ObjectId(_target)}).toArray();
    
    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
        _ret.push( results[i] );
    }
    
    // var ret = {results:_ret, error:error};
    var ret = {results:_ret[0], error:error};
    res.status(200).json(ret);
    });

    app.post('/api/searchNotIngredient', async (req, res, next) => 
    {
    // incoming: userId, search
    // outgoing: results[], error

    var error = '';

    const {target} = req.body;

    var _target = target.trim();
    
    const db = client.db("cerealbox");
    const results = await db.collection("box").find({"ingredients":{$not: {$regex:_target+'.*', $options:'i'}}}).toArray();
    
    
    // var ret = {results:_ret, error:error};
    var ret = {results:results, error:error};
    res.status(200).json(ret);
    });

}