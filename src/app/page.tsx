import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { ProjectSection } from '@/components/ProjectSection';
import { ResumeSection } from '@/components/ResumeSection';
import { ContactSection } from '@/components/ContactSection';
import { Code, Cpu, Layout, Box, type LucideIcon } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getPortfolioData } from '@/lib/spreadsheet';
import type { ExpertiseIcon } from '@/lib/portfolio-data';

const expertiseIconMap: Record<ExpertiseIcon, LucideIcon> = {
  code: Code,
  layout: Layout,
  cpu: Cpu,
  box: Box,
};

export default async function Home() {
  const { about, stats, expertise, projects, resumeItems } = await getPortfolioData();
  const profileImg =
    PlaceHolderImages.find((img) => img.id === about.profileImageId) ??
    PlaceHolderImages.find((img) => img.id === 'profile-photo');

  return (
    <main className="relative bg-background overflow-hidden">
      <Navbar />

      {/* Hero / About Section */}
      <section id="about" className="relative min-h-screen flex items-center pt-32 pb-20">
        <div className="container px-6 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Profile Image */}
          <div className="lg:col-span-4 relative animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className="relative aspect-[4/5] max-w-[360px] mx-auto lg:mx-0 rounded-[2rem] overflow-hidden border-2 border-white/5 group shadow-2xl shadow-primary/10">
              {profileImg && (
                <Image 
                  src={profileImg.imageUrl} 
                  alt={about.name}
                  unoptimized={profileImg.imageUrl.startsWith("/api/images/")}
                  fill 
                  style={{
                    objectFit: profileImg.objectFit ?? "cover",
                    objectPosition: profileImg.objectPosition ?? "center",
                  }}
                  data-ai-hint={profileImg.imageHint}
                />
              )}
              <div className="absolute top-6 right-6 w-12 h-12 glass-morphism rounded-xl flex items-center justify-center border-white/10 animate-float">
                <Box className="text-white h-6 w-6" />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 blur-3xl -z-10" />
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-8 animate-in fade-in slide-in-from-right-12 duration-1000 delay-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary mb-6">
              {about.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-8 leading-[1.1]">
              {about.headlineMain} <br />
              <span className="text-primary italic">{about.headlineHighlight}</span>
            </h1>
            
            <div className="space-y-6 text-muted-foreground text-lg max-w-3xl mb-12">
              {about.bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-2xl">
              {stats.map((stat) => (
                <div key={stat.id} className="glass-morphism p-5 rounded-2xl border-white/5">
                  <p className="text-2xl md:text-3xl font-headline font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Cards */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-8">
          {expertise.map((item) => {
            const Icon = expertiseIconMap[item.icon] ?? Code;
            return (
              <div key={item.id} className="glass-morphism p-8 rounded-2xl border-white/5 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-headline font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects Component */}
      <div id="work">
        <ProjectSection projects={projects} />
      </div>

      {/* Resume Section Component */}
      <div id="resume">
        <ResumeSection items={resumeItems} />
      </div>

      {/* Contact Component */}
      <ContactSection />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center font-bold text-xs text-primary-foreground">Z</div>
            <span className="font-headline font-bold text-lg text-white uppercase tracking-tighter">Zidan BSA</span>
          </div>
          <p className="text-muted-foreground text-sm">(c) 2026 Zidan BSA. All rights reserved.</p>
        </div>
      </footer>

      <Toaster />
    </main>
  );
}

