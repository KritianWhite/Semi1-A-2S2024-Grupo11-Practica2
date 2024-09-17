import {Router} from 'express';
import {user} from '../controllers/user.mjs';

const router = Router();


/****Comprobación***/
router.get("/check", async (req, res) => {
    res.status(200).json({"status": 200, "message": "API Funcionando correctamente"});
});

// Rutas de usuario
router.post("/user/register", user.register);
router.post("/user/login_credentials", user.login);
router.post("/user/register_face", user.registrarRostro);
router.get("/user/face_id_data/:id", user.obtenerDatosReconocimientoFacial);
router.put('/user/toggle_face_id', user.toggleFaceId);
router.post('/user/compare_faces', user.loginFaceId );

export default router;