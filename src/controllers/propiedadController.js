import * as propiedadService from '../services/propiedadService.js';

export const getPropiedades = async (req, res) => {
  try {
    const propiedades = await propiedadService.getAllPropiedadesService(req.query);
    res.status(200).json(propiedades);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar propiedades.' });
  }
};

export const getPropiedadById = async (req, res) => {
  try {
    const propiedad = await propiedadService.getPropiedadByIdService(req.params.id);
    if (!propiedad) {
      return res.status(404).json({ error: 'Propiedad no encontrada.' });
    }
    res.status(200).json(propiedad);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la propiedad.' });
  }
};

export const createPropiedad = async (req, res) => {
  try {
    const nuevaPropiedad = await propiedadService.createPropiedadService(req.body);
    res.status(201).json(nuevaPropiedad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePropiedad = async (req, res) => {
  try {
    const actualizada = await propiedadService.updatePropiedadService(
      req.params.id,
      req.body
    );
    if (!actualizada) {
      return res.status(404).json({ error: 'Propiedad no encontrada.' });
    }
    res.status(200).json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePropiedad = async (req, res) => {
  try {
    const eliminada = await propiedadService.deletePropiedadService(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ error: 'Propiedad no encontrada.' });
    }
    res.status(200).json({ mensaje: 'Propiedad eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la propiedad.' });
  }
};