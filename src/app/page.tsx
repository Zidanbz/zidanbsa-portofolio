import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { ProjectSection } from '@/components/ProjectSection';
import { ResumeSection } from '@/components/ResumeSection';
import { ContactSection } from '@/components/ContactSection';
import {
  Code,
  Cpu,
  Layout,
  Box,
  Database,
  GitBranch,
  Zap,
  Users,
  Lightbulb,
  Sparkles,
  Server,
  Smartphone,
  Globe,
  Layers,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getPortfolioData } from '@/lib/spreadsheet';
import type { ExpertiseIcon } from '@/lib/portfolio-data';
import { PageBackdrop } from '@/components/PageBackdrop';
import { AnimatedHero } from '@/components/AnimatedHero';
import { getAchievementData } from '@/lib/spreadsheet';
import { LiftOnHover, Reveal, StaggerItem } from '@/components/motion/Reveal';
import { GithubContributions } from '@/components/GithubContributions';

const expertiseIconMap: Record<string, LucideIcon> = {
  code: Code,
  layout: Layout,
  ui: Layout,
  ux: Layout,
  cpu: Cpu,
  backend: Cpu,
  box: Box,
  database: Database,
  db: Database,
  'git-branch': GitBranch,
  gitbranch: GitBranch,
  git_branch: GitBranch,
  zap: Zap,
  lightning: Zap,
  users: Users,
  team: Users,
  lightbulb: Lightbulb,
  idea: Lightbulb,
  sparkles: Sparkles,
  server: Server,
  smartphone: Smartphone,
  mobile: Smartphone,
  globe: Globe,
  layers: Layers,
  terminal: Terminal,
};

