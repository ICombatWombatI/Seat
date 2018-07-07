const Joi = require('joi');


module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {

            const result = Joi.validate(req.body, schema);
            
            if (result.error) {
                return res.status(400).json(result.error);
            }

            if (! req.value) {
                req.value = {};
            }

            req.value['body'] = result.value;

            next();
        }
    },

    schemas: {
        // authSchema
        authSchema: Joi.object().keys({
            // email
            email: Joi.string().email().required().options({
                language: {
                    string: {
                        email: 'Custom message: must be a valid email',
                    },
                    any: {
                        required: 'Custom message: is required'
                    }    
                }
            }),
            // password
            password: Joi.string().required().options({
                language: {
                    any: {
                        required: 'Custom message: is required'
                    }    
                }    
            })
        })
        // end authSchema
    }
};