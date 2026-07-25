"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, Instagram, MessageSquare } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { PortfolioMascot } from '@/components/portfolio/mascot-guide';

export function ContactSection() {
  const [mascotInteraction, setMascotInteraction] = React.useState(0);
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
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
      <Reveal>
        <div className="neo-card rounded-[3rem] p-10 md:p-16 text-center border-4 border-black shadow-brutal-xl overflow-hidden relative bg-slate-900 text-white">
          <span className="badge-neo bg-[#FFDE00] text-black border-2 border-black shadow-brutal-sm mb-6 rotate-2">LET'S CONNECT 🤝</span>

          <h2 className="relative text-4xl md:text-6xl font-luckiest font-black mb-6 tracking-tight uppercase leading-[0.92] text-white drop-shadow-[4px_4px_0px_#000000]">
            HAVE AN IDEA? <br />
            <span className="text-[#FF007A] drop-shadow-[4px_4px_0px_#FFDE00]">LET'S BUILD IT.</span>
          </h2>

          <p className="text-slate-200 font-medium text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>

          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-7">
            <PortfolioMascot
              section="contact"
              size={108}
              mobileSize={72}
              position="center"
              alt="Robot mascot encouraging visitors to start a conversation"
              interactionSignal={mascotInteraction}
            />

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                className="btn-neo-yellow h-14 px-8 rounded-2xl text-base uppercase border-3 border-black shadow-brutal"
                onMouseEnter={() => setMascotInteraction((value) => value + 1)}
                onClick={() => window.open(mailtoUrl, '_self')}
              >
                Contact Me <Mail className="h-5 w-5 stroke-[2.5]" />
              </Button>

              <Button
                className="btn-neo-pink h-14 px-8 rounded-2xl text-base uppercase border-3 border-black shadow-brutal"
                onMouseEnter={() => setMascotInteraction((value) => value + 1)}
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                Chat on WhatsApp <MessageSquare className="h-5 w-5 stroke-[2.5]" />
              </Button>
            </div>
          </div>

          <div className="relative mt-12 flex justify-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-14 h-14 bg-slate-950 rounded-2xl border-3 border-black shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg hover:bg-[#FFDE00] hover:text-black active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#FFDE00] flex items-center justify-center group"
              >
                <Icon className="h-6 w-6 stroke-[2.5] text-[#FFDE00] group-hover:text-black transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
