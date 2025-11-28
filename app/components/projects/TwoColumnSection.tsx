'use client';

import React from 'react';
import { Container, Section, TwoColumn } from '../ui/Layout';
import { SectionTitle, BodyText } from '../ui/Typography';
import { AchievementList } from '../ui/AchievementList';
import { StackedImageGallery } from '../ui/ImageGallery';

/**
 * TwoColumnSection component for flexible two-column layouts
 *
 * @param {string} title - The section title
 * @param {string|React.ReactNode} description - The section description/content
 * @param {string[]|React.ReactNode} achievements - List of achievements or custom content
 * @param {string[]} images - Array of image URLs for the image gallery
 * @param {string} [background='bg-[#f7f4ed]'] - Background color
 * @param {string} [className=''] - Additional CSS classes
 * @param {boolean} [reverse=false] - Reverse the column order (image left, text right)
 * @param {string} [imageClassName=''] - Additional CSS classes for image container
 * @param {string} [contentClassName=''] - Additional CSS classes for content container
 * @param {string} [titleClassName=''] - Additional CSS classes for title
 */

interface TwoColumnSectionProps {
  title: string;
  description: string | React.ReactNode;
  achievements: string[] | React.ReactNode;
  images: string[];
  background?: string;
  className?: string;
  reverse?: boolean;
  imageClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
}

export function TwoColumnSection({
  title,
  description,
  achievements,
  images,
  background = 'bg-[#f7f4ed]',
  className = '',
  reverse = false,
  imageClassName = '',
  contentClassName = '',
  titleClassName = '',
}: TwoColumnSectionProps) {
  return (
    <Section background={background} className={className}>
      <Container>
        <TwoColumn reverse={reverse} gap="xl">
          {/* Text Content Column */}
          <div className={`flex flex-col gap-12 ${contentClassName}`}>
            <div className="flex flex-col gap-6">
              <SectionTitle className={titleClassName}>{title}</SectionTitle>

              <div className="max-w-[560px]">
                {typeof description === 'string' ? (
                  <BodyText size="md">{description}</BodyText>
                ) : (
                  description
                )}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="max-w-[560px]">
              {Array.isArray(achievements) ? (
                <AchievementList items={achievements} />
              ) : (
                achievements
              )}
            </div>
          </div>

          {/* Image Column */}
          <div className={`flex justify-center lg:justify-end ${imageClassName}`}>
            <StackedImageGallery images={images} />
          </div>
        </TwoColumn>
      </Container>
    </Section>
  );
}