import * as contactoService from '../services/contactoService.js';

export const createContacto = async (req, res) => {
  try {
    const nuevoContacto = await contactoService.createContactoService(req.body);
    res.status(201).json(nuevoContacto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getContactos = async (req, res) => {
  try {
    const contactos = await contactoService.getAllContactosService();
    res.status(200).json(contactos);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar los mensajes de contacto.' });
  }
};