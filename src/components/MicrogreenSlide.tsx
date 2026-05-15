'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ShoppingBag, ChevronUp, Sparkles } from 'lucide-react';
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

  // Ensure body scroll doesn't happen when drawer is open on iOS
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isDrawerOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const drawerContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.07,
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1]
      }
    })
  };

  return (
    <motion.div 
      className="w-full h-[100dvh] absolute inset-0 text-white flex flex-col justify-end px-6 pointer-events-none"
      style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 16px))' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Top Center Title */}
      <motion.div
        className="absolute left-0 right-0 z-20 flex flex-col items-center justify-center text-center px-4"
        style={{ top: 'calc(4rem + env(safe-area-inset-top, 0px))' }}
        initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        animate={isActive ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: -20, filter: 'blur(8px)' }}
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
                  {/* Masked Icon */}
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

                  {/* Text Stack */}
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
        <motion.div variants={itemVariants} className="mb-6">
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
              aria-label="Open Details"
              className="w-10 h-10 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
            >
              <ChevronUp className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Swipe to Order CTA */}
        <motion.div variants={itemVariants} className="relative w-full h-[64px] rounded-full overflow-hidden p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.3)] bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10">
          <motion.div 
            className="absolute left-1.5 top-1.5 bottom-1.5 rounded-full pointer-events-none opacity-80"
            style={{ 
              width: fillWidth, 
              backgroundColor: `${microgreen.color}20`,
              borderRight: `1px solid ${microgreen.color}40`
            }}
          />

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

          <div className="w-full h-full relative" ref={trackRef}>
            <motion.div
              drag="x"
              dragConstraints={trackRef}
              dragElastic={0.02}
              dragSnapToOrigin={true}
              style={{ x, backgroundColor: microgreen.color }}
              onDragEnd={(e, info) => {
                const width = trackRef.current?.getBoundingClientRect().width || 240;
                const threshold = (width - 52) * 0.75;
                if (info.offset.x > threshold) {
                  handleOrder();
                }
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="absolute left-0 top-0 w-[52px] h-[52px] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              <ShoppingBag className="w-5 h-5 text-black" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modern Smooth Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden pointer-events-auto"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Draggable Sliding Container */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.15}
              onDragEnd={(event, info) => {
                if (info.offset.y > 120 || info.velocity.y > 600) {
                  setIsDrawerOpen(false);
                }
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320, mass: 1 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] flex flex-col pointer-events-auto rounded-t-[2.5rem] border-t border-white/10 bg-[#0d0d0d]/90 backdrop-blur-2xl shadow-[0_-15px_50px_rgba(0,0,0,0.7)]"
            >
              {/* Pull Handle & Floating Image Cover Header */}
              <div className="w-full flex flex-col items-center pt-3 pb-1 relative flex-shrink-0">
                <div className="w-12 h-1.5 bg-white/20 rounded-full cursor-pointer hover:bg-white/35 transition-colors mb-2" onClick={() => setIsDrawerOpen(false)} />
                
                {/* Overlapping Circular Image */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-32 h-32 md:w-36 md:h-36 rounded-full border-[5px] border-[#121212] backdrop-blur-xl bg-[#0d0d0d]/60 overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.6)] z-20 flex-shrink-0"
                >
                  <Image src={microgreen.image} alt={microgreen.name} fill className="object-cover" />
                </motion.div>
              </div>

              {/* Scrollable Body Section */}
              <div className="w-full overflow-y-auto px-6 pt-16 pb-4 scrollbar-none flex-1 flex flex-col">
                
                {/* Title, Taste & Premium indicator */}
                <motion.div 
                  custom={0}
                  variants={drawerContentVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-between items-start mb-6 mt-2"
                >
                  <div>
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2.5 border"
                      style={{
                        backgroundColor: `${microgreen.color}15`,
                        color: microgreen.color,
                        borderColor: `${microgreen.color}30`
                      }}
                    >
                      <div
                        className="w-3 h-3 opacity-95"
                        style={{
                          backgroundColor: microgreen.color,
                          WebkitMaskImage: `url('/Flavor icon (2).png')`,
                          maskImage: `url('/Flavor icon (2).png')`,
                          WebkitMaskSize: 'contain',
                          maskSize: 'contain',
                          WebkitMaskRepeat: 'no-repeat',
                          maskRepeat: 'no-repeat',
                          WebkitMaskPosition: 'center'
                        }}
                      />
                      {microgreen.tasteProfile.split(',')[0]}
                    </div>
                    <h2 className="text-3xl font-extrabold text-white flex items-center gap-2 tracking-tight">
                      {microgreen.name}
                      <Sparkles className="w-5 h-5 inline" style={{ color: microgreen.color }} />
                    </h2>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-white/60 tracking-widest uppercase mt-2 border border-white/5">
                    Premium
                  </div>
                </motion.div>

                {/* Perfect For Section */}
                <motion.div 
                  custom={1}
                  variants={drawerContentVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-6"
                >
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3">Perfect For</h3>
                  <div className="flex flex-wrap gap-2">
                    {microgreen.dishes.map((dish, i) => (
                      <div
                        key={i}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
                          i === 0 ? 'text-black shadow-[0_2px_8px_rgba(0,0,0,0.2)]' : 'bg-white/5 text-gray-300 border border-white/5'
                        }`}
                        style={i === 0 ? { backgroundColor: microgreen.color } : {}}
                      >
                        {dish}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* About Description */}
                <motion.div 
                  custom={2}
                  variants={drawerContentVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-6"
                >
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mb-2">About & Health</h3>
                  <p className="text-[13px] text-white/70 leading-relaxed font-light">
                    Elevate your dining experience with our premium {microgreen.name.toLowerCase()} microgreens. Freshly cultivated and harvested, they offer fantastic health benefits including being <strong className="text-white font-semibold">{microgreen.benefits.join(', ').toLowerCase()}</strong>. Each leaf contains high concentrations of <strong className="text-white font-semibold">{microgreen.vitamins.join(', ')}</strong>, making this a vital superfood.
                  </p>
                </motion.div>
              </div>

              {/* Fixed Footer with Actions and Safe Area padding */}
              <div 
                className="flex-shrink-0 px-6 pt-3 pb-4 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d] to-[#0d0d0d]/0 w-full"
                style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 16px))' }}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3 w-full"
                >
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    aria-label="Close"
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-white/60 bg-white/5 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                  >
                    <ChevronUp className="w-5 h-5 rotate-180" />
                  </button>
                  <button
                    onClick={handleOrder}
                    className="flex-1 h-14 rounded-full font-extrabold text-base flex items-center justify-center transition-transform active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.4)] text-black gap-2 cursor-pointer hover:brightness-110"
                    style={{ backgroundColor: microgreen.color }}
                  >
                    <ShoppingBag className="w-4.5 h-4.5" />
                    Order via WhatsApp
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

