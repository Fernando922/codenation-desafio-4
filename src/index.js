const promotions = ["SINGLE LOOK", "DOUBLE LOOK", "TRIPLE LOOK", "FULL LOOK"];
const { products } = require("./data/products.json");

function getShoppingCart(ids, productsList) {
  const productsSelected = ids.map((id) => {
    return productsList.find((prod) => prod.id === id);
  });

  //identifying active promotion
  const look = [
    ...new Set(productsSelected.map((product) => product.category)),
  ];

  const promotion = promotions[look.length - 1];

  //finding prices
  const subtotalPrice = productsSelected
    .map((product) => product.regularPrice)
    .reduce((previous, next) => previous + next);

  const totalPrice = productsSelected
    .map((product) => {
      let value = 0;
      for (let i = 0; i < product.promotions.length; i++) {
        const looks = product.promotions[i].looks;
        if (looks.includes(promotion)) {
          value = product.promotions[i].price;
          break;
        }
        value = product.regularPrice;
      }
      return value;
    })
    .reduce((prev, next) => prev + next);

  //finding discount value
  discountValue = (subtotalPrice - totalPrice).toFixed(2);
  const discount = (100 - (totalPrice * 100) / subtotalPrice).toFixed(2);

  //assembling the response object
  const response = {
    products: productsSelected.map((product) => {
      return { name: product.name, category: product.category };
    }),
    promotion,
    totalPrice: totalPrice.toFixed(2),
    discountValue,
    discount: `${discount}%`,
  };

  return response;
}


module.exports = { getShoppingCart };
