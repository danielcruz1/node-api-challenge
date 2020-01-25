const Actions = require('../../data/helpers/actionModel');

const validateActionId = (req,res,next) =>{

    const {id} =  req.params;

    if (id) {
        Actions.get(id)
        .then(action =>{
            if (action) {
                req.action = action;
                next();
            } else {
                res.status(400).json({error: "Action ID not valid."});
            }
        })
        .catch(err =>{
            res.status(500).json({error: "Not able to retrieve action from the database."});
        });
    }
};

module.exports = validateActionId; 