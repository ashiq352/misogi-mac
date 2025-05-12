"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ArtworkUploadForm() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      medium: "",
      dimensions: "",
      image: null as File | null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      medium: Yup.string().required("Medium is required"),
      dimensions: Yup.string().required("Dimensions are required"),
      image: Yup.mixed().required("Image is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("medium", values.medium);
      formData.append("dimensions", values.dimensions);
      if (values.image) formData.append("image", values.image);

      console.log("Submitting artwork:", values);
      // TODO: Integrate API call here
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-2">Upload New Artwork</h2>

      <TextInput
        id="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />

      <TextInput
        id="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description}
        placeholder="Write a short description"
      />

      <div>
        <Label htmlFor="medium" className="block mb-1">
          Medium
        </Label>
        <select
          id="medium"
          name="medium"
          value={formik.values.medium}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Medium</option>
          <option value="Oil">Oil</option>
          <option value="Digital">Digital</option>
          <option value="Watercolor">Watercolor</option>
          <option value="Acrylic">Acrylic</option>
          <option value="Pencil">Pencil</option>
        </select>
        {formik.errors.medium && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.medium}</p>
        )}
      </div>

      <TextInput
        id="dimensions"
        label="Dimensions"
        value={formik.values.dimensions}
        onChange={formik.handleChange}
        error={formik.errors.dimensions}
        placeholder="e.g. 30x40 cm"
      />

      <div>
        <Label htmlFor="image" className="block mb-1">
          Upload Image
        </Label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full"
        />
        {formik.errors.image && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
        )}
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="mt-4 h-48 object-contain border rounded"
          />
        )}
      </div>

      <Button type="submit" className="w-full">
        Submit Artwork
      </Button>
    </form>
  );
}
