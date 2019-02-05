const Act = require('../models/note.model.js');

// List all categories
exports.listAllCat = (req, res) => {
    Act.distinct("category").then(categories =>{
        res.send(categories);
    }).catch(err => {
        
        res.status(204).send({});
        res.status(205).send({});
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// List acts for a given category
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
exports.listCatActCount = (req,res) => {
    console.log("In the function!");
     if(!req.body) {
        return res.status(400).send({
            message: "Category Name can not be empty"
        });
    }
    console.log(req.body.catName);
    Act.find({category:req.body.catName}).then(data => {
        res.send({"count":data.length});
    });
};

//List count of Acts for a given Category for a given range
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

//Remove an Act
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
exports.uploadAct = (req,res) => {
    //Error Handling - 400
    if(!req.body) {
        return res.status(400).send({
            message: "Act content can not be empty"
        });
    }
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
