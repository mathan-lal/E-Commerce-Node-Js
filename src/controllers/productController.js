import Product from "../models/Product/product.js";
import { errorHandler } from "../utils/errorHandler.js";
import { successHandler } from "../utils/successHandler.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      tags,
      price,
      //size,
      //stock_quantity,
      variants,
      selectedSize,
    } = req.body;

    // console.log(req.body);
    // if (!name || !description || !price || !stock_quantity) {
    //   return errorHandler({ message: "Please Add Fields To Add Products" });
    // }

    const newProduct = await new Product({
      name,
      description,
      tags,
      price,
      //stock_quantity,
      //variants: [{ size, stock_quantity }],
      variants: variants.map(({ size, stock_quantity }) => ({
        size,
        stock_quantity,
      })),
      selectedSize,
    });

    console.log(newProduct);

    await newProduct.save();
    return successHandler(
      { message: "Product Has Been Added Successfully" },
      newProduct,
      200,
      res
    );
  } catch (error) {
    return errorHandler(error.message, 500, req, res);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock_quantity } = req.body;
    const { _id } = req.params;
    // Find if Product Found
    const existedProduct = await Product.findById({ _id });
    if (!existedProduct) {
      return errorHandler(
        { message: "Product has been not Found" },
        400,
        req,
        res
      );
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        $set: {
          name,
          description,
          price,
          stock_quantity,
        },
      },
      { new: true }
    );

    if (!updateProduct) {
      return errorHandler({ message: "Product not found" }, 400, req, res);
    }

    return successHandler(
      { message: "Product Has Been Updated Successfully" },
      updatedProduct,
      200,
      res
    );
  } catch (error) {
    return errorHandler(error.message, 500, req, res);
  }
};

export const deleteProduct = async (req, res) => {
  const { _id } = req.params;
  // find if product exist
  const existedProduct = await Product.findById({ _id });
  if (!existedProduct) {
    return errorHandler(
      { message: "Product has not been found" },
      400,
      req,
      res
    );
  }

  // if exists then delete it
  await Product.deleteOne({ _id: _id });
  return successHandler(
    { message: "Product has been deleted successfully" },
    null,
    200,
    res
  );
};

export const getProduct = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const product = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return successHandler(
      { message: "Product has been Fetched Success" },
      product,
      200,
      res
    );
  } catch (error) {
    return errorHandler(error.message, 500, req, res);
  }
};
