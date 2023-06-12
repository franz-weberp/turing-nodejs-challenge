# Turing NodeJS Challenge 

Briefing: Grocery Delivery Application, You're an engineer working on the Grocery Delivery Application

## How to install (Step by step):
* Download the project;
```sh
npm install
npm run test:main
or
npm run test:task1
npm run test:task2
npm run test:task3
```

## ✨ Features: ✨
- Fetch a product's detail and its associated reviews
- Update item's expiry date based on "itemid”
- Adds a new item to a product and updates its inventory

# Tasks
#### Task 1 - Write a function to retum a product with its reviews and reviewer details

The function should consider the following_scenarios

* :ballot_box_with_check: - It accepts a productld and retuns the output as shown in the "Expected output" section below.
* :ballot_box_with_check: - It should validate that the productid passed as input should be a positive non-zero integer. If not, the function should throw an eror with a message provided in the "productidValidation" constant
* :ballot_box_with_check: - The function should throw an emror with the message provided in the "productNotFound" constant if the product with the given id is not found in the JSON fies
* :ballot_box_with_check: - "credit_card" field should be excluded from customer data when retuming the final response
* :ballot_box_with_check: - "phone_number" should be encoded with base64 when retuming the final response
* :ballot_box_with_check: - Sort reviews by showing the latest review on top using the “created_at" field
* :ballot_box_with_check: - - The function "getProductinformationByProductid" should read from these JSON files and return the output as demonstrated below in "Expected output” for the given productid

Please make a note that a product can have multiple reviews, each review has one customer and can have one or more images.

Expected output:
```sh
{
    "id": 2,
    "name": "Cinamon Roll",
    "reviews": [{
        "id": 4,
        "message": "Not satisfied",
        "created_at": "2023-02-27710:00:00Z",
        "rating": 2,
        "customer": {
            "id": 4,
            "name": "Howard",
            "email": "peter.p@zylker.com",
            "phone_number" : "NDA1Njc3NDAyMw=="
        },

        "images": [
            {
            "id": 1,
            "url": “https://flickr.com/img1.jpg"
            }
        ]
    }]
}
```

#### Task 2

You're given a function "updateExpiryDateByltemId" which takes two parameters, "itemid" and
"expiryDate". The function reads a product list from a file (task/src/task2/update_item_products.json),
updates a field expiry_date, and returns only the item that matched and its comesponding product as
demonstrated in the "Expected output” section below.

It should throw errors in the following_scenarios:

* :ballot_box_with_check: - If the itemid is not a valid positive non-zero integer. The error thrown for this scenario should use the message available in the "itemIdValidtion" constant
* :ballot_box_with_check: - Item with the given itemId is not found. The error thrown for this scenario should use the message available in the "itemNotFound" constant
* :ballot_box_with_check: - There are one or more erors in the function preventing it from running comectly (see the "Error” section below). 
* :ballot_box_with_check: - You are required to find and fix these bugs to ensure the function should run comectly without any emors with appropriate input validations

Error:
```sh
> task2
> node src/task2.js
ReferenceError: products is not defined
```

Expected output:
```sh
{
    "id": 6,
    "name": "Cereal bars",
    "is_available": true,
    "price": 34,
    "total_number_of_items": 6,
    "number_of_items_left": 5,
    "items": [{
        "item_id": 142,
        "expiry_date": "2022-01-01"
    }],
    "rating": 3.6,
    "brand": "Burry",
    "category": "Bakery"
}
```

#### Task 3 - Create a function to add an item to a product, increase the inventory count and return the updated product object.

The function shouId consider the following scenarios:

* :ballot_box_with_check: - It accepts a "productld" and an "item" object. Find the product by given id and add the item to the product's object. Increment "items_left" by 1, and return the updated product object.
* :ballot_box_with_check: - "itemld" must be unique. The code should throw an error if the "itemId" already exists in product's items list. Use the error message available in "itemAlreadyExists" for this scenario.
* :ballot_box_with_check: - Item "expiryDate" must be in the future. The code should throw should an error if new item has an expired date. Use the error message available in "itemExpired" for this scenario.
* :ballot_box_with_check: - It should validate that the "productld" passed as an input should be a positive non-zero integer. If not, the function should throw an error with message provided "productidValidation" constant.
* :ballot_box_with_check: - It should validate that the "item" passed as an input be a valid object. If not, the function should throw an error with message provided "itemValidation" constant.
* :ballot_box_with_check: - Sort items by "itemld", in ascending order Data: Product details with their items are available at "src/data/task3/products.json".

Expected output:
```sh
{
    "id": 4,
    "name": "Instant pudding”,
    "is_available": true,
    "price": 20,
    "rating": 4.78,
    "brand": "Angel Delight",
    "category": "Frozen",
    "items_left": 6,
    "items": [
        {
            "item_id": 401,
            "expiry_date": "2023-03-17T01:57:07.846Z"
        },
        {
            "item_id": 402,
            "expiry_date": "2023-03-30T04:17:07.846Z"
        },
        {
            "item_id": 403,
            "expiry_date": "2023-03-30T09:56:07.846Z"
        },
        {
       	    "item_id": 404,
            "expiry_date": "2023-03-22T12:23:07.846Z"
        },
        {
            "item_id": 405,
            "expiry_date": "2050-04-05T03:29:07.846Z"
        },
        {
            "item_id": 410,
            "expiry_date": "2050-03-30T12:57:07.846Z"
        }
    ]
}
```
