const express = require('express');
const Projects = require('../../data/helpers/projectModel');
const validateProjectId = require('../middleware/validateProjectId');

const router = express.Router();

// GET ALL PROJECTS
router.get('/', (req, res) =>{

    Projects.get()
    .then(project =>{
        res.status(200).json(project);
    })
    .catch(err =>{
        res.status(500).json({error: "No projects found."});
    });
});

// FIND PROJECT BY ID
router.get('/:id', validateProjectId, (req, res) => {

    const {id} = req.params;

    Projects.get(id)
    .then(project =>{
        res.status(200).json(project);
    })
    .catch(err =>{
        res.status(500).json({error: "Not able to retrieve this project."});
    });
});

// GET PROJECT + ACTIONS
router.get('/:id/actions', validateProjectId, (req,res) =>{
    
    const {id} = req.params;

    Projects.getProjectActions(id)
    .then(actions =>{
        console.log(actions);
        res.status(200).json(actions);
    })
    .catch(err =>{
        res.status(500).json({error: "Could not retrieve project actions."})
    })
});

// ADD NEW PROJECT
router.post('/', (req, res) => {

    const {name, description} = req.body;

    if(name && description){
        Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({error: "Could not add project to the database."});
        });
    } else {
        res.status(400).json({error: "Required fields: Name and Description"});
    }
});

// UPDATE PROJECT BY ID
router.put('/:id', validateProjectId, (req, res) => {

    const {id} = req.params;
    const {name, description} = req.body;

    if(name && description){
        Projects.update(id, {name, description})
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({error: "Project could not be updated."});
        });
    } else {
        res.status(400).json({error: "Required fields: Name and Description"});
    }
});

// DELETE PROJECT BY ID
router.delete('/:id', validateProjectId, (req, res) =>{

    const {id} = req.params;

    Projects.remove(id)
    .then(resuls => {
        res.status(200).json({message: "Project Deleted Successfuly!"});
    })
    .catch(err => {
        res.status(500).json({error: "Error trying to delete this project."})
    })
});

module.exports = router; 