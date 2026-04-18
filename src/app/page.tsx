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
import { PageBackdrop } from '@/components/PageBackdrop';
import { AnimatedHero } from '@/components/AnimatedHero';
import { getAchievementData } from '@/lib/spreadsheet';
import { LiftOnHover, Reveal, StaggerItem } from '@/components/motion/Reveal';

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
  const profileImg2 = PlaceHolderImages.find((img) => img.id === 'profile-photo2');
  const educationItem = resumeItems.find((item) => item.icon === 'graduation');
  const workItems = resumeItems.filter((item) => item.icon !== 'graduation').slice(0, 2);
  const softwareSkills = Array.from(new Set(projects.flatMap((project) => project.tags))).slice(0, 8);
  const achievements = await getAchievementData();
  const tocItems = expertise;

  return (
    <main className="relative bg-background overflow-hidden text-foreground">
      <PageBackdrop />
      <Navbar />

      {/* Hero / About Section */}
      <section id="about" className="relative min-h-screen flex items-center pt-32 pb-20">
        <AnimatedHero about={about} stats={stats} profileImg={profileImg} />
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto border-t border-black/10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <Reveal className="lg:col-span-4">
            <div className="glass-morphism rounded-[2rem] border-black/10 p-6">
              <div className="relative aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden border border-black/10 bg-white mb-5">
                {profileImg2 ?? profileImg ? (
                  <Image
                    src={(profileImg2 ?? profileImg)!.imageUrl}
                    alt={about.name}
                    fill
                    unoptimized={(profileImg2 ?? profileImg)!.imageUrl.startsWith('/api/images/')}
                    style={{
                      objectFit: ((profileImg2 ?? profileImg)!.objectFit as 'cover' | 'contain' | undefined) ?? 'cover',
                      objectPosition: (profileImg2 ?? profileImg)!.objectPosition ?? 'center',
                    }}
                    data-ai-hint={(profileImg2 ?? profileImg)!.imageHint}
                  />
                ) : null}
              </div>
              <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                <p className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-3">
                  Let's Work Together
                </p>
                <p className="text-sm text-muted-foreground">zidanbz03@gmail.com</p>
                <p className="text-sm text-muted-foreground">+62 822-9025-9322</p>
                <p className="text-sm text-muted-foreground">Rancaekek, Bandung</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8">
            <div className="glass-morphism rounded-[2rem] border-black/10 p-6 md:p-8">
              <h2 className="text-4xl md:text-5xl font-headline font-black text-secondary uppercase leading-[0.95]">
                Hello.
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                {about.bioParagraphs[0]}
              </p>
              {about.bioParagraphs[1] && (
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                  {about.bioParagraphs[1]}
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-headline font-black uppercase text-secondary mb-3">Education</h3>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-black/10 bg-white/60 p-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">2020 - Present</p>
                      <p className="font-semibold text-foreground">Computer Science</p>
                      <p className="text-sm text-muted-foreground">Universitas Muslim Indonesia</p>
                    </div>
                    {educationItem ? (
                      <div className="rounded-xl border border-black/10 bg-white/60 p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Student Exchange</p>
                        <p className="font-semibold text-foreground">Student Exchange</p>
                        <p className="text-sm text-muted-foreground">Universitas Muslim Indonesia</p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-headline font-black uppercase text-secondary mb-3">Software Skill</h3>
                  <div className="flex flex-wrap gap-2">
                    {softwareSkills.length > 0 ? (
                      softwareSkills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-black/10 bg-black/[0.03]"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Belum ada data skill.</p>
                    )}
                  </div>
                  <h4 className="text-md font-headline font-black uppercase text-secondary mt-6 mb-3">Achievements</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {achievements.slice(0, 6).map((achievement) => (
                      <p key={achievement.id} className="text-sm text-muted-foreground leading-relaxed -mb-1">
                        • {achievement.title}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* Table Of Content */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-black/10">
        <Reveal>
          <h2 className="text-center text-4xl md:text-6xl font-headline font-black text-secondary uppercase tracking-tight">
            Table Of Content.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {tocItems.map((item, index) => {
            const Icon = expertiseIconMap[item.icon] ?? Code;
            return (
              <StaggerItem key={item.id} index={index} stagger={0.1}>
                <LiftOnHover>
                  <div className="glass-morphism p-6 rounded-[1.75rem] border-black/10 hover:border-primary/45 transition-colors duration-300 group h-full relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5" />
                    <div className="relative text-center">
                      <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-5 mx-auto text-primary-foreground transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3">
                        <Icon className="h-9 w-9" />
                      </div>
                      <h3 className="text-lg font-headline font-black text-secondary mb-3 uppercase">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </LiftOnHover>
              </StaggerItem>
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
        <ResumeSection items={resumeItems} stats={stats} />
      </div>

      {/* Contact Component */}
      <ContactSection />

      {/* Footer */}
      <Reveal>
        <footer className="py-12 px-6 border-t border-black/10 text-center bg-black/[0.02]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center font-bold text-xs text-primary-foreground shadow-md shadow-primary/25">
                Z
              </div>
              <span className="font-headline font-bold text-lg text-foreground uppercase tracking-tighter">
                Zidan BSA
              </span>
            </div>
            <p className="text-muted-foreground text-sm">(c) 2026 Zidan BSA. All rights reserved.</p>
          </div>
        </footer>
      </Reveal>

      <Toaster />
    </main>
  );
}
