<a name="top"></a>
# Voicer Backend

## Badges
[![Maintainability](https://api.codeclimate.com/v1/badges/313de8028968cdb90d36/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/voicer-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/313de8028968cdb90d36/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/voicer-be/test_coverage)

Back end for Voicer

 - [Attributes](#Attributes)
   - [Add an attribute to a voice sample](#Add-an-attribute-to-a-voice-sample)
   - [Delete an attribute](#Delete-an-attribute)
   - [Edit the properties of an attribute](#Edit-the-properties-of-an-attribute)
   - [Retrieve all available attributes](#Retrieve-all-available-attributes)
 - [Users](#Users)
   - [Log in to the application](#Log-in-to-the-application)
   - [Register a user](#Register-a-user)
   - [Retrieve a list of all users](#Retrieve-a-list-of-all-users)
   - [Retrieve a list of users by sample tags](#Retrieve-a-list-of-users-by-sample-tags)
   - [Retrieve a user by display name](#Retrieve-a-user-by-display-name)
   - [Retrieve a user by id](#Retrieve-a-user-by-id)
   - [Update a user with specified id](#Update-a-user-with-specified-id)
 - [VoiceSamples](#VoiceSamples)
   - [Get all voice samples](#Get-all-voice-samples)
   - [Get voice sample by id](#Get-voice-sample-by-id)
   - [Get voice samples by user id](#Get-voice-samples-by-user-id)

___


# <a name='Attributes'></a> Attributes

## <a name='Add-an-attribute-to-a-voice-sample'></a> Add an attribute to a voice sample
[Back to top](#top)

```
POST /api/attribute
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| voice_sample_id | `Integer` | <p>ID of the voice sample to attach attribute to</p> |
| title | `String` | <p>Name of the attribute</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Integer` | <p>ID of many:many association</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP 201 Created
{
  123
}
```

## <a name='Delete-an-attribute'></a> Delete an attribute
[Back to top](#top)

```
DELETE /api/attribute/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Integer` | <p>ID of the attribute to be deleted</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| number | `Integer` | <p>Number rows deleted</p> |

## <a name='Edit-the-properties-of-an-attribute'></a> Edit the properties of an attribute
[Back to top](#top)

```
PUT /api/attribute/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Integer` | <p>ID of the attribute to be edited</p> |
| data | `json` | <p>Data of the attribute to be edited</p> |

## <a name='Retrieve-all-available-attributes'></a> Retrieve all available attributes
[Back to top](#top)

```
GET /api/attribute
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| attribute | `json` | <p>Attribute</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP 200 ok
{
  "id": 1,
  "title": "Attribute Title"
}
```

# <a name='Users'></a> Users

## <a name='Log-in-to-the-application'></a> Log in to the application
[Back to top](#top)

```
POST /api/login
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `String` | <p>Email field for login</p> |
| password | `String` | <p>Password field for login</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token |  | <p>Logging in returns a token</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP 200 OK
{
  "token": "encrypted jwt"
}
```

## <a name='Register-a-user'></a> Register a user
[Back to top](#top)

```
POST /api/register
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| first_name | `String` | <p>First Name field for User</p> |
| last_name | `String` | <p>Last Name field for User</p> |
| display_name | `String` | <p>Display Name field for User</p> |
| email | `String` | <p>Email field for User</p> |
| password | `String` | <p>Password field for User</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token |  | <p>Registers user and returns token</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP 201 OK
{
  "token": "encrypted jwt"
}
```

## <a name='Retrieve-a-list-of-all-users'></a> Retrieve a list of all users
[Back to top](#top)

```
GET /api/users
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| User |  |  |

### Success response example

#### Success response example - `Success-Response:`

```json
 HTTP 200 OK
 [
   {
     "id": 1,
     "email": "some@email.com",
     "first_name": "First Name",
     "last_name": "Last Name",
     "display_name": "Display Name",
     "payrate": 15.25,
     "location": "The Internet",
     "jobsCompleted": 2,
     "bio": "Bio",
     "average_rating": 2.3,
     "account_balance": 538.23,
     "samples": [
       {
         "id": 1,
         "owner": 1,
         "title": "Title",
         "description": "Description",
         "rating": 2.3,
         "s3_location": "aws_s3 url",
         "tags": []
       }
     ]
   },
   {
     "id": 2,
     "email": "some@email.com",
     "first_name": "First Name",
     "last_name": "Last Name",
     "display_name": "Display Name",
     "payrate": 15.25,
     "location": "The Internet",
     "jobsCompleted": 2,
     "bio": "Bio",
     "average_rating": 2.3,
     "account_balance": 538.23,
     "samples": [
       {
         "id": 1,
         "owner": 1,
         "title": "Title",
         "description": "Description",
         "rating": 2.3,
         "s3_location": "aws_s3 url",
         "tags": []
       }
     ]
   }
]
```

## <a name='Retrieve-a-list-of-users-by-sample-tags'></a> Retrieve a list of users by sample tags
[Back to top](#top)

```
GET /api/users?tag=tag1,tag2...
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| tags | `param` | <p>Input a list of tags separated by commas</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| User |  |  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP 200 OK
{
  "id": 1,
  "email": "some@email.com",
  "first_name": "First Name",
  "last_name": "Last Name",
  "display_name": "Display Name",
  "payrate": 15.25,
  "location": "The Internet",
  "jobsCompleted": 2,
  "bio": "Bio",
  "average_rating": 2.3,
  "account_balance": 538.23,
  "samples": [
    {
      "id": 1,
      "owner": 1,
      "title": "Title",
      "description": "Description",
      "rating": 2.3,
      "s3_location": "aws_s3 url",
      "tags": [
        "tag1",
        "tag2",
        "..."
      ]
    }
  ]
}
```

## <a name='Retrieve-a-user-by-display-name'></a> Retrieve a user by display name
[Back to top](#top)

```
GET /api/users?display_name=displayName
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| display_name | `param` | <p>Input display name</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| User |  |  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP 200 OK
{
  "id": 1,
  "email": "some@email.com",
  "first_name": "First Name",
  "last_name": "Last Name",
  "display_name": "Display Name",
  "payrate": 15.25,
  "location": "The Internet",
  "jobsCompleted": 2,
  "bio": "Bio",
  "average_rating": 2.3,
  "account_balance": 538.23,
  "samples": [
    {
      "id": 1,
      "owner": 1,
      "title": "Title",
      "description": "Description",
      "rating": 2.3,
      "s3_location": "aws_s3 url",
      "tags": []
    }
  ]
}
```

## <a name='Retrieve-a-user-by-id'></a> Retrieve a user by id
[Back to top](#top)

```
GET /api/users/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `param` | <p>User id for retrieving specified user</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| User |  |  |

### Success response example

#### Success response example - `Success-Response:`

```json
 HTTP 200 OK
 {
   "id": 1,
   "email": "some@email.com",
   "first_name": "First Name",
   "last_name": "Last Name",
   "display_name": "Display Name",
   "payrate": 15.25,
   "location": "The Internet",
   "jobsCompleted": 2,
   "bio": "Bio",
   "average_rating": 2.3,
   "account_balance": 538.23,
   "samples": [
     {
       "id": 1,
       "owner": 1,
       "title": "Title",
       "description": "Description",
       "rating": 2.3,
       "s3_location": "aws_s3 url",
       "tags": []
     }
   ]
}
```

## <a name='Update-a-user-with-specified-id'></a> Update a user with specified id
[Back to top](#top)

```
PUT /api/users/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `param` | <p>User id for locating the user to update</p> |
| data | `object` | <p>User data to be updated</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| User |  |  |

# <a name='VoiceSamples'></a> VoiceSamples

## <a name='Get-all-voice-samples'></a> Get all voice samples
[Back to top](#top)

```
GET /api/voice/sample
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| sample | `json` | <p>Voice Sample</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP 200 OK
{
   "id": 1,
   "owner": 1,
   "title": "Title",
   "description": "Description",
   "rating": 2.3,
   "s3_location": "aws_s3 url",
   "tags": [
     "tag1",
     "tag2",
     "..."
   ]
}
```

## <a name='Get-voice-sample-by-id'></a> Get voice sample by id
[Back to top](#top)

```
GET /api/voice/sample/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Integer` | <p>ID of voice sample</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| sample | `json` | <p>Voice Sample</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
 HTTP 200 OK
{
   "id": 1,
   "owner": 1,
   "title": "Title",
   "description": "Description",
   "rating": 2.3,
   "s3_location": "aws_s3 url",
   "tags": [
     "tag1",
     "tag2",
     "..."
   ]
}
```

## <a name='Get-voice-samples-by-user-id'></a> Get voice samples by user id
[Back to top](#top)

```
GET /api/voice/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Integer` | <p>ID of user</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| samples | `json` | <p>Voice Samples</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP 200 OK
[
  {
     "id": 1,
     "owner": 1,
     "title": "Title",
     "description": "Description",
     "rating": 2.3,
     "s3_location": "aws_s3 url",
     "tags": [
       "tag1",
       "tag2",
       "..."
     ]
  }
  {
     "id": 2,
     "owner": 1,
     "title": "Title",
     "description": "Description",
     "rating": 2.3,
     "s3_location": "aws_s3 url",
     "tags": [
       "tag1",
       "tag2",
       "..."
     ]
  }
]
```
