const Favourite = require("../model/favourite");
const Product = require("../model/product");

exports.getFavouriteCard = async (req, res) => {
  try {
    const userId = req.user.id;

    const favourites = await Favourite.find({ userId });

    const productIds = favourites.map(
      (item) => item.favouriteId
    );

    const products = await Product.find({
      _id: { $in: productIds },
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};