const express = require("express");
const {
  addProduct,
  getProduct,
  showDetails,
  deleteCard,
  editCard,
  updateCard,
  getProductsById,
  addToPublic,
  getPublicProducts,
  addToFavourite,
  isFavourite,
  removeFavourite,
} = require("../controller/product");
const { favouriteCard, getFavouriteCard } = require("../controller/favouritecard") 

const { auth } = require("../authentication/auth");
const upload = require("../middleware/multer"); // 👈 Add this

const productRoute = express.Router();

// 👇 Multer added here
productRoute.post(
  "/addCard",
  auth,
  upload.single("image"),
  addProduct 
);

productRoute.get("/getCard", auth, getProduct);

productRoute.get("/detail/:id", showDetails);

productRoute.get("/delete/:id", deleteCard);

productRoute.get("/edit/:id", editCard);

productRoute.post("/saveCard/:id", updateCard);

productRoute.post("/addTofavourite", auth, addToFavourite);

productRoute.post("/isfavourite", auth, isFavourite);

productRoute.post("/removeFavourite", auth, removeFavourite);

productRoute.get("/getfavourites", auth, getFavouriteCard);

productRoute.get("/getProductsById", auth, getProductsById);

productRoute.post("/public/:id", addToPublic);

productRoute.get("/public", getPublicProducts);

module.exports = productRoute;