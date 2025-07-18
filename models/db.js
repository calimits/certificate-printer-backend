import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB}`);
    console.log('Conexión a MongoDB establecida.');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); 
  }
}

export {connectDB};


