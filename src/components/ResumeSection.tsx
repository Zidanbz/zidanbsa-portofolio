"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, GraduationCap, Code2, PenTool, type LucideIcon } from "lucide-react";
import type { ResumeAccent, ResumeIcon, ResumeItem } from "@/lib/portfolio-data";

interface ResumeSectionProps {
  items: ResumeItem[];
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

export function ResumeSection({ items }: ResumeSectionProps) {
  return (
    <section id="resume" className="py-24 px-6 max-w-5xl mx-auto overflow-hidden">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mb-4">
          Experience & <span className="text-primary italic">Journey</span>
        </h2>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-muted-foreground text-lg">My professional path and academic milestones so far.</p>
          <Button variant="link" className="text-primary p-0 h-auto group font-bold" asChild>
            <a href="/api/resume">
              Download Full Resume <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block" />

        <div className="space-y-24 relative">
          {items.length === 0 && (
            <div className="p-8 rounded-2xl glass-morphism border-white/10 text-muted-foreground text-center">
              Belum ada data resume.
            </div>
          )}

          {items.map((item) => {
            const isRight = item.side === "right";
            const Icon = iconMap[item.icon] ?? Code2;
            const accent = getAccentStyle(item.accent);

            const card = (
              <div
                className={`glass-morphism p-8 rounded-3xl border-white/5 text-left relative group transition-all ${accent.hoverBorder}`}
              >
                <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${accent.iconWrap}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block ${accent.periodText}`}>
                  {item.period}
                </span>
                <h4 className="text-2xl font-bold text-white mb-1">{item.title}</h4>
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
                          <li key={`${item.id}-metric-${index}`} className="text-sm font-bold text-white italic">
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
                      <span key={`${item.id}-${chip}`} className="text-[10px] bg-white/5 px-2 py-1 rounded-full border border-white/10">
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );

            return (
              <div key={item.id} className="grid md:grid-cols-2 gap-8 items-center relative">
                {isRight ? <div className="hidden md:block" /> : card}
                {isRight ? card : <div className="hidden md:block" />}
                <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-background z-10 hidden md:block ${accent.dotColor}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
