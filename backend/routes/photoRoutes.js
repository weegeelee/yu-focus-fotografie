import express from "express";
import { v4 as uuidv4 } from "uuid";
import Photo from "../models/Photo.js";
import PhotoAlbum from "../models/PhotoAlbum.js";
import { uploadPhotos } from "../config/multer.js";
import supabase from "../config/supabaseConfig.js";

const router = express.Router();

router.post('/albums/:albumId/photos', uploadPhotos.array('photos'), async (req, res) => {
  try {
    const { albumId } = req.params;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: 'No photos uploaded' });
    }

    const albumExists = await PhotoAlbum.findOne({ id: albumId });
    if (!albumExists) {
      return res.status(404).json({ success: false, message: 'Album not found' });
    }
    const newPhotos = await Promise.all(files.map(async (file) => {

      const filePath = `photos/${uuidv4()}-${file.originalname}`;
      const { error } = await supabase.storage.from("photos").upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

      if (error) {
        console.error("上传失败:", error);
        throw new Error("Supabase 上传失败");
      }
      const imageUrl = supabase.storage.from("photos").getPublicUrl(filePath);

      return {
        id: uuidv4(),
        name: file.originalname,
        imageUrl,
        album: albumExists._id,
      };
    }));

    const savedPhotos = await Photo.insertMany(newPhotos);

    await PhotoAlbum.findByIdAndUpdate(albumExists._id, {
      $push: { photos: { $each: savedPhotos.map(photo => photo._id) } }
    });

    res.json({ success: true, message: 'Photos uploaded successfully', photos: savedPhotos });
  } catch (error) {
    console.error('Error uploading photos:', error);
    res.status(500).json({ success: false, message: 'Error uploading photos' });
  }
});

router.get('/photos', async (req, res) => {
  try {
    const { albumId } = req.query;

    if (!albumId) {
      return res.status(400).json({ success: false, message: "Missing albumId" });
    }

    const albumExists = await PhotoAlbum.findOne({ id: albumId });
    if (!albumExists) {
      return res.status(404).json({ success: false, message: "Album not found" });
    }

    const photos = await Photo.find({ album: albumExists._id });

    return res.status(200).json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return res.status(500).json({ success: false, message: "Error fetching photos" });
  }
});

router.get('/allphotos', async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.send(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/deletephoto/:id", async (req, res) => {
  try {
    const photoId = req.params.id;
    console.log("Received delete request for photo ID:", photoId);

    if (!photoId) {
      return res.status(400).json({ message: "Photo ID is required" });
    }

    const photo = await Photo.findOne({ id: photoId });
    if (!photo) {
      return res.status(404).json({ message: "Photo not found in database" });
    }
    const PhotoObjectId = photo._id;

    // **从 Supabase 存储中删除图片**
    if (photo.imageUrl) {
      const filePath = photo.imageUrl.replace(
        process.env.SUPABASE_URL + "/storage/v1/object/public/",
        ""
      ); // 获取相对路径，例如 "photos/xxx.jpg"

      console.log("Deleting photo from Supabase:", filePath);
      const { error: supabaseError } = await supabase.storage.from("photos").remove([filePath]);

      if (supabaseError) {
        console.error("Error deleting photo from Supabase:", supabaseError);
        return res.status(500).json({ message: "Failed to delete photo from Supabase" });
      }
      console.log("Deleted photo from Supabase successfully.");
    }
    await PhotoAlbum.updateMany(
      { photos: PhotoObjectId },
      { $pull: { photos: PhotoObjectId } });

    await Photo.deleteOne({ _id: PhotoObjectId });

    res.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/albums/:albumId/photos", async (req, res) => {
  const albumId = req.params.albumId;
  console.log("Received request to delete photos for album:", req.params.albumId);

  try {
    // 删除相册下所有照片
    const album = await PhotoAlbum.findOne({ id: albumId });
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    const photoIds = album.photos; // 这里已经是ObjectId数组
    console.log(`找到需要删除的 ${photoIds.length} 张照片`);

    // 3. 获取照片详情用于Supabase删除
    const photos = await Photo.find({ _id: { $in: photoIds } });

    // 4. 从Supabase删除文件（批量操作）
    const supabasePaths = photos.map(photo =>
      photo.imageUrl.replace(process.env.SUPABASE_URL + "/storage/v1/object/public/", "")
    );

    console.log(`正在从Supabase删除 ${supabasePaths.length} 个文件`);
    const { error: storageError } = await supabase.storage
      .from("photos")
      .remove(supabasePaths);

    if (storageError) {
      console.error("Supabase删除失败:", storageError);
      throw new Error("文件存储删除失败");
    }

    const result = await Photo.deleteMany({ _id: { $in: photoIds } });

    await PhotoAlbum.updateOne(
      { _id: album._id },
      { $set: { photos: [] } }
    );
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No photos found in this album" });
    }

    res.json({ message: `All photos in album ${albumId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting photos", error });
  }
});

export default router;