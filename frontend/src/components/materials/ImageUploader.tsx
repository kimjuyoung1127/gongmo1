'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

interface ImageUploaderProps {
    images: File[];
    onImagesChange: (images: File[]) => void;
    maxImages?: number;
    trigger?: ReactNode; // Component to render when no images are selected (and acts as the add button)
}

export function ImageUploader({
    images,
    onImagesChange,
    maxImages = 5,
    trigger
}: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<string[]>([]);

    // Cleanup previews on unmount
    useEffect(() => {
        return () => {
            previews.forEach(url => URL.revokeObjectURL(url));
        };
    }, []);

    // Update previews when images prop changes
    useEffect(() => {
        const newPreviews = images.map(file => URL.createObjectURL(file));
        setPreviews(prev => {
            // Revoke old previews to avoid memory leaks
            prev.forEach(url => URL.revokeObjectURL(url));
            return newPreviews;
        });
    }, [images]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length + images.length > maxImages) {
            alert(`Maximum ${maxImages} images allowed`);
            return;
        }

        const newImages = [...images, ...files];
        onImagesChange(newImages);

        // Clear input value to allow selecting the same file again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onImagesChange(newImages);
    };

    const triggerClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
            />

            {images.length === 0 && trigger ? (
                <div onClick={triggerClick} className="cursor-pointer">
                    {trigger}
                </div>
            ) : (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}

                    {images.length < maxImages && (
                        <button
                            type="button"
                            onClick={triggerClick}
                            className="aspect-square rounded-lg border-2 border-dashed border-gray-400 flex flex-col items-center justify-center text-gray-600 hover:border-gray-600 hover:text-black transition-all bg-white"
                        >
                            <ImageIcon size={24} />
                            <span className="text-[10px] mt-1 font-medium">Add Photo</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
