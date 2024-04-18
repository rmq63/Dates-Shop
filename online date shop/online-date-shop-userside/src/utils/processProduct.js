export function processProducts(products) {
  const processedProducts = {};

  // Iterate over each product
  products.forEach((product) => {
    const productId = product._id;

    // If productId already exists in processedProducts, increase quantity and totalPrice
    if (processedProducts[productId]) {
      processedProducts[productId].quantity++;
      processedProducts[productId].totalPrice += product.price;
    } else {
      // If productId doesn't exist, initialize with quantity 1 and totalPrice as price
      processedProducts[productId] = {
        productId: productId,
        quantity: 1,
        totalPrice: product.price,
        name: product.type,
      };
    }
  });

  // Convert processedProducts object into an array of objects
  const result = Object.values(processedProducts).map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
    name: item.name,
  }));

  return result;
}