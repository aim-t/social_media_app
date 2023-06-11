import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) =>{ // next makes the fnc continue
    // use this verifyToken fnc in middleware (any order) but before the route and after the controller
    try {
        // Grab the authorization header from frontend to backed using this key
        let token = req.header("Authorization");

        if(!token){ // Don't grant access unless token exists
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){ //if the token starts with 'Bearer ' str, grab the token (but remove the first 7 letters since that is just the word "Bearer ") 
            token = token.slice(7, token.length).trimLeft();        
        }

        // verify the token with jwt secret string
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); //use this for the middleware so that it would proceed to the next step

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}