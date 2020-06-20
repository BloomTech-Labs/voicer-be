<a name="top"></a>
# voicer-be v1.0.0

## Badges
[![Maintainability](https://api.codeclimate.com/v1/badges/313de8028968cdb90d36/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/voicer-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/313de8028968cdb90d36/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/voicer-be/test_coverage)

Back end for Voicer

 - [Users](#Users)
   - [Log in to the application](#Log-in-to-the-application)
   - [Register a user](#Register-a-user)
   - [Retrieve a list of all users](#Retrieve-a-list-of-all-users)
   - [Retrieve a list of users by sample tags](#Retrieve-a-list-of-users-by-sample-tags)
   - [Retrieve a user by display name](#Retrieve-a-user-by-display-name)
   - [Retrieve a user by id](#Retrieve-a-user-by-id)
   - [Update a user with specified id](#Update-a-user-with-specified-id)

___


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
  "token": "encrypted token"
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
  "token": "encrypted token"
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
