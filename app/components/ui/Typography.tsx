'use client';

import React from 'react';

/**
 * Typography components for consistent text styling across the application
 * using Bricolage Grotesque font with proper font variation settings
 */

interface BaseTypographyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface HeadingProps extends BaseTypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  fontWeight?: 'Regular' | 'SemiBold' | 'Bold' | 'ExtraBold' | 'Light';
}

interface BodyTextProps extends BaseTypographyProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fontWeight?: 'Regular' | 'SemiBold' | 'Bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'white' | 'accent';
}

/**
 * Heading component with responsive sizing and font weight options
 */
export function Heading1({
  children,
  fontWeight = 'Bold',
  className = '',
  style = {},
}: Omit<HeadingProps, 'level'>) {
  const baseClasses = `font-['Bricolage_Grotesque:${fontWeight}',sans-serif]`;
  const fontVariation = { fontVariationSettings: "'opsz' 14, 'wdth' 100" };

  return (
    <h1
      className={`${baseClasses} text-[36px] md:text-[48px] lg:text-[64px] leading-tight ${className}`}
      style={{ ...fontVariation, ...style }}
    >
      {children}
    </h1>
  );
}

export function Heading2({
  children,
  fontWeight = 'SemiBold',
  className = '',
  style = {},
}: Omit<HeadingProps, 'level'>) {
  const baseClasses = `font-['Bricolage_Grotesque:${fontWeight}',sans-serif]`;
  const fontVariation = { fontVariationSettings: "'opsz' 14, 'wdth' 100" };

  return (
    <h2
      className={`${baseClasses} text-[28px] md:text-[36px] leading-[44px] ${className}`}
      style={{ ...fontVariation, ...style }}
    >
      {children}
    </h2>
  );
}

export function Heading3({
  children,
  fontWeight = 'SemiBold',
  className = '',
  style = {},
}: Omit<HeadingProps, 'level'>) {
  const baseClasses = `font-['Bricolage_Grotesque:${fontWeight}',sans-serif]`;
  const fontVariation = { fontVariationSettings: "'opsz' 14, 'wdth' 100" };

  return (
    <h3
      className={`${baseClasses} text-[24px] md:text-[28px] leading-[36px] ${className}`}
      style={{ ...fontVariation, ...style }}
    >
      {children}
    </h3>
  );
}

export function Heading4({
  children,
  fontWeight = 'SemiBold',
  className = '',
  style = {},
}: Omit<HeadingProps, 'level'>) {
  const baseClasses = `font-['Bricolage_Grotesque:${fontWeight}',sans-serif]`;
  const fontVariation = { fontVariationSettings: "'opsz' 14, 'wdth' 100" };

  return (
    <h4
      className={`${baseClasses} text-[20px] leading-[30px] ${className}`}
      style={{ ...fontVariation, ...style }}
    >
      {children}
    </h4>
  );
}

/**
 * BodyText component for paragraph and body text
 */
export function BodyText({
  children,
  size = 'md',
  fontWeight = 'Regular',
  color = 'primary',
  className = '',
  style = {},
}: BodyTextProps) {
  const baseClasses = `font-['Bricolage_Grotesque:${fontWeight}',sans-serif]`;
  const fontVariation = { fontVariationSettings: "'opsz' 14, 'wdth' 100" };

  const sizeClasses = {
    sm: 'text-[14px] leading-[20px]',
    md: 'text-[16px] leading-[24px]',
    lg: 'text-[18px] leading-[28px]',
    xl: 'text-[20px] leading-[30px]',
  };

  const colorClasses = {
    primary: 'text-[#191818]',
    secondary: 'text-[#494848]',
    tertiary: 'text-[#babcc0]',
    white: 'text-white',
    accent: 'text-[#f0633f]',
  };

  return (
    <p
      className={`${baseClasses} ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      style={{ ...fontVariation, ...style }}
    >
      {children}
    </p>
  );
}

/**
 * SectionTitle component for section headings
 */
export function SectionTitle({
  children,
  className = '',
  style = {},
}: BaseTypographyProps) {
  return (
    <Heading2 fontWeight="SemiBold" className={className} style={style}>
      {children}
    </Heading2>
  );
}

/**
 * Subtitle component for section subtitles
 */
export function Subtitle({
  children,
  className = '',
  style = {},
}: BaseTypographyProps) {
  return (
    <BodyText size="xl" color="secondary" className={className} style={style}>
      {children}
    </BodyText>
  );
}

/**
 * Highlight component for emphasized text
 */
export function Highlight({
  children,
  fontWeight = 'SemiBold',
  color = 'accent',
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  fontWeight?: 'Regular' | 'SemiBold' | 'Bold';
  color?: 'primary' | 'accent' | 'white';
  className?: string;
  style?: React.CSSProperties;
}) {
  const baseClasses = `font-['Bricolage_Grotesque:${fontWeight}',sans-serif]`;
  const fontVariation = { fontVariationSettings: "'opsz' 14, 'wdth' 100" };

  const colorClasses = {
    primary: 'text-[#191818]',
    accent: 'text-[#f38300]',
    white: 'text-white',
  };

  return (
    <span
      className={`${baseClasses} ${colorClasses[color]} ${className}`}
      style={{ ...fontVariation, ...style }}
    >
      {children}
    </span>
  );
}