import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const albumStorage = multer.diskStorage({
    destination: path.join(__dirname, "../upload/albumimages"),
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    }
  });

const uploadAlbum = multer({ storage: albumStorage });
const uploadPhotos = multer({ storage: multer.memoryStorage() });
export { uploadAlbum, uploadPhotos };