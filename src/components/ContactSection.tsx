"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, Instagram, MessageSquare } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

export function ContactSection() {
  const mailtoUrl = `mailto:zidanbz03@gmail.com?subject=${encodeURIComponent(
    'Kolaborasi dari Website Portfolio'
  )}&body=${encodeURIComponent(
    'Halo Zidan,\n\nSaya tertarik untuk berdiskusi terkait project.\n\nNama:\nPerusahaan/Organisasi:\nDetail kebutuhan:\nBudget (opsional):\nTimeline:\n\nTerima kasih.'
  )}`;
  const whatsappUrl = `https://wa.me/6282290259322?text=${encodeURIComponent(
    'Halo Zidan, saya tertarik untuk berdiskusi terkait project.'
  )}`;
  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/zidanbz', icon: Github },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/zidan-bsa',
      icon: Linkedin,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/zidanbsa_/',
      icon: Instagram,
    },
  ];

  return (
    <section id="contact" className="py-32 px-6 max-w-5xl mx-auto">
      <Reveal>
      <div className="glass-morphism rounded-[3rem] p-12 md:p-20 text-center border-black/10 overflow-hidden relative shadow-2xl shadow-black/10 transition-shadow duration-500 hover:shadow-primary/15">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-primary/25 blur-[100px] -z-10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-70" />
        
        <h2 className="relative text-5xl md:text-7xl font-headline font-black text-secondary mb-6 tracking-tight uppercase">
          Have an idea? <br />
          <span className="text-muted-foreground">Let's build it.</span>
        </h2>
        
        <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            className="bg-primary text-primary-foreground font-bold h-14 px-8 rounded-full hover:scale-105 transition-transform flex items-center gap-3"
            onClick={() => window.open(mailtoUrl, '_self')}
          >
            Contact Me <Mail className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline"
            className="glass-morphism border-black/10 text-foreground font-bold h-14 px-8 rounded-full hover:bg-black/5 transition-all flex items-center gap-3"
            onClick={() => window.open(whatsappUrl, '_blank')}
          >
            Chat on WhatsApp <MessageSquare className="h-5 w-5 text-[#25D366]" />
          </Button>
        </div>

        <div className="relative mt-14 flex justify-center gap-6">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-12 h-12 glass-morphism rounded-full flex items-center justify-center border-black/10 hover:border-primary/60 hover:text-secondary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 text-muted-foreground"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  );
}
