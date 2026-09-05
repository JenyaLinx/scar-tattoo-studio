"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createGalleryImage } from "@/app/admin/gallery/actions";
import { createClient } from "@/lib/supabase/client";

import styles from "./AdminGalleryUpload.module.css";

type ArtistOption = {
  id: number;
  name: string;
  specialty: string;
};

type AdminGalleryUploadProps = {
  artists: ArtistOption[];
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

export default function AdminGalleryUpload({
  artists,
}: AdminGalleryUploadProps) {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [artistId, setArtistId] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please select a JPG, PNG or WebP image.");

      event.target.value = "";
      setFile(null);

      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("Image must be smaller than 5 MB.");

      event.target.value = "";
      setFile(null);

      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!artistId) {
      toast.error("Please select an artist.");
      return;
    }

    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    setIsUploading(true);

    const supabase = createClient();

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";

    const fileName = `${crypto.randomUUID()}.${extension}`;

    const storagePath = `${artistId}/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("artist-images")
        .upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("artist-images").getPublicUrl(storagePath);

      try {
        await createGalleryImage({
          artistId: Number(artistId),
          imageUrl: publicUrl,
          storagePath,
        });
      } catch (error) {
        await supabase.storage.from("artist-images").remove([storagePath]);

        throw error;
      }

      toast.success("Image added to gallery.");

      setArtistId("");
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to upload image.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Add new image</p>

          <h2>Upload artwork</h2>
        </div>

        <span className={styles.number}>+</span>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="gallery-artist">Artist</label>

          <select
            id="gallery-artist"
            value={artistId}
            onChange={(event) => setArtistId(event.target.value)}
            disabled={isUploading}
          >
            <option value="">Select artist</option>

            {artists.map((artist) => (
              <option value={artist.id} key={artist.id}>
                {artist.name} — {artist.specialty}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="gallery-image">Image</label>

          <input
            ref={fileInputRef}
            id="gallery-image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
          />

          <p className={styles.help}>JPG, PNG or WebP · maximum 5 MB</p>
        </div>
      </div>

      {file && (
        <div className={styles.fileInfo}>
          <span>Selected</span>

          <strong>{file.name}</strong>
        </div>
      )}

      <button
        className={styles.submitButton}
        type="submit"
        disabled={isUploading || !artistId || !file}
      >
        {isUploading ? "Uploading..." : "Upload image"}

        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
