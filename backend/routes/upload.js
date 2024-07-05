import express from "express";
import multer from "multer";
import  cloudinary  from "../middlewares/upload.js";


const upload = multer();

const router = express.Router();

router.post('/', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: 'auto',
      });
      res.json({ url: result.secure_url });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });


  export default router;