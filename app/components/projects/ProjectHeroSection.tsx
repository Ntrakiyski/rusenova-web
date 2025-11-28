'use client';

import React from 'react';
import { Container, Section } from '../ui/Layout';
import { Heading1, BodyText, Highlight } from '../ui/Typography';

/**
 * ProjectHeroSection component for project hero headers
 *
 * @param {string} title - The main title of the project
 * @param {string} subtitle - The subtitle/description of the project
 * @param {string} [background='bg-[#252222]'] - Background color
 * @param {string} [accentColor='text-[#f38300]'] - Accent color for highlighted text
 * @param {string} [textColor='text-white'] - Text color
 * @param {string} [className=''] - Additional CSS classes
 */

interface ProjectHeroSectionProps {
  title: string;
  subtitle: string;
  background?: string;
  accentColor?: string;
  textColor?: string;
  className?: string;
  titleHighlight?: string;
}

export function ProjectHeroSection({
  title,
  subtitle,
  background = 'bg-[#252222]',
  accentColor = 'text-[#f38300]',
  textColor = 'text-white',
  className = '',
  titleHighlight,
}: ProjectHeroSectionProps) {
  // Split title if there's a highlight
  const titleParts = titleHighlight
    ? title.split(titleHighlight)
    : [title];

  return (
    <Section background={background} className={`relative ${className}`}>
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Hero Text */}
          <div className="flex-1 w-full">
            <div className="flex flex-col gap-6">
              <Heading1 className={textColor}>
                {titleParts.map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < titleParts.length - 1 && (
                      <Highlight color="accent">{titleHighlight}</Highlight>
                    )}
                  </React.Fragment>
                ))}
              </Heading1>

              <BodyText size="lg" color="tertiary" className="max-w-[480px]">
                {subtitle}
              </BodyText>
            </div>
          </div>

          {/* Hero Image - placeholder for now */}
          <div className="flex-1 w-full relative">
            <div className="relative w-full max-w-[592px] mx-auto">
              {/* Image will be passed as children */}
              <div className="w-full rounded-[12px] border border-white overflow-hidden">
                {/*
                  This is a placeholder for the actual image
                  Usage: <ProjectHeroSection {...props}><Image src={...} /></ProjectHeroSection>
                */}
                {null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}