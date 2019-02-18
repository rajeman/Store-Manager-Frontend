[![Build Status](https://travis-ci.com/rajeman/Store-Manager-Frontend.svg?branch=chore-separate-react)](https://travis-ci.com/rajeman/Store-Manager-Frontend)

# Store-Manager
Store Manager is a web application that allows store owners to manage product sales, inventory and
records

# Features
* Store attendant can search and add products to buyer’s cart.
* Store attendant can see his/her sale records but can’t modify them.
* App should show available products, quantity and price.
* Store owner can see sales and can filter by attendants.
* Store owner can add, modify and delete products.

# Github Pages
* https://rajeman.github.io/Store-Manager/UI/index.html

# Heroku App
* http://onlinestoremanager.herokuapp.com/

# API Docs
* https://onlinestoremanager.herokuapp.com/api-docs

# Project Management
* https://www.pivotaltracker.com/n/projects/2203373
## Running App
* Install Node.js on your computer and run the command: "npm start" at the root directory of the project.
# Testing
* Run "npm test" at the root directory of the project.
# API Routes
| Endpoint  | Functionality | Notes |
| ------------- | ------------- |------------- |
|POST /auth/signup|Register a user |This endpoint creates a new store attendant and is available to only the admin. Admin must be logged in to use this route|
|POST /auth/login|Login a user |Both the admin and attendant can use this endpoint. A new attendant should use the default password "attendantpassword"|
| GET /products  | Fetch a single product  | Get a specific product using the product's id|
|GET /sales|Fetch all sale records|Get all sale records. Endpoint is accessible to only the store owner/admin. Admin must supply the query parameter: "level=2"|
|GET /sales/:saleId|Fetch a single sale record|Get a specific sale record using the id. Endpoint is accessible to  the store owner/admin or the sale attendant that created the record. Admin must supply the query parameter: "level=2". The attendant must supply the query parameter: "attendantId=x", where 'x' is the attendant's id.|
|POST /products|Create a product|Creates a new product record. Endpoint is accessible to only the store owner/admin. Admin must supply the query parameter: "level=2".|
|POST /sales|Create a sale order|Creates a sale order. Endpoint is accessible to only the store owner/admin. Admin must supply the query parameter: "level=2"|


# Credits
* https://pexels.com
* https://w3schools.com
* https://unsplash.com
* https://stackoverflow.com



