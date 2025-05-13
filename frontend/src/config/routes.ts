export const routes = {
  // Auth
  signIn: "/signin",
  signUp: "/signup",

  // Public Visitor Pages
  home: "/",
  galleries: "/galleries",
  galleryDetails: (id: string) => `/galleries/${id}`,
  artworkDetails: (id: string) => `/artworks/${id}`,
  filter: (query: string) => `/filter?q=${encodeURIComponent(query)}`,

  // Artist
  artist: {
    dashboard: "/artist/dashboard",
    artworks: "/artist/artworks",
    newArtwork: "/artist/upload",
    submissions: "/artist/submissions",
    editArtwork: (id: string) => `/artist/artworks/${id}/edit`,
  },

  // Curator
  curator: {
    dashboard: "/curator/dashboard",
    reviewQueue: "/curator/review",
    reviewArtwork: (id: string) => `/curator/review/${id}`,
    galleries: "/curator/galleries",
    newGallery: "/curator/galleries/new",
    editGallery: (id: string) => `/curator/galleries/${id}/edit`,
  },
};
