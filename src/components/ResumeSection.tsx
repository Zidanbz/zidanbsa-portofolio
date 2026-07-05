"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, GraduationCap, Code2, PenTool, type LucideIcon } from "lucide-react";
import type { ResumeAccent, ResumeIcon, ResumeItem, StatItem } from "@/lib/portfolio-data";
import { Reveal, StaggerItem } from "@/components/motion/Reveal";

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
      periodText: "text-secondary",
      iconWrap: "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground",
      hoverBorder: "hover:border-secondary/20",
      dotColor: "bg-secondary",
    };
  }

  return {
    periodText: "text-primary",
    iconWrap: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
    hoverBorder: "hover:border-primary/20",
    dotColor: "bg-primary",
  };
}

export function ResumeSection({ items, stats }: ResumeSectionProps) {
  return (
    <section id="resume" className="py-16 px-6 max-w-5xl mx-auto overflow-hidden scroll-mt-24">
      <Reveal className="mb-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="badge-neo bg-[#00F0FF] text-black shadow-brutal-sm mb-2 -rotate-1">CAREER & JOURNEY 🚀</span>
          <h2 className="text-4xl md:text-5xl font-luckiest font-black uppercase tracking-tight text-white drop-shadow-[4px_4px_0px_#FFDE00]">
            MY MILESTONES.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center neo-card p-4 rounded-2xl border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group bg-slate-900"
            >
              <div className="text-2xl md:text-3xl font-headline font-black text-[#FFDE00] mb-0.5 group-hover:text-[#00F0FF] transition-colors">
                {stat.value}
              </div>
              <p className="text-[11px] font-headline font-black uppercase tracking-wider text-slate-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <a
            href="/api/resume"
            className="btn-neo-yellow inline-flex h-11 px-6 rounded-xl text-xs uppercase tracking-wider"
          >
            Download Full Resume <Download className="ml-2 h-3.5 w-3.5" />
          </a>
        </div>
      </Reveal>

      <div className="relative">
        {/* Timeline Center Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[4px] bg-black hidden md:block" />

        <div className="space-y-6 relative">
          {items.length === 0 && (
            <div className="p-6 rounded-2xl neo-card text-slate-400 text-center font-headline font-bold">
              Belum ada data resume.
            </div>
          )}

          {items.map((item, index) => {
            const isRight = item.side === "right";
            const Icon = iconMap[item.icon] ?? Code2;

            const card = (
              <div
                className="neo-card p-5 rounded-2xl border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all duration-200 text-left relative bg-slate-900"
              >
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FFDE00] border-2 border-black shadow-brutal-sm flex items-center justify-center text-black shrink-0">
                      <Icon className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    <span className="font-headline font-black text-xs uppercase text-[#FFDE00]">
                      {item.organization}
                    </span>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-lg bg-[#A3E635] text-black border-2 border-black font-headline font-black text-[10px] uppercase tracking-wider shadow-brutal-sm">
                    {item.period}
                  </span>
                </div>

                <h4 className="text-lg md:text-xl font-headline font-black text-white mb-2 uppercase">
                  {item.title}
                </h4>

                {item.description && (
                  <p className="text-xs font-medium text-slate-300 mb-3 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.highlights.length > 0 && (
                  <ul className="space-y-1.5 mb-3">
                    {item.highlights.map((highlight, hIdx) => {
                      const isMetric = highlight.length < 25 && /^gpa[:\s]/i.test(highlight);
                      if (isMetric) {
                        return (
                          <li key={`${item.id}-metric-${hIdx}`} className="text-[11px] font-headline font-black text-black bg-[#A3E635] border-2 border-black px-2.5 py-0.5 rounded-lg inline-block shadow-brutal-sm">
                            {highlight}
                          </li>
                        );
                      }

                      return (
                        <li key={`${item.id}-point-${hIdx}`} className="flex gap-2 text-xs font-medium text-slate-300 leading-snug">
                          <span className="text-[#00F0FF] font-bold">▪</span>
                          <span>{highlight}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {item.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-black">
                    {item.chips.map((chip) => (
                      <span
                        key={`${item.id}-${chip}`}
                        className="text-[10px] font-headline font-black bg-black border border-slate-700 text-[#FFDE00] px-2 py-0.5 rounded-md"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );

            return (
              <StaggerItem key={item.id} index={index} stagger={0.08}>
                <div className="grid md:grid-cols-2 gap-6 items-start relative">
                  {isRight ? <div className="hidden md:block" /> : card}
                  {isRight ? card : <div className="hidden md:block" />}
                  <div className="absolute left-1/2 -translate-x-1/2 top-7 w-5 h-5 rounded-lg bg-[#FFDE00] border-2 border-black shadow-brutal-sm z-10 hidden md:block rotate-3" />
                </div>
              </StaggerItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
