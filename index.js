import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB } from './src/config/db.js';
import userRoute from './src/routes/userRoute.js';
import tipoPropiedadRoute from './src/routes/tipoPropiedadRoute.js';
import propiedadRoute from './src/routes/propiedadRoute.js';
import contactoRoute from './src/routes/contactoRoute.js';

// Carga de variables de entorno
dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Conexión a la base de datos MongoDB
connectDB();

// Rutas de la API RESTful
app.use('/api/usuarios', userRoute);
app.use('/api/tipos-propiedad', tipoPropiedadRoute);
app.use('/api/propiedades', propiedadRoute);
app.use('/api/contactos', contactoRoute);

// Ruta principal / de verificación de estado
app.get('/', (req, res) => {
  res.json({ mensaje: 'API RESTful - Inmobiliaria Nuevo Techo Activa' });
});

// Configuración y encendido del servidor
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});