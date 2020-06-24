/**
 * @api {get} /api/attribute Retrieve all available attributes
 * @apiGroup Attributes
 * @apiSuccess {json} attribute Attribute
 * @apiSuccessExample Success-Response:
 *    HTTP 200 ok
 *    {
 *      "id": 1,
 *      "title": "Attribute Title"
 *    }
*/

/**
 * @api {post} /api/attribute Add an attribute to a voice sample
 * @apiGroup Attributes
 * @apiParam {Integer} voice_sample_id ID of the voice sample to attach attribute to
 * @apiParam {String} title Name of the attribute
 * @apiSuccess {Integer} id ID of many:many association
 * @apiSuccessExample Success-Response:
 *    HTTP 201 Created
 *    {
 *      123
 *    }
 */

 /**
  * @api {put} /api/attribute/:id Edit the properties of an attribute
  * @apiGroup Attributes
  * @apiParam {Integer} id ID of the attribute to be edited
  * @apiParam {json} data Data of the attribute to be edited
  */

/**
 * @api {delete} /api/attribute/:id Delete an attribute
 * @apiGroup Attributes
 * @apiParam {Integer} id ID of the attribute to be deleted
 * @apiSuccess {Integer} number Number rows deleted
*/