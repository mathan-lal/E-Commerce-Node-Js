import Cart from "../models/Cart/Cart.js";
import Product from "../models/Product/product.js";
import { errorHandler } from "../utils/errorHandler.js";
import { successHandler } from "../utils/successHandler.js";

export const addToCart = async (req, res) => {
  try {
    const { _id } = req.params;
    const { quantity } = req.body;

    // find if product
    const product = await Product.findById({ _id });
    if (!product) {
      return errorHandler(
        { message: "Product has not been found" },
        400,
        req,
        res
      );
    }
    if (product.stock_quantity < quantity) {
      return errorHandler({ message: "Insufficient stock" }, 400, req, res);
    }

    const userId = req.user.id;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // now we are checking if the product is already in Cart
    const existingItem = cart.items.find((item) => item.product.equals(_id));

    if (existingItem) {
      // Update quantity if the product is already in the cart
      existingItem.quantity += parseInt(quantity);
    } else {
      // Add a new item to the cart
      cart.items.push({ product: _id, quantity: parseInt(quantity) });
    }

    // Now we update price of product
    cart.totalPrice += product.price * parseInt(quantity);

    /*product.stock_quantity -= parseInt(quantity);
    await product.save();*/

    // Save the cart to the database
    await cart.save();

    return successHandler(
      { message: "Product added to cart successfully" },
      null,
      200,
      res
    );
  } catch (error) {
    console.error("Error adding to cart:", error);
    return errorHandler({ message: "Internal Server Error" }, 500, req, res);
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return errorHandler({ message: "Cart not found" }, 400, req, res);
    }
    return successHandler(
      { message: "Cart Has Been Fatched Successfully" },
      cart,
      200,
      res
    );
  } catch (error) {
    errorHandler({ message: "Internal Server Error" }, 500, req, res);
  }
};
