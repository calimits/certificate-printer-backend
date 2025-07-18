import ec from "./errorController.js";
import mc from "./modelController.js";

const getOneCertificate = async(req,res) => {
    try {
        const id = req.params.id;
        const certificate = await mc.readOneCertificate(id);
        if (!certificate) return ec.e404(req,res,error);
        res.status(200).json(certificate);
    } catch (error) {
        ec.e404(req,res,error);
    }

}

const postCertificates = async(req,res) => {
    try {
        const certificates = req.body;
        const response = await mc.createCertificates(certificates);
        res.status(200).json(response);
    } catch (error) {
        ec.e500(req,res,error);
    }

}

const getAllCertificates = async(req,res) => {
    try {
        const start = Math.abs(parseInt(req.query.start)) || 0;
        const limit = Math.abs(parseInt(req.query.limit)) || 20
        if (limit > 20) limit = 20; 
        const certificates = await mc.readAllCertificates(start, limit);
        res.status(200).json(certificates);
    } catch (error) {
        ec.e500(req,res,error);
    }

}

const getAllCertificates41User = async(req,res) => {
    try {
        const start = Math.abs(parseInt(req.query.start)) || 0;
        const limit = Math.abs(parseInt(req.query.limit)) || 20
        if (limit > 20) limit = 20; 
        const username = req.params.username;
        const certificates = await mc.readAllCertificates41User(username, start, limit);
        res.status(200).json(certificates);
    } catch (error) {
        ec.e500(req,res,error);
    }
}

const searchCertificates = async (req,res) => {
    try {
        const start = Math.abs(parseInt(req.query.start)) || 0;
        const limit = Math.abs(parseInt(req.query.limit)) || 20
        if (limit > 20) limit = 20; 
        const search = String(req.query.search);
        const certificates = await mc.searchCertificates(start, limit, search);
        res.status(200).json(certificates);
    } catch (error) {
        ec.e500(req,res,error);
    }
}


const searchCertificates41User = async (req,res) => {
    try {
        const start = Math.abs(parseInt(req.query.start)) || 0;
        const limit = Math.abs(parseInt(req.query.limit)) || 20;
        const username = req.params.username;
        if (limit > 20) limit = 20; 
        const search = String(req.query.search);
        const certificates = await mc.searchCertificates41User(start, limit, search, username);
        res.status(200).json(certificates);
    } catch (error) {
        ec.e500(req,res,error);
    }
}

const putOneCertificate = async(req,res) => {
    try {
        const id = req.params.id;
        const certificate = req.body;
        const response = await mc.updateOneCertificate(id, certificate);
        res.status(200).json(response);
    } catch (error) {
        ec.e404(req,res,error);
    }

}

const deleteOneCertificate = async(req,res) => {
    try {
        const id = req.params.id;
        const response = await mc.deleteOneCertificate(id);
        res.status(200).json(response);
    } catch (error) {
        ec.e404(req,res,error);
    }
}

const deleteManyCertificates = async (req,res) => {
    console.log('aqiui')
    try {
        const id_array = req.body;
        const response = await mc.deleteManyCerts(id_array);
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        ec.e404(req,res,error);
    }
}

const deleteAllCertificates = async(req,res) => {
    try {
        const response = await mc.deleteAllCertificates();
        res.status(200).json(response);
    } catch (error) {
        ec.e404(req,res,error);
    }
}



export default {
    getOneCertificate,
    postCertificates,
    getAllCertificates,
    getAllCertificates41User,
    searchCertificates,
    searchCertificates41User,
    putOneCertificate,
    deleteOneCertificate,
    deleteManyCertificates,
    deleteAllCertificates
}