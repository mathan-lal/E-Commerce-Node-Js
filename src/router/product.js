import express from "express";
const router = express.Router();
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { isAuthenticated, adminAuth } from "../middleware/auth.js";

router.route("/add-product").post(isAuthenticated, adminAuth, addProduct);
router
  .route("/update-product/:_id")
  .put(isAuthenticated, adminAuth, updateProduct);

router
  .route("/delete-product/:_id")
  .delete(isAuthenticated, adminAuth, deleteProduct);

router.route("/get-product").get(isAuthenticated, adminAuth, getProduct);

export default router;
