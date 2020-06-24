/**
 * @api {post} /api/register Register a user
 * @apiGroup Users
 * @apiParam {String} first_name First Name field for User
 * @apiParam {String} last_name Last Name field for User
 * @apiParam {String} display_name Display Name field for User
 * @apiParam {String} email Email field for User
 * @apiParam {String} password Password field for User
 * @apiSuccess token Registers user and returns token
 * @apiSuccessExample Success-Response:
 *     HTTP 201 OK
 *     {
 *       "token": "encrypted jwt"
 *     }
 */

 /**
 * @api {post} /api/login Log in to the application
 * @apiGroup Users
 * @apiParam {String} email Email field for login
 * @apiParam {String} password Password field for login
 * @apiSuccess token Logging in returns a token
 * @apiSuccessExample Success-Response:
 *     HTTP 200 OK
 *     {
 *       "token": "encrypted jwt"
 *     }
*/

/**
 * @api {get} /api/users?tag=tag1,tag2... Retrieve a list of users by sample tags
 * @apiGroup Users
 * @apiParam {param} tags Input a list of tags separated by commas
 * @apiSuccess User
 * @apiSuccessExample Success-Response:
 *     HTTP 200 OK
 *     {
 *       "id": 1,
 *       "email": "some@email.com",
 *       "first_name": "First Name",
 *       "last_name": "Last Name",
 *       "display_name": "Display Name",
 *       "payrate": 15.25,
 *       "location": "The Internet",
 *       "jobsCompleted": 2,
 *       "bio": "Bio",
 *       "average_rating": 2.3,
 *       "account_balance": 538.23,
 *       "samples": [
 *         {
 *           "id": 1,
 *           "owner": 1,
 *           "title": "Title",
 *           "description": "Description",
 *           "rating": 2.3,
 *           "s3_location": "aws_s3 url",
 *           "tags": [
 *             "tag1",
 *             "tag2",
 *             "..."
 *           ]
 *         }
 *       ]
 *     }
*/

/**
 * @api {get} /api/users?display_name=displayName Retrieve a user by display name
 * @apiGroup Users
 * @apiParam {param} display_name Input display name
 * @apiSuccess User
 * @apiSuccessExample Success-Response:
 *     HTTP 200 OK
 *     {
 *       "id": 1,
 *       "email": "some@email.com",
 *       "first_name": "First Name",
 *       "last_name": "Last Name",
 *       "display_name": "Display Name",
 *       "payrate": 15.25,
 *       "location": "The Internet",
 *       "jobsCompleted": 2,
 *       "bio": "Bio",
 *       "average_rating": 2.3,
 *       "account_balance": 538.23,
 *       "samples": [
 *         {
 *           "id": 1,
 *           "owner": 1,
 *           "title": "Title",
 *           "description": "Description",
 *           "rating": 2.3,
 *           "s3_location": "aws_s3 url",
 *           "tags": []
 *         }
 *       ]
 *     }
*/

/**
 * @api {get} /api/users Retrieve a list of all users
 * @apiGroup Users
 * @apiSuccess User
 * @apiSuccessExample Success-Response:
 *     HTTP 200 OK
 *     [
  *       {
 *         "id": 1,
 *         "email": "some@email.com",
 *         "first_name": "First Name",
 *         "last_name": "Last Name",
 *         "display_name": "Display Name",
 *         "payrate": 15.25,
 *         "location": "The Internet",
 *         "jobsCompleted": 2,
 *         "bio": "Bio",
 *         "average_rating": 2.3,
 *         "account_balance": 538.23,
 *         "samples": [
 *           {
 *             "id": 1,
 *             "owner": 1,
 *             "title": "Title",
 *             "description": "Description",
 *             "rating": 2.3,
 *             "s3_location": "aws_s3 url",
 *             "tags": []
 *           }
 *         ]
 *       },
 *       {
 *         "id": 2,
 *         "email": "some@email.com",
 *         "first_name": "First Name",
 *         "last_name": "Last Name",
 *         "display_name": "Display Name",
 *         "payrate": 15.25,
 *         "location": "The Internet",
 *         "jobsCompleted": 2,
 *         "bio": "Bio",
 *         "average_rating": 2.3,
 *         "account_balance": 538.23,
 *         "samples": [
 *           {
 *             "id": 1,
 *             "owner": 1,
 *             "title": "Title",
 *             "description": "Description",
 *             "rating": 2.3,
 *             "s3_location": "aws_s3 url",
 *             "tags": []
 *           }
 *         ]
 *       }
 *    ]
*/

/**
 * @api {get} /api/users/:id Retrieve a user by id
 * @apiGroup Users
 * @apiParam {param} id User id for retrieving specified user
 * @apiSuccess User
 * @apiSuccessExample Success-Response:
 *     HTTP 200 OK
 *     {
 *       "id": 1,
 *       "email": "some@email.com",
 *       "first_name": "First Name",
 *       "last_name": "Last Name",
 *       "display_name": "Display Name",
 *       "payrate": 15.25,
 *       "location": "The Internet",
 *       "jobsCompleted": 2,
 *       "bio": "Bio",
 *       "average_rating": 2.3,
 *       "account_balance": 538.23,
 *       "samples": [
 *         {
 *           "id": 1,
 *           "owner": 1,
 *           "title": "Title",
 *           "description": "Description",
 *           "rating": 2.3,
 *           "s3_location": "aws_s3 url",
 *           "tags": []
 *         }
 *       ]
 *    }
 */

/**
 * @api {put} /api/users/:id Update a user with specified id
 * @apiGroup Users
 * @apiParam {param} id User id for locating the user to update
 * @apiParam {object} data User data to be updated
 * @apiSuccess User
*/