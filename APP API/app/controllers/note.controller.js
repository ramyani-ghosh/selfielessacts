const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};

// Upload a new act
exports.uploadAct = (req,res) => {

    //Error Handling - 400
    if(!req.body.content) {
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
        imgUrl:req.body.imgUrl
    });

    // Save Act in the database
    act.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Act."
        });
    });
}
