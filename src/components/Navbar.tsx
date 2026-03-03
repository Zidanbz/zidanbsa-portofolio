"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
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

  const navLinks = [
    { name: 'Home', href: isHomePage ? '#about' : '/#about', id: 'about', type: 'section' as const },
    { name: 'Work', href: isHomePage ? '#work' : '/#work', id: 'work', type: 'section' as const },
    { name: 'Resume', href: isHomePage ? '#resume' : '/#resume', id: 'resume', type: 'section' as const },
    { name: 'Achievement', href: '/achievement', id: 'achievement', type: 'route' as const },
  ];

  const isLinkActive = (link: (typeof navLinks)[number]): boolean => {
    if (link.type === 'route') {
      return pathname === link.href;
    }

    if (!isHomePage) {
      return false;
    }

    return activeSection === link.id;
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground">Z</div>
        <span className="font-headline font-bold text-xl tracking-tight text-white uppercase">Zidan BSA</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium items-center">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`transition-colors duration-300 font-semibold tracking-wide ${
              isLinkActive(link)
                ? 'text-white' 
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="hidden sm:block w-32" /> {/* Spacer for balance */}
    </nav>
  );
}
