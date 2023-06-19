import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE 

//this will handle the fnc we created in index.js. It will have an img passed through the middleware. 
export const createPost = async (req, res) =>{
    try {
        const {userId, description, picturePath } = req.body; // This is everything the frontend will send us
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save(); //save the post, so now the newsfeed will have all the posts in the frontend
        
        const post = await Post.find(); //grab all the posts including the newly posted post
        res.status(201).json(post); //post created

    } catch (error) {
        res.status(409).json({ message: error.message }) //post not created
    }
}

//READ

//we get all the posts and just read them 
export const getFeedPosts = async (req, res) =>{
    try {       
        const post = await Post.find(); 
        res.status(200).json(post); //success 
    } catch (error) {
        res.status(404).json({ message: error.message }) //post not found
    }
}

//get posts for a specific user by their ID
export const getUserPosts = async (req, res) =>{
    try {       
        const { userId }= req.params;
        const post = await Post.find({userId}); 
        res.status(200).json(post); //success 
    } catch (error) {
        res.status(404).json({ message: error.message }) //post not found
    }
}

// UPDATE
export const likePost = async (req, res) =>{
    try {       
        const { id }= req.params; //grab relevant post by id
        const { userId } = req.body; //grab userId from the frontend
        const post = await Post.findById(id); //grab the post
        const isLiked = post.likes.get(userId); //we're checking if a specific userId exists in the likes obj. If it does, it means the user has liked the post

        if(isLiked){
            post.likes.delete(userId); //delete the userId if it already exists (unlike)
        } else {
            post.likes.set(userId, true); // add the userId if it doesn't exist (like post)
        }
        
        //update the post by finding it first and then passing the new likes
        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            {likes: post.likes},
            {new: true}
        )

        res.status(200).json(updatedPost); //pass in the updatedPost so that we can update the frontend i.e the like button will be active
    } catch (error) {
        res.status(404).json({ message: error.message }) 
    }   
}
