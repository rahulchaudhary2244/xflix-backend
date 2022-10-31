const { VideoModel } = require('../models/index');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const videoData = require('../data/videos');

class VideoService {
    /** saves new video to DB
   * @param {Object} videoBody
   * @returns {Promise<Video>}
   * @throws {ApiError}
   *
   *videoBody example:
 {
    "videoLink": "youtube.com/embed/vxxN3_bs6Uo",
    "title": "Crio Fireside chat with Binny Bansal",
    "genre": "Education",
    "contentRating": "7+",
    "releaseDate": "12 Jan 2021",
    "previewImage": "https://i.ytimg.com/vi/vxxN3_bs6Uo/maxresdefault.jpg"
}

201 CREATED status code with response as
{
    "votes": {
        "upVotes": 0,
        "downVotes": 0
    },
    "previewImage": "https://i.ytimg.com/vi/vxxN3_bs6Uo/maxresdefault.jpg",
    "viewCount": 0,
    "videoLink": "youtube.com/embed/vxxN3_bs6Uo",
    "title": "Crio Fireside chat with Binny Bansal",
    "genre": "Education",
    "contentRating": "7+",
    "releaseDate": "12 Jan 2021",
    "_id": "60332a8dd4670eed95b518db"
}

   */
    save = async (videoBody) => {
        const newVideo = new VideoModel(videoBody);
        const result = await newVideo.save();
        if (result) return result;

        throw new ApiError(httpStatus.BAD_REQUEST, 'Video not saved');
    };

    getAll = async () => await VideoModel.find({});

    getBySearchQuery = async (searchQuery) => {
        const { title, genres, contentRating, sortBy } = searchQuery;

        // sort in descending order by sortBy key provided
        let result = await VideoModel.find({
            $and: [
                {
                    title: { $regex: title, $options: 'i' },
                },
                {
                    genre: {
                        $in: genres,
                    },
                },
                {
                    contentRating: {
                        $in: contentRating,
                    },
                },
            ],
        }).sort({ [sortBy]: -1 });

        return result;
    };

    getById = async (_id) => {
        const video = await VideoModel.findById({ _id });
        if (video) return video;

        throw new ApiError(
            httpStatus.NOT_FOUND,
            'No video found with matching id'
        );
    };

    incrementViewCountById = async (_id) => {
        const video = await VideoModel.findById({ _id });
        if (video) {
            video.viewCount += 1;
            await video.save();
        } else {
            throw new ApiError(
                httpStatus.NO_CONTENT,
                'No video found with matching id'
            );
        }
    };

    changeVoteCountById = async (_id, vote, change) => {
        const video = await VideoModel.findById({ _id });

        if (video) {
            //`${vote}s` can only be upVotes or downVotes
            if (change === 'increase') video.votes[`${vote}s`] += 1;
            else if (change === 'decrease') video.votes[`${vote}s`] -= 1;

            if (video.votes[`${vote}s`] < 0) video.votes[`${vote}s`] = 0;
            await video.save();
        } else {
            throw new ApiError(
                httpStatus.NO_CONTENT,
                'No video found with matching id'
            );
        }
    };

    dropAndInsertMany = async () => {
        await VideoModel.deleteMany();
        const videos = await VideoModel.insertMany(videoData, {
            ordered: false,
        });
        return videos;
    };
}

module.exports.VideoService = VideoService;
