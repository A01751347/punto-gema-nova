'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [activeImage, setActiveImage] = useState(images[0] || '');

    // Fallback if no images
    if (!images || images.length === 0) {
        return (
            <div className="aspect-[4/5] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                Sin Imágen
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/5] relative bg-white rounded-xl overflow-hidden border border-gray-100">
                {/* Placeholder logic for now since we don't have real S3 images yet in many cases */}
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    {activeImage ? (
                        // In a real scenario, use Next/Image with the S3 URL
                        // <Image src={activeImage} alt="Product" fill className="object-cover" />
                        <span>Imagen: {activeImage}</span>
                    ) : (
                        <span>Vista Principal</span>
                    )}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(img)}
                            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === img ? 'border-primary' : 'border-transparent hover:border-gray-200'
                                }`}
                        >
                            <div className="w-full h-full bg-gray-50 flex items-center justify-center text-xs text-gray-400">
                                Img {idx + 1}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
