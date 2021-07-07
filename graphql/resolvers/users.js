const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server"); // handling errors

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const User = require("../../models/User");
const { SECRET_KEY } = require("../../config");

// helpers
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });

      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      if (!user) {
        errors.general = "User not found!";
        throw new UserInputError("User not found Stupid!", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong Credentials!";
        throw new UserInputError("Wrong credentials!", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors, seems its not match!", { errors });
      }

      // make sure user doesn't already exist
      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Username is already exist bitch!", {
          errors: {
            username: "This username is already exist",
          },
        });
      }

      // hash password and create an auth token => JWT
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    // async createPost(_, { body }, context) {
    //   const user = checkAuth(context);
    //   console.log(user);

    //   const newPost = new Post({
    //     body,
    //     user: user.id,
    //     username: user.username,
    //     createdAt: new Date().toISOString(),
    //   });

    //   const post = await newPost.save();

    //   return post;
    // },
  },
};
