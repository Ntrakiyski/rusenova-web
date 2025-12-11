'use client';

import React from 'react';

interface MLSystemApproachProps {
  title: string;
  description: string;
  cards: { title: string }[];
  background?: string;
}

export default function MLSystemApproach({
  title,
  description,
  cards,
  background = 'bg-bg-white'
}: MLSystemApproachProps) {
  return (
    <section className={`${background} py-16 md:py-24 lg:py-32`}>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
          {title && (
            <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-secondary text-text-xl-regular max-w-[768px]">
              {description}
            </p>
          )}
        </div>

        {/* Cream Container - Always resizes to fit all cards */}
        <div className="rounded-[16px] bg-[#F7F4ED] p-6 md:p-8">
          
          {/* Flex Container - Cards always visible, resize to fit */}
          <div className="w-full">
            {/* Flex Strip - Vertical on mobile, horizontal on desktop */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full">
              
              {cards.map((card, index) => (
                <React.Fragment key={index}>
                  
                  {/* The Card - Full width on mobile, proportional on desktop */}
                  <div className="w-full md:flex-1 md:min-w-0 bg-bg-white rounded-[12px] p-6 md:p-8 flex flex-col justify-center items-center">
                    {/* 
                      text-center: Center text on all breakpoints
                    */}
                    <h3 className="font-bricolage text-text-primary text-text-xl-semibold text-center">
                      {card.title}
                    </h3>
                  </div>


                  {/* Arrow - Down on mobile, right on desktop */}
                  {index < cards.length - 1 && (
                    <div className="flex-shrink-0 text-text-primary">
                      {/* Mobile Arrow: Down */}
                      <div className="block md:hidden">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M5 12l7 7 7-7"/>
                        </svg>
                      </div>

                      {/* Desktop Arrow: Right */}
                      <div className="hidden md:block">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  )}

                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}