'use client';

import homeContent from '@/app/data/homeContent.json';
import { useEffect } from 'react';
import { HomeContent } from '@/types/project';
import HomePageView from './HomePageView';

type TypedHomeContent = HomeContent;
const typedHomeContent = homeContent as TypedHomeContent;

export default function HomePageContent() {
  useEffect(() => {
    const handleRefresh = async () => {
      try {
        await import('@/app/data/homeContent.json?t=' + Date.now());
      } catch (error) {
        console.error('Failed to refresh home content:', error);
      }
    };
    window.addEventListener('refresh-home-content', handleRefresh);
    return () => window.removeEventListener('refresh-home-content', handleRefresh);
  }, []);

  return <HomePageView content={typedHomeContent} />;
}
