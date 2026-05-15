'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Leaf, ShoppingBag, CheckCircle, Flame, Droplets, Info, X, ChevronUp, Sparkles, Layers, Zap, Sprout } from 'lucide-react';
import { Microgreen } from '@/data/microgreens';
import Image from 'next/image';

interface Props {
  microgreen: Microgreen;
  isActive: boolean;
}

export default function MicrogreenSlide({ microgreen, isActive }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const textOpacity = useTransform(x, [0, 120], [1, 0]);
  const fillWidth = useTransform(x, (value) => `${value + 52}px`);

  const handleOrder = () => {
    const text = encodeURIComponent(`Hi VYRA Greens! I'm interested in ordering fresh ${microgreen.name} microgreens.`);
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <motion.div 
      className="w-full h-[100dvh] absolute inset-0 text-white flex flex-col justify-end pb-8 px-6 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background image has been moved to the Swiper in page.tsx */}

      {/* Top Center Title */}
      <motion.div
        className="absolute top-16 left-0 right-0 z-20 flex flex-col items-center justify-center text-center px-4"
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        animate={isActive ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(8px)' }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          className="text-5xl font-bold tracking-tight flex flex-col items-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
          style={{ textShadow: `0 0 30px ${microgreen.color}80`, fontFamily: 'var(--font-sunflower), sans-serif' }}
        >
          <span>{microgreen.name}</span>
          <span
            className="text-4xl font-normal mt-0 opacity-90"
            style={{ fontFamily: 'var(--font-cursive), cursive', color: microgreen.color }}
          >
            Microgreen
          </span>
        </h1>

        {/* Pure Minimalist Taste Breakdown */}
        <div className="mt-7 flex justify-center gap-10 items-center max-w-xs w-full translate-x-5">
          {[
            { label: 'Taste', icon: '/taste icon.png', value: microgreen.tasteProfile.split(',')[0]?.trim() },
            { label: 'Texture', icon: '/Texture icon.png', value: microgreen.tasteProfile.split(',')[1]?.trim() },
            { label: 'Flavor', icon: '/Flavor icon (2).png', value: microgreen.tasteProfile.split(',')[2]?.trim() }
          ].map((item, index) => {
            return (
              <div key={index} className="flex-1 flex justify-center items-center">
                <div className="relative flex flex-col items-center text-center">
                  {/* Absolutely Floated Masked Icon on the Left */}
                  <div
                    className="absolute right-full top-1/2 -translate-y-1/2 mr-2.5 w-10 h-10 opacity-95 transition-colors duration-300"
                    style={{
                      backgroundColor: microgreen.color,
                      WebkitMaskImage: `url('${item.icon}')`,
                      maskImage: `url('${item.icon}')`,
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center'
                    }}
                  />

                  {/* Statically Centered Text Stack */}
                  <span 
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-0.5 drop-shadow-sm whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    {item.label}
                  </span>
                  <span 
                    className="text-base font-bold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Content Overlay */}
      <motion.div
        className="relative z-10 w-full max-w-sm mx-auto pointer-events-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >


        {/* View Info Trigger */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative w-full flex items-center justify-between py-2 group">
            <span 
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/70 transition-colors"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Nutritional Info
            </span>
            <div className="flex-1 border-b border-dashed border-white/20 mx-4 transition-colors" />
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
            >
              <ChevronUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Swipe to Order CTA */}
        <motion.div variants={itemVariants} className="relative w-full h-[64px] rounded-full overflow-hidden p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.3)] bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10">
          {/* Progress Fill Backing */}
          <motion.div 
            className="absolute left-1.5 top-1.5 bottom-1.5 rounded-full pointer-events-none opacity-80"
            style={{ 
              width: fillWidth, 
              backgroundColor: `${microgreen.color}20`,
              borderRight: `1px solid ${microgreen.color}40`
            }}
          />

          {/* Background Text */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none gap-2"
            style={{ opacity: textOpacity }}
          >
            <span 
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/40 pl-8 flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Swipe to Order
            </span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex opacity-30 -mt-0.5"
            >
              <ChevronUp className="w-3 h-3 rotate-90 -mr-1.5" />
              <ChevronUp className="w-3 h-3 rotate-90 -mr-1.5" />
              <ChevronUp className="w-3 h-3 rotate-90" />
            </motion.div>
          </motion.div>

          {/* Track boundary for drag */}
          <div className="w-full h-full relative" ref={trackRef}>
            <motion.div
              drag="x"
              dragConstraints={trackRef}
              dragElastic={0.02}
              dragSnapToOrigin={true}
              style={{ x, backgroundColor: microgreen.color }}
              onDragEnd={(e, info) => {
                const width = trackRef.current?.getBoundingClientRect().width || 240;
                const threshold = (width - 52) * 0.8; // Requires 80% swipe to trigger
                if (info.offset.x > threshold) {
                  handleOrder();
                }
              }}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.02 }}
              className="absolute left-0 top-0 w-[52px] h-[52px] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              <ShoppingBag className="w-5 h-5 text-black" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="absolute inset-0 z-40 swiper-no-swiping pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 z-50 pointer-events-auto"
            >
              {/* Overlapping Circular Image (Unclipped) */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full border-[6px] border-white/10 backdrop-blur-[24px] bg-[#0d0d0d]/80 overflow-hidden shadow-2xl z-20">
                <Image src={microgreen.image} alt={microgreen.name} fill className="object-cover" />
              </div>

              {/* Drawer Content Area (Non-scrollable, Ultra-Glassmorphic) */}
              <div className="bg-[#0d0d0d]/75 backdrop-blur-[24px] rounded-t-[2.5rem] pt-24 px-6 pb-8 shadow-[0_-20px_60px_rgba(0,0,0,0.8)] border-t border-white/10 relative z-10">

                {/* Title & Taste Pill */}
                <div className="flex justify-between items-start mb-8 mt-2">
                  <div>
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 border transition-colors"
                      style={{
                        backgroundColor: `${microgreen.color}10`,
                        color: microgreen.color,
                        borderColor: `${microgreen.color}30`
                      }}
                    >
                      <div
                        className="w-3.5 h-3.5 opacity-95 flex-shrink-0"
                        style={{
                          backgroundColor: microgreen.color,
                          WebkitMaskImage: `url('/Flavor icon (2).png')`,
                          maskImage: `url('/Flavor icon (2).png')`,
                          WebkitMaskSize: 'contain',
                          maskSize: 'contain',
                          WebkitMaskRepeat: 'no-repeat',
                          maskRepeat: 'no-repeat',
                          WebkitMaskPosition: 'center',
                          maskPosition: 'center'
                        }}
                      />
                      {microgreen.tasteProfile}
                    </div>
                    <h2 className="text-3xl font-black text-white">{microgreen.name}</h2>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold text-white mt-1 border border-white/10">
                    Premium
                  </div>
                </div>

                {/* Perfect For (Styled like the reference pills) */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white mb-4">Perfect For</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {microgreen.dishes.map((dish, i) => (
                      <div
                        key={i}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${i === 0 ? 'text-black' : 'bg-white/5 text-gray-300 border border-white/10'
                          }`}
                        style={i === 0 ? { backgroundColor: microgreen.color } : {}}
                      >
                        {dish}
                      </div>
                    ))}
                  </div>
                </div>

                {/* About (Clean paragraph replacement for the lists) */}
                <div className="mb-10">
                  <h3 className="text-sm font-bold text-white mb-3">About</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    A powerhouse of nutrition, these premium microgreens are perfectly cultivated to elevate your dishes. They are highly recognized for being <strong className="text-gray-200 font-medium">{microgreen.benefits.join(', ').toLowerCase()}</strong>. Rich in essential vitamins like <strong className="text-gray-200 font-medium">{microgreen.vitamins.join(', ')}</strong>, making them the ultimate superfood addition to your daily diet.
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center shrink-0 text-white/70 hover:bg-white/10 transition-colors"
                  >
                    <ChevronUp className="w-6 h-6 rotate-180" />
                  </button>
                  <button
                    onClick={handleOrder}
                    className="flex-1 h-14 rounded-full font-bold text-lg flex items-center justify-center transition-transform active:scale-95 shadow-[0_8px_20px_rgba(0,0,0,0.3)] text-black gap-2"
                    style={{ backgroundColor: microgreen.color }}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
