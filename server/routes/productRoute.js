import {
  addToWishlist,
  createProduct,
  deleteImages,
  deleteProduct,
  getAllProduct,
  getProductByCategory,
  getRelatedProduct,
  getSingleProduct,
  rating,
  updateProduct,
  uploadImages,
} from "../controller/productController.js";
import { Router } from "express";
import { productImgResize, uploadPhoto } from "../middleware/uploadImages.js";

const router = Router();

router.post("/", createProduct);
router.patch(
  "/upload/:id",
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.get("/", getAllProduct);
router.get("/category", getProductByCategory);
router.delete("/delete/:id", deleteProduct);
router.get("/:slug", getSingleProduct);
router.patch("/update/:slug", updateProduct);
router.patch("/wishlist", addToWishlist);
router.patch("/rating", rating);
router.delete("/delete-img/:id", deleteImages);
// có req.query rồi nên ko cần làm thủ công như này nữa
//router.get("/:category/:brand", getRelatedProduct);

export default router;
