"use client";

import React from "react";
import { Code2, Download, GraduationCap, PenTool, type LucideIcon } from "lucide-react";
import type { ResumeAccent, ResumeIcon, ResumeItem, StatItem } from "@/lib/portfolio-data";
import { Reveal, StaggerItem } from "@/components/motion/Reveal";
import { PortfolioMascot } from "@/components/portfolio/mascot-guide";

interface ResumeSectionProps {
  items: ResumeItem[];
  stats: StatItem[];
}

const iconMap: Record<ResumeIcon, LucideIcon> = {
  code: Code2,
  graduation: GraduationCap,
  pen: PenTool,
};

function getAccentStyle(accent: ResumeAccent) {
  if (accent === "secondary") {
    return {
      bar: "bg-[#00F0FF]",
      icon: "bg-[#00F0FF]",
      organization: "text-[#00F0FF]",
    };
  }

  return {
    bar: "bg-[#FFDE00]",
    icon: "bg-[#FFDE00]",
    organization: "text-[#FFDE00]",
  };
}

export function ResumeSection({ items, stats }: ResumeSectionProps) {
  const sectionRef = React.useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="relative mx-auto max-w-6xl scroll-mt-24 overflow-hidden px-6 py-16"
    >
      <PortfolioMascot
        section="milestones"
        size={104}
        position="right"
        alt="Robot mascot walking alongside the career milestones"
        scrollTargetRef={sectionRef}
        className="absolute right-5 top-[220px] hidden lg:flex"
      />

      <Reveal className="mb-8">
        <div className="mx-auto max-w-4xl lg:ml-auto lg:mr-36">
          <div className="mb-6 flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
            <div>
              <span className="badge-neo mb-2 -rotate-1 bg-[#00F0FF] text-black shadow-brutal-sm">
                CAREER &amp; JOURNEY 🚀
              </span>
              <h2 className="font-luckiest text-4xl font-black uppercase tracking-tight text-white drop-shadow-[4px_4px_0px_#FFDE00] md:text-5xl">
                MY MILESTONES.
              </h2>
            </div>

            <a
              href="/api/resume"
              className="btn-neo-yellow inline-flex h-11 shrink-0 rounded-xl px-5 text-xs uppercase tracking-wider"
            >
              Download Resume <Download className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {stats.length > 0 && (
            <dl className="grid grid-cols-3 overflow-hidden rounded-2xl border-3 border-black bg-slate-900 shadow-brutal">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className={`flex flex-col px-2 py-3 text-center sm:px-4 ${index > 0 ? "border-l-2 border-black" : ""}`}
                >
                  <dt className="order-2 font-headline text-[9px] font-black uppercase tracking-wider text-slate-300 sm:text-[10px]">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-headline text-xl font-black text-[#FFDE00] sm:text-2xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Reveal>

      <div className="mx-auto max-w-4xl lg:ml-auto lg:mr-36">
        {items.length === 0 ? (
          <div className="neo-card rounded-2xl p-5 text-center font-headline font-bold text-slate-400">
            Belum ada data resume.
          </div>
        ) : (
          <div className="space-y-3" role="list">
            {items.map((item, index) => {
              const Icon = iconMap[item.icon] ?? Code2;
              const accent = getAccentStyle(item.accent);

              return (
                <StaggerItem key={item.id} index={index} stagger={0.07}>
                  <article
                    role="listitem"
                    className="group relative overflow-hidden rounded-2xl border-3 border-black bg-slate-900 shadow-brutal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-brutal-lg"
                  >
                    <div className={`absolute inset-y-0 left-0 w-2 border-r-3 border-black ${accent.bar}`} />

                    <div className="flex items-start gap-3 py-4 pl-5 pr-4 sm:gap-4 sm:pl-6 sm:pr-5">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black text-black shadow-brutal-sm ${accent.icon}`}
                      >
                        <Icon className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                          <p className={`font-headline text-[11px] font-black uppercase tracking-wider ${accent.organization}`}>
                            {item.organization}
                          </p>
                          <time className="rounded-md border-2 border-black bg-[#A3E635] px-2 py-0.5 font-headline text-[9px] font-black uppercase tracking-wider text-black shadow-brutal-sm sm:text-[10px]">
                            {item.period}
                          </time>
                        </div>

                        <h3 className="font-headline text-base font-black uppercase leading-tight text-white sm:text-lg">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-300">
                            {item.description}
                          </p>
                        )}

                        {item.highlights.length > 0 && (
                          <ul className="mt-2 grid gap-x-5 gap-y-1 md:grid-cols-2">
                            {item.highlights.map((highlight, highlightIndex) => {
                              const isMetric = highlight.length < 25 && /^gpa[:\s]/i.test(highlight);

                              if (isMetric) {
                                return (
                                  <li
                                    key={`${item.id}-metric-${highlightIndex}`}
                                    className="w-fit rounded-md border-2 border-black bg-[#A3E635] px-2 py-0.5 font-headline text-[10px] font-black text-black shadow-brutal-sm"
                                  >
                                    {highlight}
                                  </li>
                                );
                              }

                              return (
                                <li
                                  key={`${item.id}-point-${highlightIndex}`}
                                  className="flex items-start gap-2 text-[11px] font-medium leading-relaxed text-slate-300 sm:text-xs"
                                >
                                  <span
                                    className={`mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-sm border border-black ${accent.bar}`}
                                    aria-hidden="true"
                                  />
                                  <span>{highlight}</span>
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        {item.chips.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-1.5 border-t-2 border-black pt-2.5">
                            {item.chips.map((chip) => (
                              <span
                                key={`${item.id}-${chip}`}
                                className="rounded-md border border-slate-700 bg-black px-2 py-0.5 font-headline text-[9px] font-black text-[#FFDE00] sm:text-[10px]"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
