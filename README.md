# 🎨 ArtShow — Virtual Art Gallery Submission & Curation

A full-stack web application that enables **artists** to submit artworks, **curators** to review and tag them, and **visitors** to explore curated virtual galleries. This platform includes user roles, artwork workflows, filtering, analytics, and interaction tracking.

---

## 🌐 Live URLs

* Frontend: [https://your-frontend-url.com](https://your-frontend-url.com)
* Backend API: [https://your-backend-api.com](https://your-backend-api.com)

---

## 📂 Project Structure

### Frontend (Next.js + ShadCN + Zustand + React Query)

```
/app
  /galleries
    /[id]
    /artwork/[id]
    GalleryList.tsx
    ArtworkModal.tsx
  /artist
    /dashboard
    /upload
    /submissions
  /curator
    /dashboard
/components
  /ui (ShadCN UI components)
  /form (TextInput, Select, etc.)
/hooks
  useArtworkAPI.ts
  useGalleryAPI.ts
  useCuratorAPI.ts
  useInteractionAPI.ts
/store
  use-modal-store.ts
```

### Backend (Express + MongoDB + Mongoose + Supabase Auth)

```
/src
  /routes
    /auth
    /artwork
    /gallery
    /curator
    /interaction
  /db
    /schemas
      Artwork.ts
      Gallery.ts
      Tag.ts
      Interaction.ts
      User.ts
  /helpers
    ArtworkHelpers.ts
    GalleryHelpers.ts
  server.ts
```

---

## 🔧 Features

### ✍️ Artwork Submission (Artist)

* Upload title, description, medium, dimensions
* Upload image (cloud storage integration can be plugged in)
* Auto status: `PENDING`

### ⚖️ Review & Curation (Curator)

* View pending submissions
* Tag with style (e.g., Abstract, Portrait)
* Approve with tags + optional feedback
* Reject with feedback
* Auto updates artwork status and logs curator info

### 🌟 Gallery Publishing (Curator/Organizer)

* Select approved artworks to publish
* Create named gallery with description
* Auto timestamp `publishedAt`

### 🔎 Visitor Experience (No login required)

* Browse all published galleries
* Click gallery to view artworks
* Click artwork to open modal or detail page
* Filters:

  * by tag/style
  * by medium
  * by artist

### ✨ Artwork Modal

* Like count (no login)
* View count
* Shareable via clipboard (URL copied)
* Artist attribution always visible

### 📊 Exhibition Analytics

* Views tracked via IP + Session ID
* Likes tracked via LocalStorage (client-side memory)
* Backend aggregates views/likes per artwork

---

## 🚀 Tech Stack

### Frontend

* Next.js App Router
* TypeScript
* Tailwind CSS
* ShadCN UI
* Zustand (modal state)
* React Query

### Backend

* Node.js + Express
* MongoDB + Mongoose
* JWT decoding middleware
* Validator (node-input-validator)

---

## 🔒 Auth & Roles

* Signup/Login 
* Role assignment: `ARTIST`, `CURATOR`
* Middleware-based access control on routes
* Artists cannot access curator routes and vice versa

---

## 🔌 Setup Instructions

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

* Configure `.env` with Mongo URI and Supabase keys

---

## 📗 API Endpoints Overview

### Auth

* `POST /auth/register`
* `POST /auth/login`
* `GET /auth/me`

### Artwork

* `POST /artworks` (artist)
* `GET /artworks/me` (artist)
* `PATCH /artworks/:id` (editable if pending)
* `DELETE /artworks/:id`

### Curator

* `GET /curator/pending`
* `PATCH /curator/:id/approve`
* `PATCH /curator/:id/reject`

### Gallery

* `POST /galleries`
* `GET /galleries`
* `GET /galleries/:id`

### Interaction

* `POST /interactions/view/:id`
* `POST /interactions/like/:id`
* `GET /interactions/:id`

---

## 🎉 Final Notes

* Built in 24 hours as part of a coding challenge
* Easily extendable to include admin role or gallery comments

---

Made with ❤️ for artists, curators, and virtual galleries everywhere.