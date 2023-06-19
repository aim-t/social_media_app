import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  picturePath: String,
  userPicturePath: String,
  likes: {
    type: Map,
    of: Boolean,
  },
  comments:{
    type: Array,
    default: [],
  },
},
  { timestamps: true }
);

/* for the likes functionality, we'll have an obj (in MONGODB, it is a map) with the users' ids who liked the post set to true. Check if the user Id exists in this map or not. If it is in this map, it willa always be set to true
  We could have used array but it is o(n) and map is o(1) for lookup time*/

const Post  = mongoose.model("Post", postSchema);
export default Post;