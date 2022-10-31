const httpStatus = require("http-status");
const { VideoService } = require("../services/index");
const catchAsync = require("../utils/catchAsync");
const VideoServiceInstance = new VideoService();

const saveVideo = catchAsync(async (req, res) => {
  const result = await VideoServiceInstance.save(req.body);
  res.status(httpStatus.CREATED).json(result);
});

const getAllVideos = catchAsync(async (req, res) => {
  let videos = [];
  if (Object.keys(req.query).length) {
    /**
     * defaults
     */
    const validRating = ["Anyone", "7+", "12+", "16+", "18+"];
    const validGenres = [
      "Education",
      "Sports",
      "Movies",
      "Comedy",
      "Lifestyle",
      "All",
    ];

    const { title, genres, contentRating, sortBy } = req.query;

    let searchQuery = {
      title: title || "",
      sortBy,
      contentRating: [...validRating],
      genres: genres.includes("All") ? [...validGenres] : genres.split(","),
    };

    if (contentRating !== "18+") {
      let applicableRating = [];
      for (let i = 0; i < validRating.length; i++) {
        applicableRating.push(validRating[i]);
        if (validRating[i] === contentRating) break;
      }
      searchQuery.contentRating = [...applicableRating];
    }

    videos = await VideoServiceInstance.getBySearchQuery(searchQuery);
  } else {
    videos = await VideoServiceInstance.getAll();
  }

  res.status(httpStatus.OK).json({ videos });
});

const getVideoById = catchAsync(async (req, res) => {
  const video = await VideoServiceInstance.getById(req.params.videoId);
  if (video) return res.status(httpStatus.OK).json(video);
});

const incrementVideoViewCountById = catchAsync(async (req, res) => {
  await VideoServiceInstance.incrementViewCountById(req.params.videoId);
  res.status(httpStatus.NO_CONTENT).send();
});

const changeVideoVoteCountById = catchAsync(async (req, res) => {
  await VideoServiceInstance.changeVoteCountById(
    req.params.videoId,
    req.body.vote,
    req.body.change
  );
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  saveVideo,
  getAllVideos,
  getVideoById,
  incrementVideoViewCountById,
  changeVideoVoteCountById,
};
