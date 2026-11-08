import Contacto from '../models/contactoModel.js';

export const createContactoService = async (data) => {
  return await Contacto.create(data);
};

export const getAllContactosService = async () => {
  return await Contacto.find()
    .populate('tipo_id', 'nombre_tipo')
    .sort({ fecha: -1 });
};