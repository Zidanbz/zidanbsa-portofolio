"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code2, Rocket, Target, Cpu, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ProjectItem } from "@/lib/portfolio-data";
import { LiftOnHover, Reveal, StaggerItem } from "@/components/motion/Reveal";

interface ProjectSectionProps {
  projects: ProjectItem[];
}

export function ProjectSection({ projects }: ProjectSectionProps) {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category).filter(Boolean)))],
    [projects]
  );

  useEffect(() => {
    if (!categories.includes(filter)) {
      setFilter("All");
    }
  }, [categories, filter]);

  const filteredProjects = useMemo(() => {
    return filter === "All" ? projects : projects.filter((project) => project.category === filter);
  }, [filter, projects]);

  const selectedImage = selectedProject
    ? PlaceHolderImages.find((image) => image.id === selectedProject.imageId)
    : null;

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <Reveal>
          <div>
            <span className="badge-neo bg-[#FFDE00] text-black shadow-brutal-sm mb-3">MY PORTFOLIO 🚀</span>
            <h2 className="text-4xl md:text-5xl font-luckiest font-black uppercase tracking-tight text-white drop-shadow-[4px_4px_0px_#FFDE00]">
              FEATURED PROJECTS.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-slate-900 border-3 border-black shadow-brutal">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-xl text-xs font-headline font-black uppercase tracking-wider transition-all duration-150 ${
                  filter === category
                    ? "bg-[#FFDE00] text-black border-2 border-black shadow-brutal-sm scale-[1.03]"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length === 0 && (
          <div className="lg:col-span-3 md:col-span-2 p-8 rounded-2xl neo-card text-slate-400 text-center font-headline font-bold">
            Belum ada project pada kategori ini.
          </div>
        )}

        {filteredProjects.map((project, index) => {
          const image = PlaceHolderImages.find((item) => item.id === project.imageId);
          const fit = image?.objectFit ?? "cover";
          const position = image?.objectPosition ?? "center";

          return (
            <StaggerItem key={project.id} index={index} stagger={0.08}>
              <LiftOnHover className="h-full">
                <Card
                  className="group overflow-hidden neo-card rounded-[2.25rem] border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 h-full flex flex-col bg-slate-900"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b-3 border-black bg-slate-950">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="transition-transform duration-500 group-hover:scale-105"
                        style={{ objectFit: fit, objectPosition: position }}
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#FFDE00] text-black font-headline font-black border-2 border-black shadow-brutal-sm px-3 py-1 text-[10px] uppercase tracking-wider">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-headline font-black text-white mb-2 group-hover:text-[#FFDE00] transition-colors line-clamp-1 uppercase">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-300 mb-6 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t-2 border-black">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-headline font-extrabold uppercase text-[#FFDE00] border border-slate-700 px-2.5 py-0.5 rounded-lg bg-black"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-[#FFDE00] font-headline font-black text-xs uppercase hover:text-white flex items-center gap-1 group/btn"
                        onClick={() => setSelectedProject(project)}
                      >
                        Details <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </LiftOnHover>
            </StaggerItem>
          );
        })}
      </div>

      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[720px] p-0 overflow-hidden rounded-[2.5rem] border-4 border-black shadow-brutal-xl bg-slate-900 text-white">
          {selectedProject && (
            <div className="flex flex-col max-h-[90vh]">
              <div className="relative w-full aspect-[21/9] border-b-3 border-black">
                {selectedImage && (
                  <Image
                    src={selectedImage.imageUrl}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    style={{
                      objectFit: selectedImage.objectFit ?? "cover",
                      objectPosition: selectedImage.objectPosition ?? "center",
                    }}
                    data-ai-hint={selectedImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-[#FFDE00] text-black font-headline font-black border-2 border-black shadow-brutal-sm text-[10px] uppercase">
                      {selectedProject.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-headline font-black">
                      <Calendar className="h-3.5 w-3.5 text-[#FFDE00]" />
                      {new Date(selectedProject.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </div>
                  </div>
                  <DialogTitle className="text-3xl font-luckiest font-black text-white tracking-tight uppercase drop-shadow-[4px_4px_0px_#FFDE00]">
                    {selectedProject.title}
                  </DialogTitle>
                </div>
              </div>

              <ScrollArea className="flex-1 p-6 md:p-8">
                <div className="grid md:grid-cols-5 gap-8">
                  <div className="md:col-span-3 space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-white font-headline font-black text-sm uppercase tracking-wider mb-3">
                        <Target className="h-4 w-4 text-[#FFDE00] stroke-[2.5]" /> Project Overview
                      </h4>
                      <p className="text-slate-300 font-medium leading-relaxed text-sm">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    {selectedProject.features.length > 0 && (
                      <div>
                        <h4 className="flex items-center gap-2 text-white font-headline font-black text-sm uppercase tracking-wider mb-3">
                          <Cpu className="h-4 w-4 text-[#FFDE00] stroke-[2.5]" /> Key Features
                        </h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, index) => (
                            <li key={`${selectedProject.id}-${index}`} className="flex items-start gap-2.5 text-xs font-semibold text-slate-300">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FFDE00] mt-0.5 border border-black shrink-0 shadow-brutal-sm" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-6">
                    {selectedProject.tags.length > 0 && (
                      <div className="p-4 rounded-2xl bg-black border-2 border-black shadow-brutal-sm">
                        <h4 className="flex items-center gap-2 text-white font-headline font-black text-xs uppercase tracking-wider mb-3">
                          <Code2 className="h-3.5 w-3.5 text-[#FFDE00] stroke-[2.5]" /> Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-headline font-black bg-slate-900 border border-slate-700 text-[#FFDE00] px-2.5 py-1 rounded-lg">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-3">
                      {selectedProject.links?.demo && (() => {
                        const demoLink = selectedProject.links?.demo?.trim();
                        const isPlaceholderDemo = demoLink === "#" || demoLink === "";
                        const hasValidDemoLink = Boolean(demoLink) && !isPlaceholderDemo;

                        return (
                          <Button
                            className="btn-neo-yellow w-full h-12 rounded-xl text-sm uppercase"
                            disabled={!hasValidDemoLink}
                            onClick={hasValidDemoLink ? () => window.open(demoLink, "_blank") : undefined}
                          >
                            Live Preview <Rocket className="ml-2 h-4 w-4" />
                          </Button>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
