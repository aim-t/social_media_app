# dummy_capstone

## Technologies
- Frontend
React as our framework, React Router for navigation, formik and yup for form and form validation, Redux toolkit for state management, with Redux with Persistent to store in local storage. React Dropzone for image upload.
- Backend
Node js as our runtime, express Js as our backend framework, Mongoose as ORM for managing our database. JSONweb token for authentication and multer for file upload.

## Backend configuration ans setup
- Install nodemon so our server refreshes every time we save 
- Dependencies:
express: library for backend
body-parser: to process the request body
bcrypt: for password encryption
cors: for cross-origin request
dotenv: for environment variables
gridfs-stream: for file upload
multer, multer-gridfs-storage: to upload our files locally
helmet: for request safety
morgan: for logging 
jsonwebtoken: for authentication
mongoose: for MongoDB access 

update package.json with adding property ```"type":"module",``` to use the import/export statement instead of ```const require()``` syntax.