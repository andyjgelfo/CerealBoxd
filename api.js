require('express');
const { ObjectId } = require('mongodb');
const sendEmail = require("./util/sendEmail");


exports.setApp = function (app, client)
{
    // app.post('/api/addDB', async(req, res, next) =>
    // {
    //   const db = client.db("cerealbox");
    //   const results = db.collection('reviews').updateMany({}, {$set:{"cerealID":null
    // }});
    //   res.status(200)
    // }
    // );

    app.post('/api/sendemail', (req, res) => {
        const {to, subject, output} = req.body;

        var ret;


        try
        {
            sendEmail(to, subject, output);
        }
        catch(e)
        {
        ret = {error:e.message};
        
        }

        res.status(200).json(ret);

    });

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
        var confirm;
        var userEmail;

        var ret;
        if( results.length > 0 )
        {
            username = results[0].userName;
            fn = results[0].fName;
            ln = results[0].lName;
            userEmail = results[0].email;
            confirm = results[0].confirmed;
            id = results[0]._id
            // console.log(id);

            try
            {
            const token = require("./createJWT.js");
            ret = token.createToken( fn, ln, username, userEmail, confirm, id );
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

    app.post('/api/forgotPassword', async (req, res, next) =>
    {
        // most of forgot password will be done via frontend
        const {username, password} = req.body;
        var error = '';
        var _id;
        var email;
        var recover;

        try
        {
            const db = client.db("cerealbox").collection('user');
            const results = await db.find({userName:username}).toArray();

            if (results.length > 0)
            {
                _id = results[0]._id;
                email = results[0].email;
                recover = results[0].recoveryEmail;
            }
            else
            {
                throw("User not found");
            }

            const filter = {_id: new ObjectId(_id)};
            const edit = {
                $set: {
                    password:password
                },
            };
    
            const result = await db.updateOne(filter, edit);

        }
        catch(e)
        {
            error = e.toString();
        }
        var ret = {email: email, recover: recover, error: error };
        res.status(200).json(ret);
    })

    app.post('/api/confirmEmail', async (req, res, next) =>
    {
        const {_id} = req.body;
        var error = '';

        try
        {
            const rev = client.db("cerealbox").collection('user');
            const filter = {_id: new ObjectId(_id)};
            const edit = {
            $set: {
                confirmed:true
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
    });


    app.post('/api/register', async (req, res, next) =>
    {

    // "fName" : "Jiwoo",
    //   "lName" : "Kim",
    // 	"userName" : "Chuu",
    // 	"password" : "StanLoona123"


    const { fName, lName, userName, password, email } = req.body;

    const newUser = {fName:fName, lName:lName, userName:userName, password: password, email: email, recoveryEmail:'', confirmed: false};
    var error = '';

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
    var results = 0;
    var copy;

    try
    {
        var _search = username.trim();
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

    try
    {
        const db = client.db("cerealbox");
        const userBase = db.collection('box');
        const result = userBase.insertOne(newCereal);

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

    const {reviewerID, cerealID, rating, body} = req.body;

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
    const {reviewerID, cerealID, rating, body} = req.body;
    // var ObjectId = require('mongodb').ObjectId;
    var error = '';
    var result;

    try
    {
        const rev = client.db("cerealbox").collection('reviews')
        let cerID = new ObjectId(cerealID.trim());
        var filter = {reviewerID: new ObjectId(reviewerID), cerealID: cerID};
        var edit = {
        $set: {
            'rating':rating, 'body':body
        },
        };

        result = await rev.updateOne(filter, edit);
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
        const {_id, fName, lName, userName, email, recoveryEmail, password} = req.body;
        var ObjectId = require('mongodb').ObjectId;
        var error = '';
        var result;

        try
        {
            const rev = client.db("cerealbox").collection('user');
            const filter = {_id: new ObjectId(_id)};
            const edit = {
            $set: {
                fName:fName, lName:lName, userName:userName, email: email, recoveryEmail: recoveryEmail, password: password
            },
            };

            result = await rev.updateOne(filter, edit);
        }
        catch(e)
        {
            error = e.toString();
        }

        var ret = { result: result, error: error };
        res.status(200).json(ret);
    })

    app.post('/api/sort', async (req, res, next) => 
    {
    // incoming: userId, search
    // outgoing: results[], error

    var error = '';

    // ascending: 1, descending: -1
    const {collection, column, order} = req.body;
    var results;

    try
    {
        var _collection = collection.trim();
        var _column = column.trim();
        
        
        const db = client.db("cerealbox").collection(_collection);
        results = await db.find().sort({[_column]:[order]}).toArray();
    }
    catch(e)
    {
        error = e.toString();
    }


    var ret = {results:results, error:error};
    res.status(200).json(ret);
    });

    app.post('/api/search', async (req, res, next) => 
    {
    // incoming: userId, search
    // outgoing: results[], error

    var error = '';

    const {collection, column, target} = req.body;
    var results;

    try
    {
        var _collection = collection.trim();
        var _column = column.trim();
        var _target = target.trim();
        
        const db = client.db("cerealbox");
        results = await db.collection(_collection).find({[_column]:{$regex:_target+'.*', $options:'i'}}).toArray();
        
        var _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push( results[i].name );
        }
    }
    catch(e)
    {
        error = e.toString();
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
    

    try
    {
        var _collection = collection.trim();
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
    var result;

    try
    {
        const box = client.db("cerealbox").collection('box');
        const rev = client.db("cerealbox").collection('reviews');


        result = await rev.aggregate([
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
    }
    catch(e)
    {
        error = e.toString();
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

    const {cerealID, servingSize, calories, totalFat, saturatedFat, 
    transFat, polyunsaturatedFat, monounsaturatedFat, cholesterol, sodium,
    totalCarbohydrate, dietaryFiber, totalSugars, addedSugars, protein, vitaminD, calcium,
    iron, potassium, vitaminC, thiamin, riboflavin, niacin, phosphorus, magnesium, zinc, 
    selenium, copper, manganese, vitaminB6, folate, vitaminB12, vitaminA} = req.body;

    
    var error = '';

    try
    {
        const box = client.db("cerealbox").collection('box');
        const cerID = new ObjectId(cerealID.trim());
        // const cerID = cerealID;
        // const resBox = await box.find({"_id":cerID}).toArray();
        // let name = resBox[0].name;
        const newNutrition = {cerealID: new ObjectId(cerealID), servingSize:servingSize, calories:calories, 
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
        var result;

        try
        {

            const box = client.db("cerealbox").collection('box');
            const nutrition = client.db("cerealbox").collection('nutrition');

            var maxSugars = await nutrition.aggregate(
                [
                    {$project: {_id: 1, ratio: {$divide: ["$addedSugars", "$servingSize"]}}}, 
                    {$sort: {ratio: -1}}
                ]
            ).toArray();
            var maxSugar = maxSugars[0].ratio;


            result = await nutrition.aggregate([
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
        }
        catch(e)
        {
            error = e.toString();
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

   
    var _ret = [];

    try
    {
    
        var _collection = collection.trim();
        var _column = column.trim();
        var _target = (target.trim());
        const db = client.db("cerealbox");
        const results = await db.collection(_collection).find({[_column]:new ObjectId(_target)}).toArray();
        
      
    // _ret[0] = null;
    
        if(results.length != 0)
        {
            for( var i=0; i<results.length; i++ )
            {
                _ret.push( results[i] );
            }
        }
        else 
        {
            _ret[0] = null;
        }
    }
    catch(e)
    {
        error = e.toString();
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
    var results;

    try
    {
        const {target} = req.body;

        var _target = target.trim();
        
        const db = client.db("cerealbox");
        results = await db.collection("box").find({"ingredients":{$not: {$regex:_target+'.*', $options:'i'}}}).toArray();
    }
    catch(e)
    {
        error = e.toString();
    }
    
    
    // var ret = {results:_ret, error:error};
    var ret = {results:results, error:error};
    res.status(200).json(ret);
    });

    app.post('/api/addFavorite', async (req, res, next) =>
    {

    const { userID, cerealID } = req.body;
    var error = '';


    try
    {
        const favorite = {userID: new ObjectId(userID.trim()), cerealID: new ObjectId(cerealID.trim())};
        const db = client.db("cerealbox");
        const fav = db.collection('favorites');
        
        const result = fav.insertOne(favorite);
    }
    catch(e)
    {
        error = e.toString();
    }
    

    var ret = { error: error };
    res.status(200).json(ret);
    });

    app.post('/api/searchByTwoID', async (req, res, next) => 
    {
    // incoming: userId, search
    // outgoing: results[], error

    var error = '';

    const {collection, column1, column2, target1, target2} = req.body;

    
    var _ret = [];

    try
    {
        var _collection = collection.trim();
        var _column1 = column1.trim();
        var _column2 = column2.trim();
        var _target1 = target1.trim();
        var _target2 = target2.trim();
        const db = client.db("cerealbox");
        const results = await db.collection(_collection).find({[_column1]:new ObjectId(_target1), [_column2]:new ObjectId(_target2)}).toArray();
        
        
        if(results.length != 0)
        {
            for( var i=0; i<results.length; i++ )
            {
                _ret.push( results[i] );
            }
        }
        else 
        {
            _ret[0] = null;
        }
    }
    catch(e)
    {
        error = e.toString();
    }
    
    // var ret = {results:_ret, error:error};
    var ret = {results:_ret[0], error:error};
    res.status(200).json(ret);
    });


    app.post('/api/getFav', async (req, res, next) => 
    {


    var error = '';

    const {target} = req.body;
    var _ret = [];

    try
    {
        var _target = (target.trim());
        
        const db = client.db("cerealbox");
        const results = await db.collection("favorites").find({"userID":new ObjectId(_target)}).toArray();
        const cerealDB = db.collection("box");
        var cereals;
        var cer;
        
        
        // _ret[0] = null;
        for( var i=0; i<results.length; i++ )
        {
            // _ret.push( results[i].cerealID);
            cereals = await cerealDB.find({"_id":new ObjectId(results[i].cerealID)}).toArray();
            cer = cereals[0];

            _ret.push(cer);
        }
    }
    catch(e)
    {
        error = e.toString();
    }
    
    // var ret = {results:_ret, error:error};
    var ret = {results:_ret, error:error};
    res.status(200).json(ret);
    });

    app.post('/api/searchByIDmulti', async (req, res, next) => 
    {
    // incoming: userId, search
    // outgoing: results[], error

    var error = '';

    const {collection, column, target} = req.body;

    var _ret = [];
    try
    {
        var _collection = collection.trim();
        var _column = column.trim();
        var _target = (target.trim());
        
        const db = client.db("cerealbox");
        const results = await db.collection(_collection).find({[_column]:new ObjectId(_target)}).toArray();
        
        
        // _ret[0] = null;
        for( var i=0; i<results.length; i++ )
        {
            _ret.push( results[i] );
        }
    }
    catch(e)
    {
        error = e.toString();
    }
    
    // var ret = {results:_ret, error:error};
    var ret = {results:_ret, error:error};
    res.status(200).json(ret);
    });

    app.post('/api/addSuggestion', async (req, res, next) =>
    {

        const { name, manufacturer } = req.body;

        const newSuggestion = {name:name, manufacturer: manufacturer}
        var error = '';
        var result;


        try
        {
            const db = client.db("cerealbox");
            const userBase = db.collection('suggestions');
        
            result = userBase.insertOne(newSuggestion);
            // }
        }
        catch(e)
        {
            error = e.toString();
        }
        var ret = {results:result, error:error};
        res.status(200).json(ret);
    });

    app.post('/api/getKeys', async (req, res, next) =>
    {

        const {} = req.body;
        var result;
        var error = '';

        try
        {
            result = {YOUR_SERVICE_ID:process.env.YOUR_SERVICE_ID, YOUR_TEMPLATE_ID:process.env.YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY:process.env.YOUR_PUBLIC_KEY}
        }
        catch(e)
        {
            error = e.toString();
        }
        var ret = {results:result, error:error};
        res.status(200).json(ret);
    });

    app.post('/api/deleteReview', async (req, res, next) => 
    {
        
        var error = '';

        const {reviewerID, cerealID} = req.body;
        

        try
        {
            const db = await client.db("cerealbox").collection("reviews").deleteOne({reviewerID: new ObjectId(reviewerID), cerealID: new ObjectId(cerealID)});
        }
        catch(e)
        {
            error = e.toString();
        }

        var ret = { error: error };
        res.status(200).json(ret);
    });

    app.post('/api/updateRating', async (req, res, next) => 
    {
        var error = '';
        const {cerealID} = req.body;
        

        try
        {
            let cerID = new ObjectId(cerealID.trim());
            let average;

            const box = await client.db("cerealbox").collection('box');
            const result = await client.db("cerealbox").collection('reviews').aggregate([
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

            if (result[0] != null)
            {
                average = Math.round(result[0].avgReview * 1e2 ) / 1e2;
            }
            else
            {
                average = 0;
            }

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

        var ret = { error: error };
        res.status(200).json(ret);

    });

    app.post('/api/deleteFavorite', async (req, res, next) => 
    {
        
        var error = '';

        const {userID, cerealID} = req.body;
        

        try
        {
            const db = await client.db("cerealbox").collection("favorites").deleteOne({userID: new ObjectId(userID), cerealID: new ObjectId(cerealID)});
        }
        catch(e)
        {
            error = e.toString();
        }

        var ret = { error: error };
        res.status(200).json(ret);
    });

    app.post('/api/getRandom', async (req, res, next) => 
    {
        
        var error = '';

        const {collection} = req.body;

        var result;

        try
        {
            result = await client.db("cerealbox").collection(collection.trim()).aggregate([{$sample:{size:1}}]).toArray();
        }
        catch(e)
        {
            error = e.toString();
        }

        var ret = { result: result[0], error: error };
        res.status(200).json(ret);
    });


}

