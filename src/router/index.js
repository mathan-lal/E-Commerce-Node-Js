import routeNotFoundHandler from "../middleware/app.js";
import auth from "./auth.js";
import express from "express";
import product from "./product.js";
import cart from "./cart.js";
const router = express.Router();

router.use("/auth", auth);
router.use("/product", product);
router.use("/cart", cart);

// ? app
router.use(routeNotFoundHandler);

export default router;
