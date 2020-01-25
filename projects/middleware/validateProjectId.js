const Projects = require('../../data/helpers/projectModel');

const validateProjectId = (req,res,next) =>{

    const {id} =  req.params;

    if (id) {
        Projects.get(id)
        .then(project =>{
            if (project) {
                req.project = project;
                next();
            } else {
                res.status(400).json({error: "Project ID not valid."});
            }
        })
        .catch(err => {
            res.status(500).json({error: "Not able to retrieve project from the database."});
        });
    }
};

module.exports = validateProjectId; 