"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

interface GalleryCardProps {
  images: GalleryImage[];
  onImagesChange: (images: GalleryImage[]) => void;
}

export default function GalleryCard({ images = [], onImagesChange }: GalleryCardProps) {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(images);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: GalleryImage[] = [...galleryImages];

    Array.from(files).forEach((file) => {
      // 실제 구현에서는 이미지 업로드 로직이 필요합니다
      const imageUrl = URL.createObjectURL(file);
      newImages.push({
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        url: imageUrl,
      });
    });

    setGalleryImages(newImages);
    onImagesChange(newImages);
  };

  const handleRemoveImage = (id: string) => {
    const updatedImages = galleryImages.filter((image) => image.id !== id);
    setGalleryImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleCaptionChange = (id: string, caption: string) => {
    const updatedImages = galleryImages.map((image) => {
      if (image.id === id) {
        return { ...image, caption };
      }
      return image;
    });

    setGalleryImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleReorder = (dragIndex: number, dropIndex: number) => {
    const updatedImages = [...galleryImages];
    const draggedImage = updatedImages[dragIndex];

    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(dropIndex, 0, draggedImage);

    setGalleryImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <CustomizationCard title="갤러리">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">청첩장에 표시할 사진을 업로드하세요.</p>

        {/* 이미지 업로드 버튼 */}
        <div>
          <label
            htmlFor="gallery-image-upload"
            className="flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 py-6 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <span>사진 업로드 (최대 10장)</span>
            <input
              id="gallery-image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              disabled={galleryImages.length >= 10}
            />
          </label>
          {galleryImages.length >= 10 && (
            <p className="mt-1 text-xs text-rose-500">최대 10장까지만 업로드할 수 있습니다.</p>
          )}
        </div>

        {/* 업로드된 이미지 목록 */}
        {galleryImages.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">
              업로드된 사진 ({galleryImages.length}/10)
            </p>

            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg border border-gray-200"
                >
                  <img
                    src={image.url}
                    alt={image.caption || `갤러리 이미지 ${index + 1}`}
                    className="h-32 w-full object-cover"
                  />

                  {/* 이미지 캡션 */}
                  <input
                    type="text"
                    value={image.caption || ""}
                    onChange={(e) => handleCaptionChange(image.id, e.target.value)}
                    placeholder="사진 설명 입력"
                    className="w-full border-t border-gray-200 bg-white p-1 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  />

                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => handleRemoveImage(image.id)}
                    className="bg-opacity-50 absolute top-1 right-1 rounded-full bg-black p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 갤러리 표시 옵션 */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="mb-2 text-sm font-medium text-gray-700">갤러리 표시 방식</p>
          <div className="flex flex-wrap gap-2">
            {["그리드", "슬라이더", "모자이크"].map((option) => (
              <button
                key={option}
                className="rounded-md bg-white px-3 py-1 text-sm shadow-sm hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
