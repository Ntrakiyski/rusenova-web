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
  const weightClasses = {
    'Regular': 'font-normal',
    'SemiBold': 'font-semibold',
    'Bold': 'font-bold',
    'ExtraBold': 'font-extrabold',
    'Light': 'font-light',
  };

  return (
    <h1
      className={`font-bricolage ${weightClasses[fontWeight]} text-display-2xl ${className}`}
      style={style}
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
  const weightClasses = {
    'Regular': 'font-normal',
    'SemiBold': 'font-semibold',
    'Bold': 'font-bold',
    'ExtraBold': 'font-extrabold',
    'Light': 'font-light',
  };

  return (
    <h2
      className={`font-bricolage ${weightClasses[fontWeight]} text-display-md ${className}`}
      style={style}
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
  const weightClasses = {
    'Regular': 'font-normal',
    'SemiBold': 'font-semibold',
    'Bold': 'font-bold',
    'ExtraBold': 'font-extrabold',
    'Light': 'font-light',
  };

  return (
    <h3
      className={`font-bricolage ${weightClasses[fontWeight]} text-display-xs ${className}`}
      style={style}
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
  const weightClasses = {
    'Regular': 'font-normal',
    'SemiBold': 'font-semibold',
    'Bold': 'font-bold',
    'ExtraBold': 'font-extrabold',
    'Light': 'font-light',
  };

  return (
    <h4
      className={`font-bricolage ${weightClasses[fontWeight]} text-text-xl-semibold ${className}`}
      style={style}
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
  // Map fontWeight to Tailwind classes
  const weightClasses = {
    'Regular': 'font-normal',
    'SemiBold': 'font-semibold',
    'Bold': 'font-bold',
  };

  // Map size to Tailwind classes
  const sizeClasses = {
    // sm (14px) -> text-sm
    // md (16px) -> text-text-lg-regular (16px fixed)
    // lg (18px) -> text-text-md-regular (16-20px fluid)
    // xl (20px) -> text-text-xl-regular (20-22px)
    sm: 'text-sm',
    md: 'text-text-lg-regular',
    lg: 'text-text-md-regular',
    xl: 'text-text-xl-regular',
  };

  const colorClasses = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    tertiary: 'text-text-light-gray',
    white: 'text-white',
    accent: 'text-text-orange',
  };

  return (
    <p
      className={`font-bricolage ${weightClasses[fontWeight]} ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      style={style}
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
  const weightClasses = {
    'Regular': 'font-normal',
    'SemiBold': 'font-semibold',
    'Bold': 'font-bold',
  };

  const colorClasses = {
    primary: 'text-text-primary',
    accent: 'text-text-orange',
    white: 'text-white',
  };

  return (
    <span
      className={`font-bricolage ${weightClasses[fontWeight]} ${colorClasses[color]} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}