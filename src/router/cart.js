import express from "express";
import { addToCart, getCart } from "../controllers/cartController.js";
import { isAuthenticated, userAuth } from "../middleware/auth.js";
const router = express.Router();

router.route("/add-to-cart/:_id").post(isAuthenticated, userAuth, addToCart);

router.route("/get-cart").post(isAuthenticated, userAuth, getCart);
export default router;
