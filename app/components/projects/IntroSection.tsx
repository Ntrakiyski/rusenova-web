'use client';

import React from 'react';
import { Container, Section } from '../ui/Layout';
import { SectionTitle, BodyText } from '../ui/Typography';

/**
 * IntroSection component for single column introduction sections
 *
 * @param {string} title - The section title
 * @param {string|React.ReactNode} description - The section description/content
 * @param {string} [background='bg-white'] - Background color
 * @param {string} [className=''] - Additional CSS classes
 * @param {string} [titleClassName=''] - Additional CSS classes for title
 * @param {string} [contentClassName=''] - Additional CSS classes for content
 */

interface IntroSectionProps {
  title: string;
  description: string | React.ReactNode;
  background?: string;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export function IntroSection({
  title,
  description,
  background = 'bg-white',
  className = '',
  titleClassName = '',
  contentClassName = '',
}: IntroSectionProps) {
  return (
    <Section background={background} className={className}>
      <Container>
        <div className="flex flex-col gap-8">
          <SectionTitle className={titleClassName}>{title}</SectionTitle>

          <div className={`max-w-[768px] ${contentClassName}`}>
            {typeof description === 'string' ? (
              <BodyText size="lg" color="secondary">
                {description}
              </BodyText>
            ) : (
              description
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}