import bcrypt from "bcrypt"; //for password encryption
import  jwt  from "jsonwebtoken"; //for authorization
import User from "../models/User.js"; //User model

// Register User

export const register = async(req, res) =>{

    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location, 
            occupation
        } =  req.body; /* We'll destructure these properties and grab them from req.body
        From the frontend, we'll send an obj with these args. and use them in this function */
    
        const salt = await bcrypt.genSalt();  // We are getting random salt provided by bcrypt which we'll use for pwd encryption 
        const passwordHash  = await bcrypt.hash(password, salt); // Hash the pwd with salt
        
        /* This register fnc will work by encrypting the pwd, save it and when the user tries to login with pwd, we'll salt it again
        and make sure it is the correct one and we'll give them a JWT  */
        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            friends,
            location, 
            occupation,
            viewedProfile : Math.floor(Math.random() * 10000),
            impressions : Math.floor(Math.random() * 10000),
        }); // we won't implement the viewedProfile and impressions in this project
        
        const savedUser =  await newUser.save(); // save user
        res.status(201).json(savedUser); //send the user info (savedUser in JSON format) back to the frontend with status code if user creation is successful
    
    } catch (error) {
        res.status(500).json({error: error.message}) ;
        //In case of any error, the frontend with get the status 500 with the error message
    }

} /* async bcz we'll be calling the MongoDB which takes time just like a fetch api
req is the request body that we get from the frontend and res is the response that we will be sending to the frontend
*/


// Login User

export const login = async (req, res) =>{
    //very basic authentication where the user gets a token and use it to signin

    try {
        const { email, password } = req.body;  // we're grabbing the email and pwd when the user tries to login
        const user = await User.findOne({email : email}); // Use mongoose to find the user with this email
        
        if(!user) { //return status 400 if user doesn't exist
            return res.status(400).json({ msg : "User does not exist"}); 
        }

        const isMatch = await bcrypt.compare( password, user.password); /* use bcrypt to compare the input pwd and pwd in db with the same salt.*/

        if(!isMatch) { //if the passwords don't match, then return status 400 with msg 
            return res.status(400).json({ msg: "Invalid password!"})
        }

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET); //sign the user in with secret jwt secret string form .env file. It can be anu string but I used an online generator
        delete user.password; // delete pwd from data before sending it back to frontend
        res.status(200).json({ token, user }); // send token and user data (with hashed pwd) back to frontend


    } catch (error) {
        res.status(500).json({error: error.message}) ;
    }
}

