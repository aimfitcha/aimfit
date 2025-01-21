import User from "@/app/models/user.model";
import bcryptjs from "bcryptjs";
import { errorHandeler } from "@/app/lib/errorHandeler.js"; 
import jwt from 'jsonwebtoken'

const signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const {email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new userModel({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let validUser = await userModel.findOne({ email }).populate('listing').populate('bookmark').populate('cart').populate('order');
    if (!validUser) return next(errorHandeler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandeler(401, 'Wrong credentials!'));
    const token =jwt.sign({ id: validUser._id ,role:validUser.role}, process.env.JWT_SECRET);
    console.log(validUser);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token)
      .status(200)
      .json({
        token:token,
        rest
      });
  } catch (error) {
    next(error);
  }
};
const userControl = {
  signup,
  signin,
};

export default userControl;