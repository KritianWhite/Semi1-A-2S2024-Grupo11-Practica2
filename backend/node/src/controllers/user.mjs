import * as bcrypt from "bcrypt";
import { consult } from "../database/database.mjs";
import config from "../config.mjs";
import { uploadImageS3 } from "../aws/s3.mjs";

const register = async (req, res) => {
    const { username, email, password, profileImage } = req.body;
    try {

        if (username === undefined || email === undefined || password === undefined || profileImage === undefined) {
            return res.status(400).json({ status: 400, message: "Faltan campos por rellenar" });
        }

        //validamos que el email y el username no estén en uso

        const resultEmail = await consult(`select exist (select * from usuario where correo= '${email}') as emailExist;`);
        const resultUsername = await consult(`select exist (select * from usuario where nombre= '${username}') as userExist;`);

        if (resultEmail[0].status == 200 && resultEmail[0].result.length === 0) {
            return res.status(400).json({ status: 400, message: "El email ya está en uso" });
        }

        if (resultUsername[0].status == 200 && resultUsername[0].result.length === 0) {
            return res.status(400).json({ status: 400, message: "El nombre de usuario ya está en uso" });
        }

        //subimos la imagen a S3
        const base64Data = profileImage.replace(/^data:image\/\w+;base64,/, "");
        const buff = Buffer.from(base64Data, 'base64');
        //creamos el nombre de la imagen con el nombre de usuario y la fecha formateado a solo numeros sin espacios
        const nombreImagen = username + "_" + (new Date().toLocaleDateString().replace(/\//g, "") + new Date().toLocaleTimeString().replace(/:/g, "")) + ".jpeg";

        const response = await uploadImageS3(buff, "Fotos_Perfil/" + nombreImagen);

        if (response === null) {
            return res.status(500).json({ status: 500, message: "Error al subir la imagen" });
        }

        const url = `https://${config.bucket}.s3.${config.region}.amazonaws.com/Fotos_Perfil/${nombreImagen}`;

        //encriptamos la contraseña
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        //registramos al usuario

        const result = await consult(`insert into usuario (nombre, correo, password, url_foto, face_id_habilitado) values ('${username}', '${email}', '${hash}', '${url}', 0);`);

        if (result[0].result.affectedRows === 1) {
            //obtenemos el id del usuario
            const resultId = result[0].result.insertId;
            
            //Creamos el album de fotos de perfil
            const resultAlbum = await consult(`insert into album (nombre,usuario_id) values ('Fotos de perfil', ${resultId});`);
            if (resultAlbum[0].result.affectedRows !== 1) {
                return res.status(500).json({ status: 500, message: "Error al crear album de fotos de perfil el usuario" });
            }

            //obtenemos el id del album
            const resultIdAlbum = resultAlbum[0].result.insertId;
            //creamos la foto de perfil
            const resultFoto = await consult(`insert into imagen (album_id, url_s3, nombre, descripcion) values (${resultIdAlbum}, '${url}', '${nombreImagen}', '');`);

            if (resultFoto[0].result.affectedRows !== 1) {
                return res.status(500).json({ status: 500, message: "Error al crear foto de perfil" });
            }
            
            return res.status(200).json({ status: 200, message: "Usuario registrado correctamente" });
        } else {
            return res.status(500).json({ status: 500, message: "Error al registrar el usuario" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 500, message: "Error al registrar el usuario," + err });
    }
};


export const user = {
    register
};