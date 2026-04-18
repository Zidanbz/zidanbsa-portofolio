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
    const onScroll = () => setScrolled(window.scrollY > 16);
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
    <motion.nav
      className={`fixed top-0 w-full z-50 px-6 flex justify-between items-center border-b transition-[background-color,box-shadow,backdrop-filter,border-color,padding] duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-black/10 shadow-lg shadow-black/10 py-3.5'
          : 'bg-transparent/0 backdrop-blur-none border-transparent py-6'
      }`}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground shadow-md shadow-primary/30"
          whileHover={{ scale: 1.05, rotate: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          Z
        </motion.div>
        <span className="font-headline font-bold text-xl tracking-tight text-foreground uppercase">Zidan BSA</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium items-center">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`relative transition-colors duration-300 font-semibold tracking-wide ${
              isLinkActive(link)
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-secondary'
            }`}
          >
            {link.name}
            {isLinkActive(link) && (
              <motion.span
                layoutId="nav-pill"
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-secondary"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </Link>
        ))}
      </div>
      <div className="hidden sm:block w-32" /> {/* Spacer for balance */}
    </motion.nav>
  );
}
