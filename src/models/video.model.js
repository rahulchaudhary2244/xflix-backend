const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    votes: {
        upVotes: { type: Number, default: 0, min: 0 },
        downVotes: { type: Number, default: 0, min: 0 },
    },
    previewImage: { type: String, required: true, trim: true },
    viewCount: { type: Number, default: 0, min: 0 },
    videoLink: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!value.match(/^youtube\.com\/embed\//))
                throw new Error('Invalid video link');
        },
    },
    title: { type: String, required: true, trim: true },
    genre: {
        type: String,
        required: true,
        enum: ['Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All'],
    },
    contentRating: {
        type: String,
        required: true,
        trim: true,
        enum: ['Anyone', '7+', '12+', '16+', '18+'],
    },
    releaseDate: { type: Date, required: true },
});

const Video = mongoose.model('videos', videoSchema);

/**
 * @typedef Video
 */
module.exports.Video = Video;
