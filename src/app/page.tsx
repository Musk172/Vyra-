'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, EffectCreative } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

import { microgreens } from '@/data/microgreens';
import MicrogreenSlide from '@/components/MicrogreenSlide';
import ParticleField from '@/components/ParticleField';
import { Leaf } from 'lucide-react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-creative';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // Keep displayed briefly to appreciate animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-vyra-dark text-white font-sans overflow-hidden">
      <ParticleField />

      {/* Top Navigation / Brand */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-4 z-50 flex justify-between items-center pointer-events-none">
        <div className="flex items-center">
          <img
            src="/Logo.jpeg"
            alt="VYRA Logo"
            className="h-10 w-10 object-cover rounded-full opacity-80 shadow-lg border border-white/10"
          />
        </div>

        <div
          className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.25em] text-white/50"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          <span>Swipe to Explore</span>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="font-semibold tracking-normal flex items-center text-white/70 text-[10px]">
            <span>{activeIndex + 1}</span>
            <span className="mx-0.5 text-white/30">/</span>
            <span>{microgreens.length}</span>
          </div>
        </div>
      </div>

      {/* Swiper for Images ONLY */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Parallax, EffectCreative]}
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -1],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }}
          parallax={true}
          direction="horizontal"
          speed={1000}
          grabCursor={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full h-full"
        >
          {microgreens.map((mg) => (
            <SwiperSlide key={mg.id}>
              {({ isActive }) => (
                <div className="w-full h-full relative bg-vyra-dark">
                  {mg.backgroundImage && (
                    <Image
                      src={mg.backgroundImage}
                      alt={`${mg.name} Background`}
                      fill
                      className={`object-cover object-center absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${isActive ? 'opacity-100 delay-[1000ms]' : 'opacity-0 delay-0'}`}
                      priority
                      quality={100}
                    />
                  )}
                  <Image
                    src={mg.cutoutImage || mg.image}
                    alt={mg.name}
                    fill
                    className={`${mg.cutoutImage ? 'object-contain object-center z-30 scale-[0.85]' : 'object-cover object-center z-0'}`}
                    priority
                    quality={100}
                    unoptimized={!!mg.cutoutImage}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent pointer-events-none z-20" />
                  <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#0a0a0a]/70 to-transparent pointer-events-none z-20" />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/3 opacity-10 blur-3xl pointer-events-none transition-colors duration-700 z-20"
                    style={{ background: `radial-gradient(circle at bottom, ${mg.color}, transparent 70%)` }}
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Static UI Overlay with AnimatePresence for smooth text transitions */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          <MicrogreenSlide
            key={microgreens[activeIndex].id}
            microgreen={microgreens[activeIndex]}
            isActive={true}
          />
        </AnimatePresence>
      </div>

      {/* Swipe Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none opacity-50">
        <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / microgreens.length) * 100}%` }}
          />
        </div>
      </div>
      {/* Entrance Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute inset-0 z-[100] bg-vyra-dark flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center justify-center gap-6">
              <span className="loader scale-110" />
              <motion.h1 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-[24px] font-black tracking-[0.4em] uppercase text-white pl-[0.4em]"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                VYRA
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
