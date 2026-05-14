'use client';

import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

export default function DesktopWarning() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth > 768) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center p-8 text-center text-white">
      <Leaf className="w-16 h-16 text-vyra-green mb-6" />
      <h1 className="text-3xl font-light mb-4">Mobile Only Experience</h1>
      <p className="text-gray-400 max-w-md leading-relaxed">
        VYRA Greens is designed as an immersive, swipe-based cinematic catalog specifically optimized for your mobile device. 
        <br/><br/>
        Please visit this link on your smartphone to experience it as intended.
      </p>
    </div>
  );
}
