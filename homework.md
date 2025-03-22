- Create Repository
- Initialize Repository
- node_modules, package.json, package_lock.json diff
- Install express
- Create server
- LIsten to port
- Write request Handlers for /test /hello
- Install nodemon and update the scripts insdie package.json
- What are dependencies
- What is the use of "- g" flag while npm install
- Difference between caret and tilde(^ vs ~)

- initialize git
- .gitignore file
- Create a remote repo on github
- Push all code to remote origin
- Play with route and route extension ex. /hello, /, /hello/2, etc

- /// Order of the routes matter

- install Postman and make a workspcae/collection > make test API call
- wirte logic to handle GET, POST, PUT, PATCH, DELET API calls and test themwith postman
- Exploer routing and use of ?, +, (), \*, in the routes
- Use of regex in routes /a/ , /.\*fly$/
- Reading the query params in the routes
- Readin the dynamic routes

- Handling Mutliple Route Handlers
- next()
- next function and errors along with res.send()

- app.use("/user", rH, rH2, rH3, rH4, rH5, rH6);
- app.use("/user", [rH, rH2, rH3, rH4, rH5, rH6]);
- what is Middleware
- How express JS basically handles requests behind the scens

- difference between app.use() and app.all()
- Write dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
  -Error Handling using app.user("/", (err,req,res,next)={});

5.

- Create a free cluster on Mongodb official wbsite(Mongo Atlas)
- Install Mongoose library
- Connect your application to the database <"cnnection-url"/devTinder>
- Call the connectDB function and connect to database before starting application on the server port(7777)

6.

- Create UserSchema & user Model
- Create POST /signup API to add data to database
- Push some documents using API calls from postman
- Handle Error with try-catch

7.

- Difference between Javascript Object & JSON
- Add the express.json middleware
- Make your signup API dynamic to recieve data from the end user
- User.findONe() with duplicate email ids, whci object is returned
- API- Get user by email
- API - Feed API - get all the users from the database
- API -Get user with findById()
- Create a delete user API
- Difference between PUT & PATCH api
- API update a user
- Explore the Mongoose Documentation for MOdel methods
- What re the options in a model.findByIdAndUpdate method, expore all the options
- API updata the user with emailId

8

- Explore schema options from the documention
- add required, unique, lowercase,min, minLength, trim
- Add default,
- Create a custome validate function for gender
- Improve the DB schema - PUT all appropriate validations on each feild in Schema
- Add timestamp to schema
- API level validation on Patch requrest & signup post api
- Add API validatation for each field
- DATA SANITIZATION Means API LEVEL VALIDATION
- API level validation for Patch request & signup post api
- DATA sanitizing - Add API validation for each field
- INstall validator
- Explore the validator library functions and Use validator function for password, email, photoUrl
- NEVER TRUST req.body

9.

- Validate data in Signup API
- Install bcrypt package
- create password using bcrypt.hash() and save the user with enccrypted password
- Create Login API
- Compare passwords and throw errors if email or password is invalid

10.

- install the cookie-parser
- just send the dummy cookie to the user
- creaet GET /profile API and check if you get the cookie back
- install jsonwebtoken
  -In login API, after email and password validation, create a JWT token and send it to user in cookie
  res.cookie("token", token)

- Read the cookies inside your profile API and find the looged in user
  // const cookie = req.cookie; // will not work
  const cookies = req.cookies;

Why Does the Server Attach the JWT Token to a Cookie?
When a user logs in, the server validates the credentials, generates a JWT token, and attaches it to a cookie before sending it to the browser. Here’s why:

1️⃣ Cookies Store the Token Securely
Instead of storing the JWT in localStorage or sessionStorage, storing it in cookies provides better security:

HTTP-only: The cookie cannot be accessed via JavaScript (prevents XSS attacks).

Secure: Only sent over HTTPS, preventing MITM attacks.

Same-Origin Restrictions: Only accessible to the domain that set it.

📌 Summary
✅ Why store JWT in a cookie?

More Secure than localStorage (prevents XSS attacks).

Automatic Handling: Sent with every request, no need for manual headers.

Persistent Sessions: User stays logged in across tabs and refreshes.

CSRF Protection: With SameSite settings.
