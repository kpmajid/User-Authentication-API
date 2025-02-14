const validateRegister = (req, res, next) => {
  const { username, email, password, fullName, gender, dateOfBirth, country } =
    req.body;

  if (
    !username ||
    !email ||
    !password ||
    !fullName ||
    !gender ||
    !dateOfBirth ||
    !country
  ) {
    return res.status(400).json({
      message: "Please provide all required fields!",
    });
  }

  if (username.length < 3 || username.length > 20) {
    return res.status(400).json({
      message: "Username should be between 3 and 20 characters!",
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format!",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password should be at least 8 characters!",
    });
  }

  next();
};

export default validateRegister;
