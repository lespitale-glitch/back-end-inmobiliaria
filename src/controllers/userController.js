import * as userService from '../services/userService.js';

export const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUserService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
};