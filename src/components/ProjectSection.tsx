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
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
            My Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-white">Featured Projects</h2>
        </div>
        <div className="flex flex-wrap gap-2 p-1 glass-morphism rounded-xl border-white/5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length === 0 && (
          <div className="lg:col-span-3 md:col-span-2 p-8 rounded-2xl glass-morphism border-white/10 text-muted-foreground text-center">
            Belum ada project pada kategori ini.
          </div>
        )}

        {filteredProjects.map((project) => {
          const image = PlaceHolderImages.find((item) => item.id === project.imageId);
          const fit = image?.objectFit ?? "cover";
          const position = image?.objectPosition ?? "center";
          const isLocalAssetImage = image?.imageUrl?.startsWith("/api/images/") ?? false;

          return (
            <Card
              key={project.id}
              className="group overflow-hidden glass-morphism border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900/40">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={project.title}
                    fill
                    unoptimized={isLocalAssetImage}
                    className="transition-transform duration-700 group-hover:scale-105"
                    style={{ objectFit: fit, objectPosition: position }}
                    data-ai-hint={image.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <Badge className="glass-morphism text-white border-white/10 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider uppercase">
                    {project.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-headline font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold uppercase tracking-tighter text-muted-foreground border border-white/5 px-2 py-0.5 rounded-md bg-white/[0.02]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary text-xs font-bold group-hover:gap-2 transition-all"
                    onClick={() => setSelectedProject(project)}
                  >
                    Details <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden glass-morphism border-white/10 bg-background/95 backdrop-blur-2xl">
          {selectedProject && (
            <div className="flex flex-col max-h-[90vh]">
              <div className="relative w-full aspect-[21/9] border-b border-white/5">
                {selectedImage && (
                  <Image
                    src={selectedImage.imageUrl}
                    alt={selectedProject.title}
                    fill
                    unoptimized={selectedImage.imageUrl.startsWith("/api/images/")}
                    style={{
                      objectFit: selectedImage.objectFit ?? "cover",
                      objectPosition: selectedImage.objectPosition ?? "center",
                    }}
                    data-ai-hint={selectedImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 text-[10px] font-bold uppercase">
                      {selectedProject.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(selectedProject.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </div>
                  </div>
                  <DialogTitle className="text-3xl font-headline font-bold text-white tracking-tight">
                    {selectedProject.title}
                  </DialogTitle>
                </div>
              </div>

              <ScrollArea className="flex-1 p-8">
                <div className="grid md:grid-cols-5 gap-10">
                  <div className="md:col-span-3 space-y-8">
                    <div>
                      <h4 className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest mb-4">
                        <Target className="h-4 w-4 text-primary" /> Project Overview
                      </h4>
                      <p className="text-muted-foreground leading-relaxed text-[15px]">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    {selectedProject.features.length > 0 && (
                      <div>
                        <h4 className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest mb-4">
                          <Cpu className="h-4 w-4 text-primary" /> Key Features
                        </h4>
                        <ul className="space-y-3">
                          {selectedProject.features.map((feature, index) => (
                            <li key={`${selectedProject.id}-${index}`} className="flex items-center gap-3 text-sm text-muted-foreground/90 group">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-8">
                    {selectedProject.tags.length > 0 && (
                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                        <h4 className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest mb-4">
                          <Code2 className="h-3.5 w-3.5 text-primary" /> Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-bold bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-lg">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-3">
                      {selectedProject.links?.demo && (
                        <Button
                          className="w-full bg-primary text-primary-foreground font-bold h-11 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform group"
                          onClick={() => window.open(selectedProject.links?.demo, "_blank")}
                        >
                          Live Preview <Rocket className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      )}
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
