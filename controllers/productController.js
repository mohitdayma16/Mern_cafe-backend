import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const body = req.body;
    const result = await productModel.create(body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { addProduct };