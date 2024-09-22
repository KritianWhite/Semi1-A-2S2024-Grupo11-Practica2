import { consult } from "../database/database.mjs";
import { deleteObjectS3 } from "../aws/S3Privado.mjs";

const Add = async (req, res) => {
  try {
    const { usuario_id, nombre } = req.body;
    if (!usuario_id || !nombre) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    const query = `INSERT INTO album (usuario_id, nombre) VALUES (${usuario_id}, '${nombre}');`;
    const response = await consult(query);
    console.log(
      `INSERT INTO album (usuario_id, nombre) VALUES (${usuario_id}, '${nombre}');`
    );
    if (response[0].status !== 200) {
      return res.status(400).json({ message: "Error al crear el album" });
    }
    res.status(200).json({ message: "Album creado correctamente" });
  } catch (error) {
    console.error("Error al crear el album", error);
    res.status(500).json({ message: "Error al crear el album" });
  }
};

const Get = async (req, res) => {
  try {
    const { usuario_id } = req.body;

    const query = `
    SELECT 
        a.id AS album_id,
        a.nombre AS album_nombre,
        COUNT(i.id) AS cantidad_imagenes
    FROM 
        album a
    LEFT JOIN 
        imagen i ON a.id = i.album_id
    WHERE 
        a.usuario_id = ${usuario_id}
    GROUP BY 
        a.id;`;

    const response = await consult(query);

    if (response[0].status !== 200) {
      return res
        .status(404)
        .json({ message: "No se encontraron archivos en el album" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener los archivos del album:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los archivos del album" });
  }
};

const Update = async (req, res) => {
  try {
    const { album_id, nombre } = req.body;
    if (!album_id || !nombre) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const query = `UPDATE album SET nombre = '${nombre}' WHERE id = ${album_id};`;

    const response = await consult(query);

    if (response[0].status !== 200) {
      return res
        .status(404)
        .json({ message: "No se pudo cambiar el nombre al album" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al cambiar el nombre del album:", error);
    res.status(500).json({ message: "Error al cambiar el nombre del album" });
  }
};

const Delete = async (req, res) => {
  try {
    const { album_id } = req.body;
    if (!album_id) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    //obtengo todas lar url de las imagenes del album en s3
    const getUrl = await consult(
      `Select url_s3 as Url from imagen where album_id=${album_id};`
    );
    if (getUrl[0].status !== 200) {
      return res
        .status(404)
        .json({ message: "No se pudo obtener la url de las imagenes" });
    }
    //elimino las imagenes del album en s3 de forma asyncrona
    getUrl[0].result.forEach(async (element) => {
        deleteObjectS3(element.Url)
          .then(() => {
            console.log("archivos eliminados de bucket"); // Lista de archivos con sus paths
          })
          .catch((err) => {
            console.error(err);
          });
      });

      //elimino las imagenes del album en la base de datos
    const response = await consult(`DELETE FROM album WHERE id = ${album_id};`);

    if (response[0].status !== 200) {
      return res.status(404).json({ message: "No se pudo eliminar el album" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al eliminar el album:", error);
    res.status(500).json({ message: "Error al eliminar el album" });
  }
};

export const Album = {
  Add,
  Get,
  Update,
  Delete,
};
