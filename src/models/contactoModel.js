import mongoose from 'mongoose';

const contactoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    telefono: {
      type: String,
      trim: true
    },
    zona: {
      type: String,
      trim: true
    },
    metros_cuadrados: {
      type: Number
    },
    mensaje: {
      type: String,
      required: true
    },
    acepta_novedades: {
      type: Boolean,
      default: false
    },
    fecha: {
      type: Date,
      default: Date.now
    },
    tipo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TipoPropiedad'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Contacto', contactoSchema, 'Contactos');