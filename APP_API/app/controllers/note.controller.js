const schemas = require('../models/note.model.js');
const Act = schemas.Act;
const Category = schemas.Category;

// List all categories
exports.listAllCat = (req, res) => {
    categoryList = Category.find({})
    .then(data=>{
        console.log(data);
        var newjson = {};
        var count = 0;
        for(var item in data){
            newjson[data[item].categoryName] = data[item].count;
            count++;
        }
        if(count)
            res.status(200).send(newjson);
        else
            res.status(204).send(newjson);
    }).catch(err=>{
        
    });
    //405??
};

//Insert Category
exports.addCat = (req,res) => {
     if(req.body.length != 1) {
        return res.status(400).send({
            message: "Act content can not be empty"
        });
    }

    console.log(req.body);
    // Create a new Act
    const cat = new Category({
        categoryName : req.body[0],
        count : 0,
    });
    cat.save().then(data => {
        res.status(201).send({
            //Act Created Successfully!
        });
    }).catch(err => {
        res.status(405).send({
            // message: "ActId provided is not unique!"
        });
    });
};
// List acts for a given category
// fix request format
exports.listCatAct = (req,res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Category Name can not be empty"
        });
    }
    Act.find({category:req.body.catName}).sort({_id:-1}).limit(500).then(acts => {
        res.send(acts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// List Number of acts for a given category
//fix request format
exports.listCatActCount = (req,res) => {
    console.log("In the function!");
     if(!req.body) {
        return res.status(400).send({
            message: "Category Name can not be empty"
        });
    }
    console.log(req.body);
    Act.find({category:req.body[0]}).then(data => {
        res.send([data.length]);
    });
};

//List count of Acts for a given Category for a given range
// fix query
exports.getCountInRange = (req,res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Category Name can not be empty"
        });
    }
    console.log(req.body.start);
    Act.count( { actId: { $gt: req.body.start, $lt: req.body.end }}).then(data => {
        res.send(data.length).catch(err => {
        // res.status(400).send({});
        });
    });
    // Act.find($query:{category:req.body.category},$orderby:{_id:-1}).skip(req.body.start).limit(req.body.end - req.body.start).then(count => {
    //     res.send(count);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while retrieving notes."
    //     });
    // });
};

//Upvote an Act
// error codes
exports.upvoteAct = (req,res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Category Name can not be empty"
        });
    }
    // db.trialdb.update({$set:{upvotes:0}})
    // db.trialdb.update({},{$set:{upvotes:0}},false,true)
    // db.trialdb.update({actId:2},{$inc:{upvotes:1}})
    Act.update({actId:req.body.actId},{$inc:{upVotes:1}}).then(response => res.send(response)).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

//Remove an Act
// error codes
exports.removeAct = (req,res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Category Name can not be empty"
        });
    }
    console.log(req.body.actId);
    
    Act.findOneAndDelete({actId:req.body.actId},function(err,callback){
        if(callback)
            res.status(200).send({});
        else
            res.status(400).send({});
        
    });
};
// Upload a new act
// url needs to be done
exports.uploadAct = (req,res) => {
    //Error Handling - 400
    if(!req.body) {
        return res.status(400).send({
            message: "Act content can not be empty"
        });
    }

    console.log(req.body);
    // Create a new Act
    const act = new Act({
        actId: req.body.actId,
        category:req.body.category,
        caption:req.body.caption,
        timestamp:req.body.timestamp,
        imgUrl:req.body.imgUrl,
        upVotes:0
    });
    const success = {};
    // Save Act in the database
    act.save()
    .then(data => {
        res.status(201).send({
            //Act Created Successfully!
        });
    }).catch(err => {
        res.status(400).send({
            // message: "ActId provided is not unique!"
        });
        res.status(405).send({
            // message: "Bad Request!"
        });
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Act."
        });
    });
};


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Act.find()
    .then(acts => {
        res.send(acts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
