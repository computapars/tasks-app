# Introduction

YourTurn API was built from the ground-up with MongoDb, Mongoose and Express.

## Authorization

All API requests require the use of a unique JSON Web Token signature. You can clone this repo and generate a new signature and signature that should be store in a .env file.

To authenticate an API request, you should provide a JSON Web Token in the `Authorization` header.

## Responses

Many API endpoints return the JSON representation of the resources created or edited. However, if an invalid request is submitted, or some other error occurs, YourTurn returns a JSON response in the following format:

```javascript
{
  "message" : string,
  "success" : bool,
}
```

The `message` attribute contains a message commonly used to indicate errors or, in the case of deleting a resource, success that the resource was properly deleted.

The `success` attribute describes if the transaction was successful or not.


## Status Codes

YourTurn returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
