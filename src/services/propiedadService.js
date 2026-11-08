import Propiedad from '../models/propiedadModel.js';

export const getAllPropiedadesService = async (filter = {}) => {
  return await Propiedad.find(filter)
    .populate('agente_id', 'nombre email rol')
    .populate('tipo_id', 'nombre_tipo');
};

export const getPropiedadByIdService = async (id) => {
  return await Propiedad.findById(id)
    .populate('agente_id', 'nombre email rol')
    .populate('tipo_id', 'nombre_tipo');
};

export const createPropiedadService = async (data) => {
  return await Propiedad.create(data);
};

export const updatePropiedadService = async (id, data) => {
  return await Propiedad.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .populate('agente_id', 'nombre email rol')
    .populate('tipo_id', 'nombre_tipo');
};

export const deletePropiedadService = async (id) => {
  return await Propiedad.findByIdAndDelete(id);
};