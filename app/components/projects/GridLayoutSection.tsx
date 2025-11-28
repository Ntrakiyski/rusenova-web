'use client';

import React from 'react';
import { Container, Section, Grid } from '../ui/Layout';
import { SectionTitle, BodyText } from '../ui/Typography';
import { SingleImageGallery } from '../ui/ImageGallery';

/**
 * GridLayoutSection component for two-row grid layouts with alternating content
 *
 * @param {Array} rows - Array of row data
 * @param {string} [background='bg-white'] - Background color
 * @param {string} [className=''] - Additional CSS classes
 */

interface GridRow {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  content?: React.ReactNode;
  imagePosition?: 'left' | 'right';
}

interface GridLayoutSectionProps {
  rows: GridRow[];
  background?: string;
  className?: string;
}

export function GridLayoutSection({
  rows,
  background = 'bg-white',
  className = '',
}: GridLayoutSectionProps) {
  return (
    <Section background={background} className={className}>
      <Container>
        {rows.map((row, rowIndex) => (
          <div key={row.id} className="content-stretch flex items-start relative shrink-0 w-full mb-16">
            <div className="flex flex-row items-center justify-end size-full">
              <div className="box-border content-stretch flex gap-[64px] items-center justify-end pl-0 pr-[64px] py-0 relative size-full">
                {/* Content Column */}
                <div className="basis-0 grow max-w-[560px] min-h-px min-w-px relative rounded-[16px] shrink-0">
                  <div className="box-border content-stretch flex items-start max-w-inherit p-[32px] relative w-full">
                    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
                      {row.title && (
                        <SectionTitle>{row.title}</SectionTitle>
                      )}

                      {row.description && (
                        <BodyText size="md" color="secondary">
                          {row.description}
                        </BodyText>
                      )}

                      {row.content && row.content}
                    </div>
                  </div>
                </div>

                {/* Image Column */}
                {row.image && (
                  <div className="basis-0 grow max-w-[560px] min-h-px min-w-px relative rounded-[16px] shrink-0">
                    <div className="box-border content-stretch flex items-start max-w-inherit p-[32px] relative w-full">
                      <SingleImageGallery
                        src={row.image}
                        className="w-[496px]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Container>
    </Section>
  );
}