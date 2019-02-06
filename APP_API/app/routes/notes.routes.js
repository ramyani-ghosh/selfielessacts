module.exports = (app) => {
    const acts = require('../controllers/note.controller.js');

    //Add a user
    app.all('/api/v1/users',acts.addUser);
    //Remove a user
    app.all('/api/v1/users/:username',acts.removeUser);
    // List all categories and add cat
    app.all('/api/v1/categories',acts.commonCat);
    // Add a cat
    // app.all('/api/v1/categories',acts.addCat);
    // Remove a cat
    app.all('/api/v1/categories/:categoryName',acts.removeCat);
    // List acts for a given Category
    app.all('/api/v1/categories/:categoryName/acts',acts.listCat);
    // List number of acts for a given category
    app.all('/api/v1/categories/:categoryName/acts/size',acts.listCatCount);
    // List Acts for a given category in given range
    app.all('/api/v1/categories/:categoryName/acts',acts.getCountInRange);
    // Upvote an act
    app.all('/api/v1/acts/upvote',acts.upvoteAct);
    // Remove an act
    app.all('/api/v1/acts/:actId',acts.removeAct);
    // Upload Act
    app.all('/api/v1/acts', acts.uploadAct);
    // Retrieve all Notes
    app.get('/notes', acts.findAll);
};