export default async function Home() {
  const { about, stats, expertise, projects, resumeItems } = await getPortfolioData();
  const profileImg =
    PlaceHolderImages.find((img) => img.id === about.profileImageId) ??
    PlaceHolderImages.find((img) => img.id === 'profile-photo');
  const profileImg2 = PlaceHolderImages.find((img) => img.id === 'profile-photo2');
  const educationItems = resumeItems.filter((item) => item.icon === 'graduation');
  const softwareSkills = Array.from(new Set(projects.flatMap((project) => project.tags))).slice(0, 8);
  const achievements = await getAchievementData();
  const tocItems = expertise;

  return (
    <main className="relative isolate bg-background overflow-hidden text-foreground">
      <PageBackdrop />
      <div className="relative z-10">
        <Navbar />

      {/* Hero / About Section */}
      <section id="about" className="relative min-h-screen flex items-center pt-32 pb-12">
        <AnimatedHero about={about} stats={stats} profileImg={profileImg} />
      </section>

      {/* Bento Grid About Section */}
      <section className="pt-16 pb-8 px-6 max-w-7xl mx-auto border-t-3 border-black">
        <Reveal className="mb-8">
          <div className="flex items-center gap-3">
            <span className="badge-neo bg-[#FFDE00] text-black shadow-brutal-sm">ABOUT ARCHITECTURE ✨</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Tile 1: Massive Bio Card */}
          <Reveal className="md:col-span-8">
            <div className="neo-card p-8 md:p-10 h-full flex flex-col justify-between group bg-slate-900 border-4 border-black shadow-brutal-lg">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-4xl md:text-5xl font-luckiest font-black uppercase text-white tracking-wide drop-shadow-[4px_4px_0px_#FFDE00]">
                    HELLO & WELCOME.
                  </h2>
                  <div className="w-11 h-11 rounded-xl bg-[#FFDE00] border-2 border-black flex items-center justify-center text-black font-headline font-black text-xl shadow-brutal-sm -rotate-3">
                    ⚡
                  </div>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-200 leading-relaxed">
                  {about.bioParagraphs[0]}
                </p>
                {about.bioParagraphs[1] && (
                  <p className="mt-4 text-base md:text-lg font-medium text-slate-200 leading-relaxed">
                    {about.bioParagraphs[1]}
                  </p>
                )}
              </div>

              <div className="mt-8 pt-6 border-t-2 border-black flex flex-wrap items-center gap-4 text-xs font-headline font-black text-slate-300">
                <span className="flex items-center gap-1.5 text-black bg-[#FFDE00] px-3 py-1 rounded-lg border-2 border-black shadow-brutal-sm">
                  <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                  FULL-STACK DEVELOPMENT
                </span>
                <span>•</span>
                <span className="text-black bg-[#00F0FF] px-3 py-1 rounded-lg border-2 border-black shadow-brutal-sm">MOBILE ECOSYSTEMS</span>
                <span>•</span>
                <span className="text-white bg-[#FF007A] px-3 py-1 rounded-lg border-2 border-black shadow-brutal-sm">HIGH-PERFORMANCE UI</span>
              </div>
            </div>
          </Reveal>

          {/* Bento Tile 2: Profile Photo & Quick Details */}
          <Reveal className="md:col-span-4">
            <div className="neo-card p-6 h-full flex flex-col justify-between border-4 border-black shadow-brutal-lg">
              <div className="relative aspect-[4/5] w-full rounded-[1.75rem] overflow-hidden border-3 border-black bg-slate-950 mb-5 group shadow-brutal-sm">
                {profileImg2 ?? profileImg ? (
                  <Image
                    src={(profileImg2 ?? profileImg)!.imageUrl}
                    alt={about.name}
                    fill
                    sizes="(max-width: 1024px) 92vw, 33vw"
                    style={{
                      objectFit: ((profileImg2 ?? profileImg)!.objectFit as 'cover' | 'contain' | undefined) ?? 'cover',
                      objectPosition: (profileImg2 ?? profileImg)!.objectPosition ?? 'center',
                    }}
                    data-ai-hint={(profileImg2 ?? profileImg)!.imageHint}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900 border-2 border-black p-3 rounded-xl shadow-brutal-sm text-xs">
                  <p className="font-headline font-black text-white">{about.name}</p>
                  <p className="text-[10px] text-[#FFDE00] font-black uppercase tracking-wider">Software Engineer</p>
                </div>
              </div>

              <div className="rounded-2xl border-3 border-black bg-[#FF007A] p-4 shadow-brutal-sm text-white">
                <p className="text-xs font-headline font-black tracking-wider uppercase mb-2 flex items-center gap-1.5 text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFDE00] animate-pulse border border-black" />
                  LET'S WORK TOGETHER
                </p>
                <p className="text-xs font-black text-white">{about.email || "zidanbz03@gmail.com"}</p>
                <p className="text-xs font-bold text-slate-100">{about.phone || "+62 822-9025-9322"}</p>
                <p className="text-xs font-semibold text-slate-200">{about.location || "Makassar, Indonesia"}</p>
              </div>
            </div>
          </Reveal>

          {/* Bento Tile 3: Education */}
          <Reveal className="md:col-span-6">
            <div className="neo-card p-6 md:p-8 h-full flex flex-col justify-between border-3 border-black">
              <div>
                <h3 className="text-xl font-headline font-black uppercase text-white mb-4 flex items-center gap-2">
                  🎓 ACADEMIC EDUCATION
                </h3>
                <div className="space-y-4">
                  {educationItems.length > 0 ? (
                    educationItems.map((edu) => (
                      <div
                        key={edu.id}
                        className="rounded-2xl border-3 border-black bg-slate-950 p-5 shadow-brutal-sm hover:-translate-y-0.5 transition-all"
                      >
                        <span className="text-[10px] font-headline font-black uppercase tracking-wider text-black bg-[#A3E635] px-3 py-1 rounded-lg border-2 border-black inline-block mb-2 shadow-brutal-sm">
                          {edu.period}
                        </span>
                        <p className="font-headline font-black text-white text-lg">{edu.title}</p>
                        <p className="text-xs font-bold text-[#FFDE00] mt-0.5">{edu.organization}</p>
                        {edu.description && (
                          <p className="text-xs font-medium text-slate-300 mt-1.5 leading-relaxed">{edu.description}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">Belum ada data edukasi.</p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bento Tile 4: Software Skills */}
          <Reveal className="md:col-span-6">
            <div className="neo-card p-6 md:p-8 h-full flex flex-col justify-between border-3 border-black">
              <div>
                <h3 className="text-xl font-headline font-black uppercase text-white mb-4 flex items-center gap-2">
                  🛠️ SOFTWARE SKILLS & TECH STACK
                </h3>
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {softwareSkills.length > 0 ? (
                    softwareSkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-headline font-black px-4 py-2 rounded-xl border-2 border-black bg-slate-800 text-white shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#FFDE00] hover:text-black transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">Belum ada data skill.</p>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl border-3 border-black bg-[#00F0FF]/15 text-[#00F0FF] shadow-brutal-sm">
                <p className="text-xs font-headline font-black uppercase tracking-wider mb-1">
                  ⚡ HIGHLIGHTED ARCHITECTURES
                </p>
                <p className="text-xs font-medium text-slate-200 leading-relaxed">
                  Clean Architecture, Micro-frontends, REST & GraphQL APIs, Reactive State Management.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bento Tile 5: Achievements Box */}
          <Reveal className="md:col-span-12">
            <div className="neo-card p-6 md:p-8 border-3 border-black">
              <h3 className="text-xl font-headline font-black uppercase text-white mb-4 flex items-center gap-2">
                🏆 HONORS & ACHIEVEMENTS
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-4 rounded-2xl border-3 border-black bg-slate-950 shadow-brutal-sm hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#FFDE00] border-2 border-black flex items-center justify-center text-black font-black text-sm mb-2 shadow-brutal-sm">
                      🏅
                    </div>
                    <p className="font-headline font-black text-white text-xs leading-snug line-clamp-2 mb-1">
                      {achievement.title}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400">{achievement.issuer} ({achievement.period})</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GitHub Contributions Section */}
      <GithubContributions username="Zidanbz" />

      {/* Expertise / What I Do */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t-3 border-black">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge-neo bg-[#FFDE00] text-black mb-4 -rotate-1">WHAT I DO ⚡</span>
            <h2 className="text-4xl md:text-6xl font-luckiest font-black uppercase tracking-tight text-white drop-shadow-[4px_4px_0px_#FFDE00]">
              TABLE OF CONTENT.
            </h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tocItems.map((item, index) => {
            const iconKey = String(item.icon).toLowerCase().trim();
            const normalizedKey = iconKey.replace(/[^a-z0-9]/g, '');
            const Icon = expertiseIconMap[iconKey] ?? expertiseIconMap[normalizedKey] ?? Code;
            const colors = [
              "bg-[#FFDE00] text-black",
              "bg-[#FF007A] text-white",
              "bg-[#A3E635] text-black",
              "bg-[#00F0FF] text-black",
            ];
            const iconBg = colors[index % colors.length];

            return (
              <StaggerItem key={item.id} index={index} stagger={0.1}>
                <LiftOnHover>
                  <div className="neo-card p-6 md:p-8 rounded-[2.25rem] border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all duration-200 group h-full relative overflow-hidden bg-slate-900">
                    <div className="relative text-center">
                      <div className={`w-20 h-20 rounded-2xl ${iconBg} border-3 border-black shadow-brutal flex items-center justify-center mb-5 mx-auto transition-all duration-200 group-hover:scale-110 group-hover:-rotate-6`}>
                        <Icon className="h-9 w-9 stroke-[2.5]" />
                      </div>
                      <h3 className="text-xl font-headline font-black text-white mb-3 uppercase tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
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
        <footer className="py-12 px-6 border-t-3 border-slate-950 text-center bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-600 border-2 border-slate-950 rounded-xl flex items-center justify-center font-headline font-black text-sm text-white shadow-brutal-sm -rotate-6">
                Z
              </div>
              <span className="font-headline font-black text-xl text-white uppercase tracking-tight">
                ZIDAN <span className="text-[#FFDE00]">BSA</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs font-headline font-black uppercase tracking-wider">
              © 2026 Zidan BSA. Built with Next.js & Pure Neobrutalism Design.
            </p>
          </div>
        </footer>
      </Reveal>

        <Toaster />
      </div>
    </main>
  );
}
