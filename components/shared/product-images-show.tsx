"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function ProductImagesShow({
  imageUrls,
}: {
  imageUrls: string[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  return (
    <div className="w-full h-fit flex lg:flex-col flex-row-reverse gap-4">
      <div className="grow relative aspect-3/4">
        <Image
          src={imageUrls[currentImageIndex]}
          alt={"Product Image"}
          fill
          className="absolute top-0 left-0 object-center object-cover"
        />
      </div>

      <div className="w-fit h-auto flex lg:flex-row flex-col items-center gap-4">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className={cn(
              "w-15 relative aspect-3/4 hover:cursor-pointer",
              index === currentImageIndex && "ring-2 ring-blue-ocean"
            )}
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image
              src={url}
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
