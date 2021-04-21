# Social-Network

/posts ROUTES (Authenticated):
- GET /posts/:noOfPosts can be used here to limit the number of posts in your feed.
- GET /posts: Returns all the posts associated with your followings with default limit 10.
- POST /posts: Create a post for the user authenticated.

/followers ROUTES (Authenticated):
- GET /followers/:noOfFollowers can be used here to limit the number of followers to view.
- GET /followers: Returns all of the user's followers with default limit 10.
- POST /followers/:userID: Follow a user.
- DELETE /followers/:userID: Unfollow a user.

/users ROUTES (Unauthenticated):
- GET /users/login: To login to the account using form-data.
- POST /users/addUser: To add a new user using form-data.

POSTMAN:
- Have to insert Authorization Header in requests for JWT Authentication.

POINTS:
- social_networkDB is the file for PostgreSQL database.
- Express, PostgreSQL, Sockets and NodeJS.

MODULES COMPLETED:
- Data Models
- User Relationships
- Authentication
- Social Feed
