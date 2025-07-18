import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' }); //mejorar al error controller
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Almacena la información del usuario en el objeto `req` para autorizacion, pero por ahora no hay
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' }); //ec aqui tambien 
  }
};

export default {
    authenticate
}