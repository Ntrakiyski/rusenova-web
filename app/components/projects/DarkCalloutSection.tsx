'use client';

import React from 'react';
import { Container, Section } from '../ui/Layout';
import { Heading3, BodyText } from '../ui/Typography';

/**
 * DarkCalloutSection component for dark background callout sections
 *
 * @param {string} title - The section title
 * @param {string} description - The section description
 * @param {string} [background='radial-gradient(ellipse 60% 40px at center bottom, rgba(243, 131, 0, 0.15), transparent), #252222'] - Background style
 * @param {string} [className=''] - Additional CSS classes
 * @param {string} [titleClassName=''] - Additional CSS classes for title
 * @param {string} [descriptionClassName=''] - Additional CSS classes for description
 */

interface DarkCalloutSectionProps {
  title: string;
  description: string;
  background?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function DarkCalloutSection({
  title,
  description,
  background = 'radial-gradient(ellipse 60% 40px at center bottom, rgba(243, 131, 0, 0.15), transparent), #252222',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
}: DarkCalloutSectionProps) {
  return (
    <Section
      background={background}
      className={`box-border content-stretch flex flex-col gap-[64px] items-center px-0 py-[96px] relative ${className}`}
    >
      <Container>
        <div className="flex flex-col gap-8 items-center text-center">
          <Heading3 className={`text-white ${titleClassName}`}>{title}</Heading3>

          <BodyText
            size="lg"
            color="white"
            className={`max-w-[768px] ${descriptionClassName}`}
          >
            {description}
          </BodyText>
        </div>
      </Container>
    </Section>
  );
}