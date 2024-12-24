**User Registration Endpoint**
==========================

### Description

The `/user/register` endpoint allows users to register for an account by providing their first name, last name, email, and password.

### Request

* **Method:** `POST`
* **URL:** `/users/register`
* **Content-Type:** `application/json`

### Request Body

The request body should contain the following fields:

* **firstName**: The user's first name (required, string, min length 3)
* **lastName**: The user's last name (required, string, min length 3)
* **email**: The user's email address (required, string, unique)
* **password**: The user's password (required, string)

Example request body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```
### Response

* **Status Code:** `201 Created` if the registration is successful
* **Status Code:** `400 Bad Request` if the request is invalid or if the email address is already in use

### Response Body

If the registration is successful, the response body will contain the following fields:

* **token**: A JSON Web Token (JWT) that can be used to authenticate the user
* **user**: The newly created user object

Example response body:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaGFuIEdghjfgfkjhfcyujhgmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.YIE6r1gQ1OZzQxQ6hjkgLg",
  "user": {
    "_id": "5f6a6a6a6a6a6a6a6a6a6a",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com"
  }
}
```
Note that the `token` field is a JWT that can be used to authenticate the user in subsequent requests.

As for the data requirements, they are defined in the `models/user.model.js` file as follows:
```javascript
const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      require: true,
      minlength: [3, 'First name must be at least 3 characters long']
    },
    lastName: {
      type: String,
      minlength: [3, 'Last name must be at least 3 characters long']
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});
```
This schema defines the structure of the user document in the database, including the fields and their data types, as well as any validation rules that apply to those fields.


**User Login Endpoint**
==========================

### Description

The `/users/login` endpoint allows users to log in to their account by providing their email and password.

### Request

* **Method:** `POST`
* **URL:** `/users/login`
* **Content-Type:** `application/json`

### Request Body

The request body should contain the following fields:

* **email**: The user's email address (required, string)
* **password**: The user's password (required, string)

Example request body:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
### Response

* **Status Code:** `200 OK` if the login is successful
* **Status Code:** `401 Unauthorized` if the email or password is incorrect

### Response Body

If the login is successful, the response body will contain the following fields:

* **token**: A JSON Web Token (JWT) that can be used to authenticate the user
* **user**: The user object

Example response body:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtchvjhvjlvjkvhgfbvmngfvlLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.YIE6r1gQ1OZzQxQ6hjkgLg",
  "user": {
    "_id": "5f6a6a6a6a6a6a6a6a6a6a",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com"
  }
}
```
Note that the `token` field is a JWT that can be used to authenticate the user in subsequent requests.
