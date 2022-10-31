module.exports = {
  saveVideoValidation: require("./video.validation").saveVideo,
  updateVideoVotes: require("./video.validation").updateVotes,
  mongoId: require("./video.validation").mongoId,
  getBySearchQuery: require("./video.validation").getBySearchQuery,
};
