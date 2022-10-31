const router = require('express').Router();
const { videoController } = require('../../controllers/index');
const {
    saveVideo,
    getAllVideos,
    getVideoById,
    incrementVideoViewCountById,
    changeVideoVoteCountById,
    dropAndInsertMany,
} = videoController;
const {
    validateJoiSchema_body,
    validateJoiSchema_params,
    validateJoiSchema_query,
} = require('../../middlewares/validateJoiSchema');
const videoValidation = require('../../validations/index');

const validateSaveVideo = validateJoiSchema_body(
    videoValidation.saveVideoValidation
);

const validateMongoId = validateJoiSchema_params(videoValidation.mongoId);

const validateUpdateVotes = validateJoiSchema_body(
    videoValidation.updateVideoVotes
);

const validateGetBySearchQuery = validateJoiSchema_query(
    videoValidation.getBySearchQuery
);

router.post('/', validateSaveVideo, saveVideo);

router.get('/', validateGetBySearchQuery, getAllVideos);

router.get('/:videoId', validateMongoId, getVideoById);

router.patch('/:videoId/views', validateMongoId, incrementVideoViewCountById);

router.patch(
    '/:videoId/votes',
    validateMongoId,
    validateUpdateVotes,
    changeVideoVoteCountById
);

router.post('/delete-and-insert-many', dropAndInsertMany);

module.exports = router;
