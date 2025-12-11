'use client';

import React from 'react';
import Image from 'next/image';

interface PDTelenorImagesProps {
  image1?: string;
  image2?: string;
}

export default function PDTelenorImages({ 
  image1 = "/telenor-example2.png",
  image2 = "/telenor-example1.png"
}: PDTelenorImagesProps) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center justify-between w-full">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 max-w-[500px] h-auto overflow-clip rounded-lg relative">
            <Image
              src={image1}
              alt="Telenor project example"
              width={500}
              height={300}
              className="object-cover w-full h-auto"
            />
          </div>
          
          {/* Right Image */}
          <div className="w-full lg:w-1/2 max-w-[500px] h-auto overflow-clip rounded-lg relative">
            <Image
              src={image2}
              alt="Telenor project example"
              width={500}
              height={300}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}