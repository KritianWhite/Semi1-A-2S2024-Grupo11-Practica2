import { RekognitionClient, CompareFacesCommand} from '@aws-sdk/client-rekognition';
import config from '../config.mjs';

const compareFaces = async (buff, id) => {

    const client = new RekognitionClient({
        region: config.rekognition.region,
        credentials: {
            accessKeyId: config.rekognition.accessKeyId,
            secretAccessKey: config.rekognition.secretAccessKey
        }
    });

    const command = new CompareFacesCommand({
        SourceImage: {  //imagen que el usuario sube para comparar
            Bytes: buff
        },
        TargetImage: { // imagen que se encuentra en S3 de la perona como referencia
            S3Object: {
                Bucket: config.bucket,
                Name: id    //id de la imagen en S3 
            }
        }
    });

    try {
        const response = await client.send(command);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }finally{
        client.destroy();
    }

    };


export {compareFaces};
