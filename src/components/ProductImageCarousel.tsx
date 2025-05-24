
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export const ProductImageCarousel = ({ images, productName }: ProductImageCarouselProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fallback to placeholder if no images
  const imageUrls = images && images.length > 0 
    ? images 
    : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"];

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={imageUrls[selectedImageIndex]}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Carousel - Only show if more than 1 image */}
      {imageUrls.length > 1 && (
        <div className="px-4">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {imageUrls.map((url, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/4 md:basis-1/5">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto aspect-square"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={url}
                      alt={`${productName} thumbnail ${index + 1}`}
                      className={`w-full h-full object-cover rounded-md border-2 transition-colors ${
                        selectedImageIndex === index 
                          ? 'border-blue-500' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    />
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </div>
  );
};
