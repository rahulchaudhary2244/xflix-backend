const Joi = require('joi');

const saveVideo = {
    videoLink: Joi.string().required(),
    title: Joi.string().required(),
    genre: Joi.string()
        .required()
        .valid('Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All'),
    contentRating: Joi.string()
        .required()
        .valid('Anyone', '7+', '12+', '16+', '18+'),
    releaseDate: Joi.date().required(),
    previewImage: Joi.string().required(),
};

const updateVotes = {
    vote: Joi.string().required().valid('upVote', 'downVote'),
    change: Joi.string().required().valid('increase', 'decrease'),
};

const mongoId = {
    videoId: Joi.string()
        .required()
        .custom((value, helpers) => {
            if (!value.match(/^[0-9a-fA-F]{24}$/)) {
                return helpers.message('"{{#label}}" must be a valid mongo id');
            }
            return value;
        }),
};

const getBySearchQuery = {
    title: Joi.string().allow(null, '').default(''),
    genres: Joi.string().default('All'),
    contentRating: Joi.string()
        .default('18+')
        .valid('Anyone', '7+', '12+', '16+', '18+'),
    sortBy: Joi.string()
        .default('releaseDate')
        .valid('releaseDate', 'viewCount'),
};

module.exports = { saveVideo, updateVotes, mongoId, getBySearchQuery };
