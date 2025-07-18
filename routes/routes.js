import { Router } from "express";
import uc from "../controllers/userController.js";
import cc from "../controllers/certificateController.js"
import { API_ROUTE } from "../utils/helper.js";
import auth from "../middleware/auth.js";

const urlName = API_ROUTE;
const routes = Router();

const hello = ()=>{
    console.log("hello")
}

//Users Routes
routes.get(`/${urlName}/users/:username`, uc.getUser); 
routes.get(`/${urlName}/users`, uc.getAllUsers);
routes.post(`/${urlName}/login/users`, uc.login);
routes.post(`/${urlName}/users`, uc.postUser);
routes.put(`/${urlName}/users/:username`, auth.authenticate, uc.putUser);
routes.delete(`/${urlName}/users/:username`, auth.authenticate, uc.deleteUser);
routes.post(`/${urlName}/check`, uc.checkLoggedUserData)

//Certificates Routes
routes.get(`/${urlName}/certificates/:id`, cc.getOneCertificate);
routes.get(`/${urlName}/certificates/users/:username`, cc.getAllCertificates41User);
routes.get(`/${urlName}/certificates`, cc.getAllCertificates);
routes.get(`/${urlName}/search/certificates`, cc.searchCertificates);
routes.get(`/${urlName}/search/certificates/:username`, cc.searchCertificates41User);
routes.post(`/${urlName}/certificates/`, auth.authenticate, cc.postCertificates);
routes.put(`/${urlName}/certificates/:id`, auth.authenticate, cc.putOneCertificate);
routes.delete(`/${urlName}/certificates/:id`, auth.authenticate, cc.deleteOneCertificate);
routes.delete(`/${urlName}/delete/certificates`,auth.authenticate, cc.deleteManyCertificates);
routes.delete(`/${urlName}/certificates`, auth.authenticate, cc.deleteAllCertificates);

export {routes};