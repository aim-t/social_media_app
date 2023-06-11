import User from "../models/User.js";

// READ 
export const getUser =  async (req, res) =>{

    try {
        const { id } = req.params; //get user's id 
        const user = await User.findById(id); // return user's info by id

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserFriends = async (req, res) =>{

    try {
        const { id } = req.params;
        const user = await User.findById(id) 
        // get user's info by id and then find the list of friends and get their info by mapping over the array

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        );

        // format the schema before sending back to the frontend
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return {  _id, firstName, lastName, occupation, location, picturePath }
            }
        ); 
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


//Update friends list

export const addRemoveFriend = async (req, res) =>{

    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id); // get user's info by id
        const friend = await User.findById(friendId); // get friend's id of the user 

        // if the friend's id is present in user's own info , then remove the friend's id to unfriend them 
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter(id => id !== friendId);
            friend.friends = friend.friends.filter(id => id !== id);
        } else { // if friendId is not present in friend list , then add them to the array to follow/friend them  
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save(); // save the updated data
        await friend.save(); 

        //format the friends list 
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return {  _id, firstName, lastName, occupation, location, picturePath }
            }
        ); 

        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}