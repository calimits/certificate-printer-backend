import mc from "./modelController.js";
import ec from "./errorController.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const getUser = async (req, res) => {
    try {
        const userName =  req.params.username;
        const user = await mc.readUser(userName);
        if (!user) return ec.e404(req, res);
        res.status(200).json(user);
    } catch (error) {
        ec.e500(req, res, error);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const start = Math.abs(parseInt(req.query.start)) || 0;
        const limit = Math.abs(parseInt(req.query.limit)) > 20 ? 20 : parseInt(req.query.limit);
        console.log(start, limit);
        const users = await mc.readAllUsers(start, limit);
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        ec.e500(req, res, error);
    }
}

const postUser = async (req, res) => {
    try {
        const user = req.body;
        if (user.key != process.env.KEY) return  res.status(400).json({code: 400, info: "Incorrect permission key."});
        const hash = await bcrypt.hash(user.password, 10); 
        const response = await mc.createUser({name: user.name, email: user.email, password:hash});
        res.status(200).json(response);
    } catch (error) {
        ec.e500(req, res, error);  
    }
}

const putUser = async (req, res) => {
    try {
        const username = req.params.username;
        const user = req.body;
        const response = await mc.updateUser(username, user);
        res.status(200).json(response);
    } catch (error) {
        ec.e500(req, res, error);  
    }
}

const deleteUser = async (req, res) => {
    try {
        const username = req.params.username;
        const response = await mc.deleteUser(username);
        res.status(200).json(response);
    } catch (error) {
        ec.e500(req, res, error);  
    }
}

const login = async (req,res) => {
    try {
    const {name, password } = req.body;
    const user = await mc.readUser4Login(name);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' }); //mejorar errorController !!!!!!!!!!!!!!!!!!!!!
    }
    const token = jwt.sign({ id: user._id, username: user.name }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });
    res.json({token, name: user.name, id: user.id });
  } catch (err) {
    res.status(400).json({ error: err.message }); //copiarse de aqui
  }
}

const checkLoggedUserData = async (req, res) => {
    const {name, id, token} = req.body;
    if (!token || !name || !id) {
        return res.status(401).json({ error: 'Access denied.' }); 
    } 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const checkName = name === decoded.username;
        const checkID = id === decoded.id;
        res.status(200).json({checkID, checkName, checkToken: true})
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
}


export default {
    getUser,
    getAllUsers,
    postUser,
    putUser,
    deleteUser,
    login,
    checkLoggedUserData
}