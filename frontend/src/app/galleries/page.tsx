import GalleryList from "@/module/galleries/components/GalleryList";
import { Suspense } from "react";

export default function GalleriesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryList />
    </Suspense>
  );
}
