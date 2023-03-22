import { DataService } from "../services/data.service.js";
import { pathBuilder } from "../utils/utils.js";
import { v4 as uuid } from "uuid";
import Joi from "joi";
import bcrypt from "bcryptjs";

const userSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

class User {
  constructor(firstName, lastName, email, password) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

const userPath = pathBuilder(["..", "data", "user.json"]);

export class AuthModel {
  static async getAllUsers() {
    return DataService.readJSONFile(userPath);
  }
  static async saveUsers(users) {
    await DataService.saveJSONFile(userPath, users);
  }

  static async registerUser(userData) {
    const users = await this.getAllUsers();

    const userExists = users.some((user) => user.email === userData.email);

    if (userExists) throw new Error("Email already exists");

    const validation = userSchema.validate(userData);

    if (validation?.error) throw new Error(validation.error.details[0].message);

    const { firstName, lastName, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User(firstName, lastName, email, hashedPassword);
    const updatedUsers = [...users, newUser];

    await this.saveUsers(updatedUsers);
    const { password: userPassword, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  static async loginUser(credentials) {
    const { email, password } = credentials;

    const users = await this.getAllUsers();

    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) throw new Error("Invalid Credentials");

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) throw new Error("Invalid Credentials");

    const { password: userPassword, ...userWithoutPassword } = foundUser;
    return userWithoutPassword;
  }
}
