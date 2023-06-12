# Validate Product Availability API for a Grocery Delivery Application

## Problem Statement

You're an engineer working on the Grocery delivery application. The product team provides the list of products, and number of items available at a given time.

An incident was reported such that you suspect the inventory management is not working as expected due to incorrect list generated, resulting in more failure orders for customers. You are responsible for fixing the `validate_and_get_products_by_item_id` API implementation before more incidents occur.

The `product_list` payload contains a few parameters and all should be validated, and throws `TypeError / RangeError/InvalidInputError` to the caller if anything does not meet the specifications

- `total_product_count` - Total number of products
- `available_product_count` - Total number of available products
- `product_list` - An array of objects with below object
    - `product_name` - Unique Product name 
    - `is_available` - Flag that uniquely indicates whether the item is available
    - `number_of_items_left` - Email address of the receiver
    - `items` - collection of item details
        - `item_id` -  Unique ID of the item
        - `is_expired` - Specifies whether the item is expired or not
    - `total_number_of_items` - Actual number of items of a given product

## Specifications

This code is expected to run in Node 14+.

## Task 1: Validate availability according to the specification.

- If `number_of_items_left` for a particular product is 0, is_available should be **false**.
- `total_number_of_items` should be greater than or equal to `number_of_items_left`.
- If a particular `item is_expired`, the particular `item_id` is considered as unavailable. So the `number_of_items_left` should not include the expired item.
- `total_product_count` should match the total number of product
- `available_product_count` should match the available products in the product list


## Task 2: Make update_cart function run

- You are given a function called `update_cart` that takes in `cart_id` as input and updates the item list that matches with the dummy json file.
- There is a bug in the function which hampers returning the updated values. You’re supposed to correct the function.

## Task 3: Write a function to combine product related information into a single objec

You are a developer working in an ecommerce company, where you’re asked to save product related details into mongoDB by calling the function named, saveToMongoDB().  You’re given four different JSON files such as products.json, reviews.json, customers.json and images.json. You should format the requests in such a way that all different files are combined to a single product's information along with a few fields such as phone_number and credit_card saved in base64 format.
Sample input and output given below

/** Sample Inputs **/

```javascript Sample Inputs
/** File 1: customers.json **/
{
  products[{
      id: UUID,
      name: STRING,
      expiry_date: DATETIME,
      manufactured_date: DATETIME
  }],
}

/** File 2: reviews.json **/
{
  reviews[{
   id: UUID,
   message: STRING,
   product_id: UUID,
   customer_id: UUID,
   date: DATETIME,
   rating: INTEGER,
   images: [id]
  }]
}

/** File 3: customers.json **/
{
   customers[{
   id: UUID,
   name: UUID,
   credit_card: INTEGER,
   phone_number: INTEGER,
   email: STRING
  }],
}

/** File 4: images.json **/
{
  images:[{
	id: UUID,
	url: STRING
  }]
}

/** Sample Output **/
{
  products[{
      id: UUID,
      name: STRING,
      expiry_date: DATETIME,
      manufactured_date: DATETIME
	  customers:[{
		 id: UUID,
         name: UUID,
         credit_card: <<Hashed>>,
   		 phone_number: <<Hashed>>,
  		 email: STRING,
		 reviews:[{
			id: UUID,
			message: STRING,
			product_id: UUID,
			customer_id: UUID,
			date: DATETIME,
			rating: INTEGER,
			images: [{
                id: UUID
                url: STRING
                }]
        }]		
     }]
  }]
```