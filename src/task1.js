/**
 * Task 1
 */
const fs = require("fs");
const path = require("path");
const { validationErrorMessages } = require("./constants");

/**
 * Get Product info and its reviews
 * @param {Number} productId - Product id
 */
async function getProductInformationByProductId(productId) {
  // Validate the productId
  if (!Number.isInteger(productId) || productId <= 0) {
    throw new Error(validationErrorMessages.productidValidation);
  }

  // Read the JSON files
  const productsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data/task1/products.json"), "utf8")
  );
  const reviewsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data/task1/reviews.json"), "utf8")
  );
  const customersData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data/task1/customers.json"), "utf8")
  );
  const imagesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data/task1/images.json"), "utf8")
  );

  // Find the product with the given productId
  const product = productsData.products.find((p) => p.id === productId);
  if (!product) {
    throw new Error(validationErrorMessages.productNotFound);
  }

  // Find reviews for the product and sort them by "created_at" field in descending order
  const reviews = reviewsData.reviews
    .filter((review) => review.product_id === productId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Retrieve customer information and encode phone_number
  const formattedReviews = [];
  for (const review of reviews) {
    const customer = customersData.customers.find(
      (c) => c.id === review.customer_id
    );
    if (!customer) {
      continue; // Skip the review if the customer is not found
    }

    const formattedCustomer = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone_number: Buffer.from(customer.phone_number.toString()).toString(
        "base64"
      ),
    };

    // Retrieve images for the review
    const reviewImages = review.images.map((imageId) =>
      imagesData.images.find((image) => image.id === imageId)
    );

    formattedReviews.push({
      id: review.id,
      message: review.message,
      created_at: review.created_at,
      rating: review.rating,
      customer: formattedCustomer,
      images: reviewImages,
    });
  }

  // Construct the final response object
  const response = {
    id: product.id,
    name: product.name,
    reviews: formattedReviews,
  };

  return response;
}

/**
 * TIP: Use the following code to test your implementation
 */
(async () => {
  try {
    const product = await getProductInformationByProductId(2);
    console.log(JSON.stringify(product, null, 3));
  } catch (err) {
    console.error(err);
  }
})();

module.exports = {
  getProductInformationByProductId,
};
