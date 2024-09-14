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

export default router;