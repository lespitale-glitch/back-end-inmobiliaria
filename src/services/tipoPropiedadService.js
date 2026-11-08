import TipoPropiedad from '../models/tipoPropiedadModel.js';

export const getTiposPropiedadService = async () => {
  return await TipoPropiedad.find();
};

export const createTipoPropiedadService = async (data) => {
  return await TipoPropiedad.create(data);
};

export const deleteTipoPropiedadService = async (id) => {
  return await TipoPropiedad.findByIdAndDelete(id);
};