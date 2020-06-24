/**
 * @api {get} /api/voice/sample Get all voice samples
 * @apiGroup VoiceSamples
 * @apiSuccess {json} sample Voice Sample
 * @apiSuccessExample Success-Response:
 *    HTTP 200 OK
 *    {
 *       "id": 1,
 *       "owner": 1,
 *       "title": "Title",
 *       "description": "Description",
 *       "rating": 2.3,
 *       "s3_location": "aws_s3 url",
 *       "tags": [
 *         "tag1",
 *         "tag2",
 *         "..."
 *       ]
 *    }
 */

/**
 * @api {get} /api/voice/sample/:id Get voice sample by id
 * @apiGroup VoiceSamples
 * @apiParam {Integer} id ID of voice sample
 * @apiSuccess {json} sample Voice Sample
 * @apiSuccessExample Success-Response:
 *     HTTP 200 OK
 *    {
 *       "id": 1,
 *       "owner": 1,
 *       "title": "Title",
 *       "description": "Description",
 *       "rating": 2.3,
 *       "s3_location": "aws_s3 url",
 *       "tags": [
 *         "tag1",
 *         "tag2",
 *         "..."
 *       ]
 *    }
 */

/**
 * @api {get} /api/voice/:id Get voice samples by user id
 * @apiGroup VoiceSamples
 * @apiParam {Integer} id ID of user
 * @apiSuccess {json} samples Voice Samples
 * @apiSuccessExample Success-Response:
 *    HTTP 200 OK
 *    [
 *      {
 *         "id": 1,
 *         "owner": 1,
 *         "title": "Title",
 *         "description": "Description",
 *         "rating": 2.3,
 *         "s3_location": "aws_s3 url",
 *         "tags": [
 *           "tag1",
 *           "tag2",
 *           "..."
 *         ]
 *      }
 *      {
 *         "id": 2,
 *         "owner": 1,
 *         "title": "Title",
 *         "description": "Description",
 *         "rating": 2.3,
 *         "s3_location": "aws_s3 url",
 *         "tags": [
 *           "tag1",
 *           "tag2",
 *           "..."
 *         ]
 *      }
 *    ]
 */