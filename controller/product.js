const modelProduct = require("../model/product");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Favourite = require("../model/favourite");
const { log } = require("console");

exports.homeProduct = (req, res) => {
  returnres.status(200).json({ message: "Home Product" });
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// addProduct = adding a product to database

exports.addProduct = async (req, res) => {
  try {
    const { title, desc, price } = req.body;

    if (!req.file) {
      return res.status(400).send({ exception: "Image file is required" });
    }

    const imagePath = req.file.path;

    const response = await cloudinary.uploader.upload(imagePath, {
      folder: "products",
    });

    // Delete local file safely
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });

    const card = new modelProduct({
      title,
      desc,
      image: response.secure_url,
      price,
      owner: req.user?.id,
      userId: req.user?.id,
    });

    await card.save();

    res.status(200).send({ msg: "Card added successfully!" });
  } catch (error) {
    console.log("Error adding card", error);
    res.status(500).send({
      msg: "Internal server error",
      error: error.message,
    });
  }
};


exports.getProduct = async (req, res) => {
  try {
    const viewCard = await modelProduct.find({ owner: req.user.id });
    res.status(200).send({ msg: "card view success", viewCard });
    // console.log(viewCard);
  } catch (error) {
    console.log("Error Geting Card", error);
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
  }
};

exports.showDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await modelProduct.findById(id);
    res.status(200).send({ data: details });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "Internal Server Error of Show Details",
      error: error.message,
    });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const id = req.params.id;
    await modelProduct.findByIdAndDelete(id);
    res.status(200).send({ message: "card delete Successfully" });
  } catch (error) {
    res
      .status(404)
      .send({ message: "Internal Delete Error", error: error.message });
  }
};

exports.editCard = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await modelProduct.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal edit error", error: error.message });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, desc, image, price } = req.body;
    await modelProduct.findByIdAndUpdate(id, { title, desc, image, price });
    res.status(200).send({ message: " updated successfully" });
  } catch (error) {
    res
      .status(404)
      .send({ message: "Internal Update error", error: error.message });
  }
};

exports.addToFavourite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const existingFav = await Favourite.findOne({
      userId,
      favouriteId: productId,
    });

    if (!existingFav) {
      await Favourite.create({
        userId,
        favouriteId: productId,
      });
    }

    res.status(200).json({
      success: true,
      message: "Added to favourite",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.isFavourite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    console.log('productId',productId);
    console.log('userid',userId);
  

    const favourite = await Favourite.findOne({
      userId,
      favouriteId: productId,
    });    

    console.log('favourite',favourite);


    res.status(200).json({
      isFavourite: !!favourite,
    });
  } catch (error) {
    res.status(500).json({
      exception: error.exception,
    });
  }
};

exports.removeFavourite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    await Favourite.findOneAndDelete({
      userId,
      favouriteId: productId,
    });

    res.status(200).json({
      success: true,
      message: "Removed from favourite",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 69174516a0301d0a9dcb381d

exports.getProductsById = async (req, res) => {
  try {
    const cards = await modelProduct.find({ owner: req.user.id });
    res.status(200).json({ msg: "all cards", viewCard: cards });
  } catch (error) {
    res
      .status(404)
      .send({ message: "Internal Update error", error: error.message });
  } 
};

exports.addToPublic = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body; // expecting something like { status: "public" }

    const post = await modelProduct.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!post) {
      return res.status(404).send({ message: "Product Not Found" });
    }

    res.status(200).send({
      message: "Product status updated successfully",
      data: post,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating product", error: error.message });
  }
};

exports.getPublicProducts = async (req, res) => {
  try {
    const cards = await modelProduct.find({ status: "public" });
    res.status(200).json({ msg: "all cards", viewCard: cards });
  } catch (error) {
    res
      .status(404)
      .send({ message: "Internal Update error", error: error.message });
  }
};
