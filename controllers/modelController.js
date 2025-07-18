import { User } from "../models/userModel.js";
import { Certificate } from "../models/certificateModel.js";

const readUser = async (userName) => {
    try {
        let user = await User.findOne({name: userName}).select("name email");
        return user;
    } catch (error) {
        throw error;
    }
}

const readUser4Login = async (userName) => {
    try {
        let user = await User.findOne({name: userName});
        return user;
    } catch (error) {
        throw error;
    }
}

const readAllUsers = async(start, limit) => {
    try {
        const users = await User.find().select("name email").skip(start).limit(limit);
        return users;
    } catch (error) {
        throw error;
    }
}

const createUser = async(user) => {
    try {
        const nameTaken = await User.findOne({name: user.name});
        const emailTaken = await User.findOne({email: user.email});
        if (!nameTaken && !emailTaken) {
            await User.create(user);
            return {code: 200, info: "User created succesfully"};
        }
        return {info: "Username or email already taken"};
    } catch (error) {
        throw error;
    }
}

const updateUser = async(username, user) => {
    try {
        await User.findOneAndUpdate({name: username}, user);
        return {info: "User updated succesfully"};
    } catch (error) {
        throw error;
    }
}

const deleteUser = async(username) => {
    try {
        await User.findOneAndDelete({name: username});
        return {info: "User deleted succesfully"};
    } catch (error) {
        throw error;
    }
}

const readOneCertificate = async(id) => {
    try {
        const certificate = await Certificate.findById(id);
        return certificate;
    } catch (error) {
        throw error;
    }
}

const createCertificates = async(certificates) => {
    try {
        await Certificate.create(certificates);
        return {info: "Certificates created succesfully"};
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const readAllCertificates = async(start, limit) => {
    try {
        const certificates = await Certificate.find().skip(start).limit(limit);
        return certificates;
    } catch (error) {
        throw error;
    }
}

const readAllCertificates41User = async(name, start, limit) => {
    try {
        const certificates = await Certificate.find({username: name}).skip(start).limit(limit);
        return certificates;
    } catch (error) {
        throw error;
    }
}

const searchCertificates = async (start, limit, search) => {
    try {
        const certificates = await Certificate.fuzzySearch(search).skip(start).limit(limit);
        return certificates;
    } catch (error) {
        throw error;
    }
}

const searchCertificates41User = async (start, limit, search, name) => {
    try {
        const certificates = await Certificate.fuzzySearch(search, {username: name}).skip(start).limit(limit);
        return certificates;
    } catch (error) {
        throw error;
    }
}

const updateOneCertificate = async(id, certificate) => {
    try {
        await Certificate.findByIdAndUpdate(id, certificate);
        return {info: "Certificate updated succesfully"};
    } catch (error) {
        throw error;
    }
}

const deleteOneCertificate = async(id) => {
    try {
        await Certificate.findByIdAndDelete(id);
        return {info: "Certficate deleted succesfully"};
    } catch (error) {
        throw error;
    }
}

const deleteManyCerts = async(id_array) => {
    try {
        const result = await Certificate.deleteMany({
            _id: {$in: id_array}
        });
        return {info: "Certficates deleted succesfully"};
    } catch (error) {
        throw error;
    }
}

const deleteAllCertificates = async() => {
    try {
        await Certificate.deleteMany();
        return {info: "Certficates deleted succesfully"};
    } catch (error) {
        throw error;
    }
}

export default {
    readUser,
    readUser4Login,
    readAllUsers,
    createUser,
    updateUser,
    deleteUser,
    readOneCertificate,
    readAllCertificates, 
    readAllCertificates41User, 
    searchCertificates,
    searchCertificates41User,
    createCertificates,
    updateOneCertificate,
    deleteOneCertificate,
    deleteManyCerts,
    deleteAllCertificates

}