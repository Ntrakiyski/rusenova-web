'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleProjectClick = (type: 'ml' | 'productdesign', slug: string) => {
    const routeType = type === 'productdesign' ? 'product-design' : type;
    router.push(`/${routeType}/${slug}`);
  };

  return null;
}