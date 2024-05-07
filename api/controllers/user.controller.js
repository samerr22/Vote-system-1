import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import User from "../models/user.model.js";
import voteuser from "../models/vote.js";

export const test = (req, res) => {
  res.json({ message: "api is worker" });
};


export const addvote = async (req, res, next) => {
    
  const { username  } = req.body;

 





  const newUser = new voteuser({
      username,
      
      
  });

 

  try {
      await newUser.save();
      res.json(  ' succes');
      
  } catch (error) {

     next(error);



      
  }
}



export const getAlluser= async (req, res, next) => {
  try {
   

   

      const infoo = await User.find();

      if (infoo.length > 0) {
        res.json({
          message: "information details retrieved successfully",
          infoo,
        });
      } else {
        return next(errorHandle(404, " Information not fonud "));
      }
  
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};


export const vote= async (req, res, next) => {
  

  try {
  
    const user = await voteuser.findById(req.params.userId);

    if (!user) {
      // If the user doesn't exist, return a 404 error
      return res.status(404).json({ message: 'User not found' });
    }

    // Increment the points by 1
    user.points += 1;

    // Save the updated user
    await user.save();

    // Send a success response
    res.status(200).json({ message: 'Points incremented successfully', user });
  } catch (error) {
    // If an error occurs, send a 500 internal server error response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
};


export const getVoteUser= async (req, res, next) => {
  try {
   

   

      const infoo = await voteuser.find();

      if (infoo.length > 0) {
        res.json({
          message: "information details retrieved successfully",
          infoo,
        });
      } else {
        return next(errorHandle(404, " Information not fonud "));
      }
  
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};




export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};








