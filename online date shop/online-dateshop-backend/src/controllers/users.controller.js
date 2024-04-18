const User = require('../models/users.model');
const bcrypt = require("bcryptjs");
const MyQueryHelper = require('../configs/api.config')

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { fullname, username, email, password, role } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the hashed password
    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      role: role ? role : 'user'
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get all users with pagination
exports.getUsers = async (req, res) => {
  try {
    // finding all users data from database
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "no user found" });
    }

    // filtering users based on different types query
    const userQuery = new MyQueryHelper(User.find(), req.query).search('fullname').sort().paginate();
    const findUsers = await userQuery.query;

    const mappedUsers = findUsers?.map((data) => ({
      _id: data._id,
      username: data.username,
      fullname: data.fullname,
      email: data.email,
      role: data.role,
    }));

    res.status(200).json({
      data: mappedUsers,
      total_rows: users.length,
      response_rows: findUsers.length,
      total_page: req?.query?.keyword ? Math.ceil(findUsers.length / req.query.limit) : Math.ceil(users.length / req.query.limit),
      current_page: req?.query?.page ? parseInt(req.query.page, 10) : 1
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all users at a time
exports.getAllUsers = async (req, res) => {
  try {
    const results = await User.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to update a user
exports.deleteUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (foundUser.role === 'admin') {
      throw new Error("Admin can't be deleted.");
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
