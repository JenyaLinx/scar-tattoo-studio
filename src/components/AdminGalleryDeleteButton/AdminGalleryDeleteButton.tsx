"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { deleteGalleryImage } from "@/app/admin/gallery/actions";

import styles from "./AdminGalleryDeleteButton.module.css";

type AdminGalleryDeleteButtonProps = {
  imageId: number;
};

export default function AdminGalleryDeleteButton({
  imageId,
}: AdminGalleryDeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteGalleryImage(imageId);

      toast.success("Image deleted.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete image.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      className={styles.button}
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete image"}
    </button>
  );
}
