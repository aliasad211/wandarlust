# 🌍 WandarLust - Travel & Stay Listings Platform

[![NodeJS](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![ExpressJS](https://img.shields.io/badge/Express.js-v4-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mapbox](https://img.shields.io/badge/Mapbox-API-0080FF?style=flat-square&logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

**WandarLust** is a premium, fully-functional web application that allows travelers and property owners to list, discover, review, and map amazing vacation rentals and travel stays across the globe. Inspired by Airbnb, it features robust user authentication, interactive map rendering, dynamic image uploads, and listing management.

---

## ✨ Key Features

- **🏠 Comprehensive Listings (CRUD)**: Create, read, update, and delete travel listings with custom titles, descriptions, pricing, locations, and tags.
- **📸 Dynamic Image Uploads**: Integrated with **Cloudinary** and **Multer** for seamless image upload and cloud hosting.
- **🗺️ Interactive Map Integration**: Integrated with **Mapbox SDK** to automatically geocode listing locations and display them on an interactive map.
- **🔐 Secure Authentication & Authorization**: 
  - Complete signup/login system powered by **PassportJS** and local strategy.
  - Granular permissions: Only listing owners can edit/delete their listings, and only review authors can delete their reviews.
- **💬 Interactive Review System**: Users can submit star ratings and comments on listings, with modern review displays.
- **⚡ Premium UI/UX & Responsive Design**: Designed with modern CSS, glassmorphism card overlays, smooth hover effects, custom star ratings (`starability`), and Bootstrap grid.
- **🔔 Live Notifications (Flash)**: Real-time user feedback on success and error operations via flash messages.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend**: HTML5, EJS (Embedded JavaScript), CSS3, Bootstrap 5.3, FontAwesome Icons, Starability.css
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose ODM, MongoDB Atlas (Cloud Storage)
- **Sessions & Auth**: express-session, connect-flash, passport, passport-local, passport-local-mongoose
- **APIs & Cloud Integration**: Mapbox Geocoding API, Cloudinary Node SDK

---

## 📂 Project Architecture

```bash
├── controllers/       # Controller logic (Listings, Reviews, Users)
├── models/            # Mongoose Schemas & Models (List, Review, User)
├── routes/            # Express Router configurations (Listing, Review, User)
├── views/             # EJS Templates (Layouts, Listings, Users, Errors)
│   ├── layout/        # Boilerplate layout (Header, Footer, Flash messages)
│   └── listing/       # Listing templates (Index, Show, New, Edit)
├── public/            # Static assets (CSS, Client-side JavaScript, Images)
├── util/              # Utility helpers & Express error wrappers
├── app.js             # Main server setup & entry point
└── schema.js          # Joi validation schemas (Listings & Reviews validation)
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed on your local machine.

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aliasad211/wandarlust.git
   cd wandarlust
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following keys:
   ```env
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_secret
   MAP_TOKEN=your_mapbox_access_token
   ATLASDB_URL=your_mongodb_connection_uri
   SECRET=your_session_secret
   ```

4. **Seed the Database (Optional)**:
   Initialize the database with mock travel listings:
   ```bash
   node init/index.js
   ```

5. **Start the Server**:
   ```bash
   node app.js
   ```
   Open your browser and navigate to `http://localhost:8080/listings`.

---

## 🛡️ Robust Security Measures

- **Input Validation**: Uses **Joi** schemas to validate server-side input, preventing malicious payloads or format inconsistencies.
- **Graceful Error Handling**: Implements a centralized async error handler (`wrapAsync`) and custom `ExpressError` class to catch, log, and render user-friendly error pages rather than breaking the application flow.
- **Relational Integrity**: Deleting a listing automatically triggers a Mongoose middleware to clean up and delete all associated reviews from the database.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
