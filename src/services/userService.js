import Usuario from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const registerUserService = async (userData) => {
  const existingUser = await Usuario.findOne({ email: userData.email });
  if (existingUser) throw new Error('El correo electrónico ya está registrado.');

  const user = await Usuario.create(userData);

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

export const loginUserService = async (email, password) => {
  const user = await Usuario.findOne({ email }).select('+password');
  if (!user) throw new Error('Credenciales inválidas.');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Credenciales inválidas.');

  const token = jwt.sign(
    { id: user._id, email: user.email, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
};

export const getAllUsersService = async () => {
  return await Usuario.find();
};