'use client';

import React from 'react';
import { BodyText, Highlight } from './Typography';

/**
 * AchievementList component for displaying lists of achievements with bullet points
 */

interface AchievementItem {
  text: string;
  highlight?: string;
  highlightColor?: 'primary' | 'accent';
}

interface AchievementListProps {
  items: AchievementItem[] | string[];
  className?: string;
  bulletColor?: 'accent' | 'primary';
}

export function AchievementList({
  items,
  className = '',
  bulletColor = 'accent',
}: AchievementListProps) {
  const bulletColorClasses = {
    accent: 'bg-[#f38300]',
    primary: 'bg-[#191818]',
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {items.map((item, index) => {
        // Handle both string and object format
        const achievementText = typeof item === 'string' ? item : item.text;
        const highlight = typeof item === 'string' ? null : item.highlight;
        const highlightColor = typeof item === 'string' ? 'accent' : item.highlightColor || 'accent';

        // Find highlighted parts if they exist
        const parts = highlight
          ? achievementText.split(highlight)
          : [achievementText];

        return (
          <div key={index} className="flex gap-3 items-start">
            <div className="shrink-0 mt-1">
              <div className={`w-3 h-3 rounded-full ${bulletColorClasses[bulletColor]}`} />
            </div>
            <div className="flex-1">
              <BodyText size="md" className="leading-[28px]">
                {parts.map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < parts.length - 1 && (
                      <Highlight color={highlightColor} fontWeight="Bold">
                        {highlight}
                      </Highlight>
                    )}
                  </React.Fragment>
                ))}
              </BodyText>
            </div>
          </div>
        );
      })}
    </div>
  );
}