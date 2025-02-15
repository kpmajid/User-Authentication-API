import User from "../models/User.js";

const search = async (req, res) => {
  try {
    const { username, email } = req.query;
    const filter = {};

    if (username) filter.username = { $regex: username };
    if (email) filter.email = { $regex: email };

    const users = await User.find(filter).select("-password");

    res.send(users);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export { search };
