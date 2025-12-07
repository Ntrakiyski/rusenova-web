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
    <section className={`${background} py-16 md:py-24`}>
      {/* 
        Hide scrollbar styles (only applies when horizontal scrolling is active on desktop)
      */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
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

        {/* Cream Container */}
        <div className="rounded-[16px] bg-[#F7F4ED] p-6 md:p-8 overflow-hidden">
          
          {/* Scroll Wrapper */}
          <div className="w-full sm:overflow-x-auto sm:pb-4 sm:-mb-4 scrollbar-hide">
            
            {/* Flex Strip */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 w-full sm:w-max">
              
              {cards.map((card, index) => (
                <React.Fragment key={index}>
                  
                  {/* The Card 
                      flex flex-col justify-center items-center: Ensures content is centered
                  */}
                  <div className="flex-shrink-0 w-full sm:w-auto sm:min-w-[220px] bg-bg-white rounded-[12px] p-6 md:p-8 flex flex-col justify-center items-center">
                    {/* 
                      text-center: Center text on all breakpoints
                    */}
                    <h3 className="font-bricolage text-text-primary text-text-xl-semibold text-center">
                      {card.title}
                    </h3>
                  </div>

                  {/* Arrows logic */}
                  {index < cards.length - 1 && (
                    <div className="flex-shrink-0 text-text-primary">
                      
                      {/* Mobile Arrow: Down */}
                      <div className="block sm:hidden">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M5 12l7 7 7-7"/>
                        </svg>
                      </div>

                      {/* Desktop Arrow: Right */}
                      <div className="hidden sm:block">
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