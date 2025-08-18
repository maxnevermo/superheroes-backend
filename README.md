### 🦹🦸‍♂️ Superheroes API — Backend
A backend service for browsing, viewing, and managing superheroes. Provides a REST API with CRUD endpoints and image uploads to Cloudinary.

---

## Tech Stack

- **Node.js** + **NestJS** + **TypeScript**
- **Cloudinary** for image storage
- **REST API** with pagination

---

### Features

- **CRUD for superheroes:** (create, read, update, delete)
- **Pagination:** for list endpoint (default 5 per page)
- **Image upload:** to Cloudinary (create/update support multipart)

### Getting Started
1) Install dependencies
```
npm i
```
2) Configure environment

Create a .env file in the project root and set the variables:
```
DB_CONNECTION_STRING — connection string to your DB (e.g., Postgres/Mongo)
CLOUDINARY_CLOUD_NAME — your Cloudinary cloud name
CLOUDINARY_API_KEY — your Cloudinary API key
CLOUDINARY_API_SECRET — your Cloudinary API secret
CLOUDINARY_FOLDER — optional folder name for uploads (e.g., superheroes)
```

3) Run in development
```
npm run start:dev
```
