const express = require('express');
const Actions = require('../../data/helpers/actionModel');
const validateActionId = require('../middleware/validateActionId');
const validateProjectId = require('../../actions/middleware/validateActionId');

const router = express.Router();

// GET ALL ACTIONS
router.get('/', (req, res) => {

    Actions.get()
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({error: "No actions found."});
    });
});

// FIND ACTION BY ID
router.get('/:id', validateActionId, (req, res) => {

    const {id} = req.params;

    Actions.get(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({error: "Not able to retrieve this action."});
    });
});

// ADD NEW ACTION
router.post('/:id', validateProjectId, (req, res) => {

    const {description, notes} = req.body;
    const {id} = req.params;

    if(description, notes){
        Actions.insert({project_id:id, ...req.body})
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Could not add action to the database."});
        });
    } else {
        res.status(400).json({error: "Required fields: Description"});
    }
});

// UPDATE ACTION BY ID
router.put('/:id', validateActionId, (req, res) => {

    const {id} = req.params;
    const {description, notes} = req.body;

    if(description, notes){
        Actions.update(id, {description, notes})
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(500).json({error: "Action could not be updated."});
        });
    } else {
        res.status(400).json({error: "Required fields: Description and Notes"});
    }
});

// DELETE ACTION BY ID
router.delete('/:id', validateActionId, (req,res) => {

    const {id} = req.params;

    Actions.remove(id)
    .then(results => {
        res.status(200).json({message: "Action Deleted Successfuly!"});
    })
    .catch(err => {
        res.status(500).json({error: "Error trying to delete this action."})
    })
});

module.exports = router; 