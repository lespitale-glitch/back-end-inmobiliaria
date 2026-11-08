import mongoose from 'mongoose';

const tipoPropiedadSchema = new mongoose.Schema(
  {
    nombre_tipo: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('TipoPropiedad', tipoPropiedadSchema, 'Tipos_Propiedad');