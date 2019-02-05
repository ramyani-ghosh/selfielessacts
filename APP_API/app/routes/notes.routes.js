module.exports = (app) => {
    const acts = require('../controllers/note.controller.js');
    // List all categories
    app.all('/api/category/list',acts.listAllCat);
    // Add a cat
    app.post('/api/category/add',acts.addCat);
    // Remove a cat
    // app.delete('/api/category/remove',acts.removeCat);
    // List acts for a given Category 
    app.get('/api/act/list',acts.listCatAct);
    // List number of acts for a given category
    app.get('/api/category/size',acts.listCatActCount);
    // List Acts for a given category in given range
    app.get('/api/act/list-in-range',acts.getCountInRange);
    // Upvote an act
    app.post('/api/act/upvote',acts.upvoteAct);
    // Remove an act
    app.delete('/api/act/remove',acts.removeAct);
    // Upload Act
    app.post('/api/act/upload', acts.uploadAct);
    // Retrieve all Notes
    app.get('/notes', acts.findAll);
}
