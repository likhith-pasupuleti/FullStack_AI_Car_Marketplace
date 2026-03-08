"use client";

import React, { useState, useCallback } from "react";
import { Input } from "./ui/input";
import { Camera, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }
    setIsUploading(true);
    setSearchImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setIsUploading(false);
      toast.success("Image uploaded successfully");
    };

    reader.onerror = () => {
      setIsUploading(false);
      toast.error("Failed to read the image");
    };

    reader.readAsDataURL(file);
  });

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: { "image/*": [".jpeg", ".jpg", ".png"] },
      maxFiles: 1,
    });

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleImageSearch = async (e) => {
    e.preventDefault();
    if (!searchImage) {
      toast.error("Please upload an image first");
      return;
    }
  };

  return (
    <div>
      <form onSubmit={handleTextSubmit}>
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Enter make, model, or use our AI Image Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-12 py-6 w-full rounded-full border-gray-800 bg-white/95 backdrop-blur-2xl"
          ></Input>
          <div className="absolute right-[100px]">
            <Camera
              size={45}
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className="cursor-pointer rounded-sm p-1.5"
              style={{
                background: isImageSearchActive ? "gray-300" : "",
                color: isImageSearchActive ? "orange" : "",
              }}
            />
          </div>
          <Button
            type="submit"
            className="absolute right-2 rounded-full cursor-pointer "
          >
            Search
          </Button>
        </div>
      </form>

      {isImageSearchActive && (
        <div className="mt-4">
          <form onSubmit={handleImageSearch}>
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center">
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={imagePreview}
                    alt="car-preview"
                    className="h-60 object-contain mb-4"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchImage(null);
                      setImagePreview("");
                      toast.info("Image removed");
                    }}
                    className="cursor-pointer"
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div {...getRootProps()} className="cursor-pointer">
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-2"></Upload>
                    <p className="text-white">
                      {isDragActive && !isDragReject
                        ? "Leave the file here to upload"
                        : "Drag & Drop a car image or click to select"}
                    </p>
                    {isDragReject && (
                      <p className="text-red-500 mb-2 text-lg">
                        Invalid Image Type
                      </p>
                    )}
                    <p className="text-gray-300 text-sm">
                      Supports: JPG, PNG (max 5MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
            {imagePreview && (
              <Button
                className="mt-3 w-full cursor-pointer"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Search with this image"}
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
