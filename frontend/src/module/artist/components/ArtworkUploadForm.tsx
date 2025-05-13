"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useArtworkAPI } from "../hooks/useArtworkAPI";
import toast from "react-hot-toast";
import Link from "next/link";
import { routes } from "@/config/routes";

export default function ArtworkUploadForm() {
  const { useUploadArtwork } = useArtworkAPI();

  const uploadMutation = useUploadArtwork();

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
      uploadMutation.mutate(
        {
          title: values.title,
          description: values.description,
          imageUrl:
            "https://media.istockphoto.com/id/543465140/photo/oil-painting-of-eiffel-tower-france-art-work.jpg?s=612x612&w=0&k=20&c=jorVhJXuNMwX2lChQAch57r_gFWibTG-TQEtcHtrHKU=",
          medium: values.medium,
          dimensions: values.dimensions,
        },
        {
          onSuccess: () => {
            toast.success("Artwork submitted successfully");
            formik.resetForm();
            setPreviewImage(null);
          },
          onError: () => {
            toast.error("Submission failed");
          },
        }
      );
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
      className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Upload New Artwork
      </h2>

      <div className="space-y-4">
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

        <div className="space-y-1">
          <Label htmlFor="medium">Medium</Label>
          <select
            id="medium"
            name="medium"
            value={formik.values.medium}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm border border-gray-300 rounded px-3 py-2"
          />
          {formik.errors.image && (
            <p className="text-red-500 text-sm">{formik.errors.image}</p>
          )}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-4 h-48 object-contain border rounded-lg"
            />
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition py-2 rounded"
      >
        Submit Artwork
      </Button>
      <Link href={routes.artist.submissions}>
        <Button className="border px-4 py-2 rounded hover:bg-gray-50">
          View All Submissions
        </Button>
      </Link>
    </form>
  );
}
