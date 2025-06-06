# 🧭 Wanderlust

Wanderlust is a full-stack web application inspired by Airbnb. It allows users to browse and create listings for places to stay, leave reviews, and manage their accounts. The project uses Node.js, Express, MongoDB, and EJS templating.

## ⚙️ Features

-   User authentication using Passport.js

-   Add, edit, delete listings (CRUD operations)

-   Upload listing images using Cloudinary

-   Review system for listings

-   Flash messages for notifications

-   Interactive listing maps with a pulsing location marker using the Mapbox API

-   Error handling and 404 pages

-   Session management using MongoDB store

-   Responsive UI built with Bootstrap

-   Hosted on Render with MongoDB Atlas as the database

## 🌐 Technologies Used

-   Node.js

-   Express.js

-   MongoDB with Mongoose

-   EJS and EJS-Mate for templating

-   Passport.js for authentication

-   Cloudinary for image storage

-   Mapbox GL JS for maps and location visualization

-   Render for deployment

-   connect-mongo for session storage

-   dotenv for environment variables

-   method-override for PUT and DELETE support

-   express-session and connect-flash

## Deployment

-   Deployed on Render

-   MongoDB database hosted on MongoDB Atlas

-   Images are uploaded and stored using Cloudinary

## 🚀 Live Demo

```bash
Check out the live site: [Wanderlust](https://wanderlust-bnmr.onrender.com/listings)
```

## 👨‍💻 Getting Started

If you want to run this project locally or make changes of your own, follow these steps:

1. Write these commands on your terminal:

```bash
# 1. Clone the repository
git clone https://github.com/Koustav2908/Wanderlust.git

# 2. Navigate into the project folder
cd Wanderlust

# 3. Install the dependencies
npm install
```

2. Create a .env file in the root of your project and add the following environment variables:

```ini
ATLAS_DB_URL=your_mongodb_atlas_connection_string
SESSION_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
MAPBOX_TOKEN=your_mapbox_api_token
```

3. Start the server

```bash
node app.js
# or if you have nodemon:
nodemon app.js
```

4. Open your browser and visit

```ini
http://localhost:8080
```
