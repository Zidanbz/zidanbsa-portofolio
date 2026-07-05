"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when the section is in the middle of the viewport
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Target sections
    const sectionIds = ['about', 'work', 'resume'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 16;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: isHomePage ? '#about' : '/#about', id: 'about', type: 'section' as const },
    { name: 'Work', href: isHomePage ? '#work' : '/#work', id: 'work', type: 'section' as const },
    { name: 'Resume', href: isHomePage ? '#resume' : '/#resume', id: 'resume', type: 'section' as const },
  ];

  const isLinkActive = (link: (typeof navLinks)[number]): boolean => {
    if (!isHomePage) {
      return false;
    }

    return activeSection === link.id;
  };

  return (
    <motion.header className="fixed top-5 left-0 right-0 z-50 px-4 md:px-8 max-w-6xl mx-auto pointer-events-none">
      <nav
        className={`pointer-events-auto w-full px-5 py-3 rounded-2xl border-3 border-black transition-all duration-200 flex items-center justify-between ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-brutal-lg'
            : 'bg-slate-900/85 backdrop-blur-md shadow-brutal'
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="w-9 h-9 bg-[#FFDE00] border-2 border-black rounded-xl flex items-center justify-center font-headline font-black text-black shadow-brutal-sm group-hover:-rotate-6 transition-transform"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Z
          </motion.div>
          <span className="font-headline font-black text-lg tracking-tight text-white uppercase">
            Zidan <span className="text-[#FFDE00]">BSA</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-1 bg-black/60 p-1.5 rounded-xl border-2 border-black">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-lg text-xs font-headline font-black tracking-wider uppercase transition-all duration-150 ${
                    active
                      ? 'text-black bg-[#FFDE00] border-2 border-black shadow-brutal-sm scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Hire Me CTA Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#FF007A] text-white text-xs font-headline font-black uppercase tracking-wider border-2 border-black shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            Contact ✉️
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
