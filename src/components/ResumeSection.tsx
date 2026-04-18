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
    <section id="resume" className="py-24 px-6 max-w-5xl mx-auto overflow-hidden">
      <Reveal className="mb-20">
        <h2 className="text-4xl md:text-5xl font-headline font-black text-secondary mb-12 tracking-tight uppercase">
          My <span className="text-primary italic">Milestones</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center glass-morphism p-8 rounded-3xl border-black/10 group hover:shadow-xl hover:shadow-primary/20 transition-all">
<div className="text-3xl md:text-4xl font-black text-black mb-2 group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <p className="text-sm uppercase font-bold tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="link" className="text-primary p-0 h-auto group font-bold text-lg" asChild>
            <a href="/api/resume">
              Download Full Resume <Download className="ml-4 h-5 w-5 group-hover:translate-y-0.5 transition-transform inline" />
            </a>
          </Button>
        </div>
      </Reveal>

      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block" />

        <div className="space-y-24 relative">
          {items.length === 0 && (
            <div className="p-8 rounded-2xl glass-morphism border-black/10 text-muted-foreground text-center">
              Belum ada data resume.
            </div>
          )}

          {items.map((item, index) => {
            const isRight = item.side === "right";
            const Icon = iconMap[item.icon] ?? Code2;
            const accent = getAccentStyle(item.accent);

            const card = (
              <div
                className={`glass-morphism p-8 rounded-3xl border-black/10 text-left relative group transition-all duration-300 hover:shadow-xl hover:shadow-primary/15 ${accent.hoverBorder}`}
              >
                <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${accent.iconWrap}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block ${accent.periodText}`}>
                  {item.period}
                </span>
                <h4 className="text-2xl font-black text-secondary mb-1 uppercase">{item.title}</h4>
                <p className="text-muted-foreground font-medium mb-6">{item.organization}</p>

                {item.description && (
                  <p className="text-sm text-muted-foreground/80 mb-4">{item.description}</p>
                )}

                {item.highlights.length > 0 && (
                  <ul className="space-y-3">
                    {item.highlights.map((highlight, index) => {
                      const isMetric = /^gpa[:\s]/i.test(highlight);
                      if (isMetric) {
                        return (
                          <li key={`${item.id}-metric-${index}`} className="text-sm font-bold text-secondary italic">
                            {highlight}
                          </li>
                        );
                      }

                      return (
                        <li key={`${item.id}-point-${index}`} className="flex gap-2 text-sm text-muted-foreground/80 leading-relaxed">
                          <span aria-hidden="true">-</span>
                          <span>{highlight}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {item.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.chips.map((chip) => (
                      <span key={`${item.id}-${chip}`} className="text-[10px] bg-black/5 px-2 py-1 rounded-full border border-black/10">
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );

            return (
              <StaggerItem key={item.id} index={index} stagger={0.12}>
                <div className="grid md:grid-cols-2 gap-8 items-center relative">
                  {isRight ? <div className="hidden md:block" /> : card}
                  {isRight ? card : <div className="hidden md:block" />}
                  <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-background z-10 hidden md:block shadow-md ${accent.dotColor}`} />
                </div>
              </StaggerItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
