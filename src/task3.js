/**
 * Task 3
 */
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const { validationErrorMessages } = require("./constants");

/**
 * Add item to a product
 * @param {Number} productId - Product id
 * @param {Object} item - { id: 1010, expiry_date: "2050-03-30T12:57:07.846Z" }
 */
async function addItem(productId, item) {
  // Validate productId
  if (!Number.isInteger(productId) || productId <= 0) {
    throw new Error(validationErrorMessages.productidValidation);
  }

  // Validate item
  if (
    !item ||
    typeof item !== "object" ||
    !item.hasOwnProperty("id") ||
    !item.hasOwnProperty("expiry_date")
  ) {
    throw new Error(validationErrorMessages.itemValidation);
  }

  // Check if expiry_date is in the future
  if (moment(item.expiry_date).isBefore(moment())) {
    throw new Error(validationErrorMessages.itemExpired);
  }

  // Read products.json file
  const productsFilePath = path.join(__dirname, "data", "task3", "products.json");
  const productsData = JSON.parse(fs.readFileSync(productsFilePath));

  // Find product by id
  const productIndex = productsData.products.findIndex(
    (product) => product.id === productId
  );

  // Check if product exists
  if (productIndex === -1) {
    throw new Error(validationErrorMessages.productNotFound);
  }

  // Check if itemId already exists
  if (
    productsData.products[productIndex].hasOwnProperty("items") &&
    productsData.products[productIndex].items.some(
      (existingItem) => existingItem.item_id === item.id
    )
  ) {
    throw new Error(validationErrorMessages.itemAlreadyExists);
  }

  // Add item to product
  if (!productsData.products[productIndex].hasOwnProperty("items")) {
    productsData.products[productIndex].items = [];
  }
  
  productsData.products[productIndex].items.push({
    item_id: item.id,
    expiry_date: item.expiry_date,
  });

  // Increment items_left by 1
  if (!productsData.products[productIndex].hasOwnProperty("items_left")) {
    productsData.products[productIndex].items_left = 0;
  }
  
  productsData.products[productIndex].items_left +=1;

   // Sort items by itemId in ascending order
   productsData.products[productIndex].items.sort((a,b) => a.item_id - b.item_id);

   // Write updated data to file
   fs.writeFileSync(productsFilePath, JSON.stringify(productsData, null, 2));

   return productsData.products[productIndex];
}

/**
 * TIP: Use the following code to test your implementation
 * Use different values for input parameters to test different scenarios
 */
(async () => {
  try {
    const result = await addItem(4, {
      id: 410,
      expiry_date: "2050-03-30T12:57:07.846Z",
    });
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();

module.exports = {
  addItem,
};
