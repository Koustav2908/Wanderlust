const Joi = require("joi");

// server side validation for listing model
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            filename: Joi.string().required(),
            url: Joi.string().uri().required(),
        }).optional(),
        price: Joi.number().required().min(1),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
});

// server side validation for review model
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().integer().min(1).max(5),
        comment: Joi.string().required().max(200),
    }).required(),
});

// server side validation for user model
module.exports.userSchema = Joi.object({
    user: Joi.object({
        username: Joi.string().required().min(3).max(15).messages({
            "string.base": "Username must be a string.",
            "string.empty": "Username cannot be empty.",
            "string.min": "Username must be at least 3 characters long.",
            "string.max": "Username cannot exceed 15 characters.",
            "any.required": "Username is required.",
        }),
        email: Joi.string().required().messages({
            "string.base": "Email must be a string.",
            "string.empty": "Email cannot be empty.",
            "string.email": "Please provide a valid email address.",
            "any.required": "Email is required.",
        }),
        password: Joi.string().required().min(6).messages({
            "string.base": "Password must be a string.",
            "string.empty": "Password cannot be empty.",
            "string.min": "Password must be at least 6 characters long.",
            "any.required": "Password is required.",
        }),
        confirmPassword: Joi.string()
            .required()
            .valid(Joi.ref("password"))
            .messages({
                "string.base": "Confirm Password must be a string.",
                "string.empty": "Confirm Password cannot be empty.",
                "any.required": "Confirm Password is required.",
                "any.only": "Confirm Password must match the Password.",
            }),
    }).required(),
});
