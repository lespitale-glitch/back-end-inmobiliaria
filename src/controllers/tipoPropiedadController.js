import * as tipoService from '../services/tipoPropiedadService.js';

export const getTipos = async (req, res) => {
  try {
    const tipos = await tipoService.getTiposPropiedadService();
    res.status(200).json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipos de propiedad.' });
  }
};

export const createTipo = async (req, res) => {
  try {
    const nuevoTipo = await tipoService.createTipoPropiedadService(req.body);
    res.status(201).json(nuevoTipo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTipo = async (req, res) => {
  try {
    const eliminado = await tipoService.deleteTipoPropiedadService(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Tipo de propiedad no encontrado.' });
    }
    res.status(200).json({ mensaje: 'Tipo de propiedad eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el tipo de propiedad.' });
  }
};