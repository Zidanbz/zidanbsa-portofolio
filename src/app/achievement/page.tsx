import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { getAchievementData } from "@/lib/spreadsheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Building2, Calendar, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Achievements | zidan's portofolio",
};

export default async function AchievementPage() {
  const achievements = await getAchievementData();

  return (
    <main className="relative bg-background overflow-hidden min-h-screen">
      <Navbar />

      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary mb-5">
            Achievement
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white mb-6 tracking-tight">
            Milestones & <span className="text-primary italic">Awards</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Daftar pencapaian, penghargaan, dan program yang pernah saya ikuti dalam perjalanan akademik dan
            pengembangan produk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className="glass-morphism border-white/5 hover:border-primary/30 transition-all duration-300 group"
            >
              <CardContent className="p-7 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <Badge className="bg-primary/15 text-primary border-primary/20 text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                    {achievement.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium shrink-0">
                    <Calendar className="h-3.5 w-3.5" />
                    {achievement.period}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-bold text-white leading-tight mb-3 group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Building2 className="h-4 w-4" />
                    <span>{achievement.issuer}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    {achievement.tags.map((tag) => (
                      <span
                        key={`${achievement.id}-${tag}`}
                        className="text-[10px] font-bold bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-lg uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {achievement.proofUrl && (
                    <a
                      href={achievement.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-white transition-colors"
                    >
                      Lihat Bukti <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-white/5 text-center text-muted-foreground">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
          <Trophy className="h-4 w-4 text-primary" />
          <span>Achievement Page</span>
        </div>
      </footer>
    </main>
  );
}
