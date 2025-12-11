'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface PDSliderProps {
  title: string;
  description: string;
  achievements: string[];
  sliderImages: string[]; // Array of image paths for the slider
  background?: string;
}

// List of words to bold - add your words here
const WORDS_TO_BOLD = ['no consistent structure', 'company-wide framework', 'discoverability', 'findability', 'daily information','Designed an intuitive entry point','Increased active usage of invoicing by 23%','Started with early-state wireframes mapping the most critical information', 'Conducted iterative research and testing', 'Developed a prioritization framework', 'brand`s unique needs', 'core patterns', 'modular components', 'scalable white label platform'];

// Function to bold specific words in text
const boldSpecificWords = (text: string, wordsToBold: string[] = WORDS_TO_BOLD): React.ReactNode => {
  if (!text || wordsToBold.length === 0) {
    return text;
  }

  // Create a regex pattern that matches any of the words (case-insensitive)
  const pattern = wordsToBold
    .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape special regex characters
    .join('|');
  
  const regex = new RegExp(`(${pattern})`, 'gi');

  // Split text by the regex and wrap matches in <strong> tags with color
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // If the part matches any of our target words (case-insensitive), wrap it in strong tags with color
    const isMatch = wordsToBold.some(word => part.toLowerCase() === word.toLowerCase());
    
    return isMatch ? (
      <strong key={index} className="font-semibold" style={{ color: '#494848' }}>{part}</strong>
    ) : (
      <span key={index}>{part}</span>
    );
  });
};

export default function PDSlider({
  title,
  description,
  achievements,
  sliderImages,
  background = 'bg-bg-light'
}: PDSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollPosition = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Function to highlight specific words in text
  const highlightWords = (text: string, wordsToHighlight: string[]) => {
    return text.split(new RegExp(`(${wordsToHighlight.join('|')})`, 'gi')).map((part, i) => {
      if (wordsToHighlight.some(word => word.toLowerCase() === part.toLowerCase())) {
        return (
          <span key={i} className="font-bricolage font-bold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Determine which words to highlight based on the project title
  const getWordsToHighlight = (projectTitle: string) => {
    if (projectTitle === 'Communication Framework') {
      return ['no consistent structure', 'company-wide framework'];
    } else if (projectTitle === 'Admin') {
      return ['discoverability', 'findability'];
    } else if (projectTitle === 'Home Page Redesign') {
      return ['daily information'];
    }
    return [];
  };

  const wordsToHighlight = getWordsToHighlight(title);

  return (
    <section className="bg-white w-full py-16 md:py-24 lg:py-32">
      <div className="max-w-[1000px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">
          {/* Title */}
          <h2 className="font-bricolage font-semibold text-display-md text-text-primary w-full">
            {boldSpecificWords(title)}
          </h2>

          {/* Single row: Title with text content on left, slider on right */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">
            {/* Left Column: Text Content */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-[48px] items-start w-full lg:w-1/2">
              {/* Description */}
              <p className="font-bricolage font-normal text-text-lg-regular text-text-primary w-full">
                {boldSpecificWords(description)}
              </p>

              {/* Achievements */}
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start w-full">
                

                <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-[12px] items-start w-full">
                  {achievements.map((achievement, index) => {
                    // Extract the bold part from achievement (text between **)
                    const parts = achievement.split(/(managing|every message|decision-tree|company-wide|10-30% increase|intuitive entry point|Increased active usage)/);

                    return (
                      <div key={index} className="flex gap-2 sm:gap-3 md:gap-[10px] items-center w-full">
                       
                        <p className="font-bricolage font-normal text-text-lg-regular text-text-primary flex-1">
                          {boldSpecificWords(achievement)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Slider */}
            <div className="w-full lg:w-1/2 aspect-video overflow-clip rounded-lg">
              <div className="relative w-full h-[560px]">
                {/* Slider Container */}
                <div
                  ref={scrollRef}
                  className="w-full h-full overflow-x-auto pb-4 scrollbar-hide"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  <div className="flex h-full md:gap-3 lg:gap-3">
                    {sliderImages.map((imagePath, index) => (
                      <div key={index} className="w-[300px] shrink-0 h-full relative">
                        <Image
                          alt={`Project image ${index + 1}`}
                          className="object-contain pointer-events-none"
                          src={imagePath}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button
                    onClick={() => scrollSlider('left')}
                    className="ml-2 bg-white/80 hover:bg-white/100 rounded-full p-2 shadow-md transition-all duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-text-primary" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={() => scrollSlider('right')}
                    className="mr-2 bg-white/80 hover:bg-white/100 rounded-full p-2 shadow-md transition-all duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-text-primary" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
