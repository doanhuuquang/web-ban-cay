"use client";

import { ProductImage } from "@/lib/models/product-image";
import Image from "next/image";
import React from "react";

export default function ProductImagesShow({
  imageUrls,
}: {
  imageUrls: ProductImage[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  return (
    <div className="w-full h-fit flex lg:flex-col flex-row-reverse gap-4">
      <div className="grow relative aspect-3/4">
        <Image
          src={imageUrls[currentImageIndex].url}
          alt={"Product Image"}
          fill
          className="absolute top-0 left-0 object-center object-cover"
        />
      </div>

      <div className="w-fit h-auto flex lg:flex-row flex-col items-center gap-4">
        {imageUrls.map((image, index) => (
          <div
            key={index}
            className="w-15 relative aspect-3/4 hover:cursor-pointer"
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image
              src={image.url}
              alt={"Product Image"}
              fill
              className="absolute top-0 left-0 object-center object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
