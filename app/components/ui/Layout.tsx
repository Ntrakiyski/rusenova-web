'use client';

import React from 'react';

/**
 * Layout components for consistent spacing and container patterns
 */

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}

interface GridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 5;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}

/**
 * Container component for consistent max-width and padding
 */
export function Container({
  children,
  className = '',
  size = 'lg',
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-[768px]',
    md: 'max-w-[1024px]',
    lg: 'max-w-[1280px]',
    full: 'w-full',
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Section component for consistent section spacing and backgrounds
 */
export function Section({
  children,
  className = '',
  background = 'bg-white',
  padding = 'lg',
  id,
}: SectionProps) {
  const paddingClasses = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-20 md:py-32',
  };

  return (
    <section
      id={id}
      className={`${background} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Grid component for responsive grid layouts
 */
export function Grid({
  children,
  className = '',
  columns = 1,
  gap = 'md',
}: GridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  return (
    <div className={`grid ${gridClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Flex component for flexible layouts
 */
export function Flex({
  children,
  className = '',
  direction = 'row',
  justify = 'start',
  align = 'start',
  gap = 'md',
  wrap = false,
}: FlexProps) {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse',
  };

  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  return (
    <div
      className={`flex ${directionClasses[direction]} ${justifyClasses[justify]} ${alignClasses[align]} ${gapClasses[gap]} ${wrap ? 'flex-wrap' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * TwoColumn component for common two-column layouts
 */
export function TwoColumn({
  children,
  className = '',
  reverse = false,
  gap = 'lg',
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8 md:gap-12',
    xl: 'gap-8 md:gap-16',
  };

  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} ${gapClasses[gap]} items-start ${className}`}>
      {children}
    </div>
  );
}