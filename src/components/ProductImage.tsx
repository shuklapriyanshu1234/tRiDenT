'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  badge?: string | null;
}

const ProductImage = ({ src, alt, badge }: ProductImageProps) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-gold/10 to-gold-dark/10">
        <div className="text-center">
          <div className="text-6xl mb-4">💊</div>
          <div className="text-muted-foreground">Product Image</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
      />
      {badge && (
        <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-background rounded-full text-sm font-medium">
          {badge}
        </div>
      )}
    </>
  );
};

export default ProductImage;
