import userModel from "../models/userModel.js";

// create user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }
    const newUser = new userModel({ name, email, password });
    const user = await newUser.save();
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all users
const getUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// delete user
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    console.log(req.params.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update user
const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userModel.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.name;
    user.password = password || user.password
    const updatedUser = await user.save();
    console.log(updatedUser)

    res.status(200).json({success:true, updatedUser})    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export { createUser, getUser, deleteUser, updateUser };
