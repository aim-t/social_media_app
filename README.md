# dummy_capstone

## Technologies
- #### Frontend
React as our framework <br />
React Router for navigation <br />
Formik and Yup for form and form validation <br />
Redux toolkit for state management, with Redux with Persistent to store in local storage<br />
React Dropzone for image upload.
- #### Backend
Node js as our runtime <br />
Express Js as our backend framework<br />
Mongoose as ORM for managing our database<br />
JSON Web Token for authentication<br />
Multer for file upload.

## Backend configuration and setup
- Install nodemon so our server refreshes every time we save <br />

- <b>Dependencies:</b><br />
express: library for backend<br />
body-parser: to process the request body<br />
bcrypt: for password encryption<br />
cors: for cross-origin request<br />
dotenv: for environment variables<br />
gridfs-stream: for file upload<br />
multer, multer-gridfs-storage: to upload our files locally<br />
helmet: for request safety<br />
morgan: for logging <br />
jsonwebtoken: for authentication<br />
mongoose: for MongoDB access <br />

- Update package.json with adding property ```"type":"module",``` to use the import/export statement instead of ```const require()``` syntax.

