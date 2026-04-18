"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Box } from "lucide-react";
import type { AboutContent, StatItem } from "@/lib/portfolio-data";

const ease = [0.22, 1, 0.36, 1] as const;

type ProfileImage = {
  imageUrl: string;
  objectFit?: string;
  objectPosition?: string;
  imageHint?: string;
};

type AnimatedHeroProps = {
  about: AboutContent;
  stats: StatItem[];
  profileImg: ProfileImage | undefined;
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

export function AnimatedHero({ about, stats, profileImg }: AnimatedHeroProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <HeroLayout about={about} stats={stats} profileImg={profileImg} motion={false} />
    );
  }

  return (
    <motion.div
      className="container px-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end"
      variants={container}
      initial="hidden"
      animate="visible"
    >
    <motion.div variants={item} className="lg:col-span-7 order-2 lg:order-1 pb-10">
        <HeroContent about={about} stats={stats} motion={true} />
      </motion.div>

      <motion.div variants={item} className="lg:col-span-5 relative order-1 lg:order-2">
        <div className="absolute -bottom-2 right-2 md:right-8 w-[72%] h-[68%] bg-primary rounded-[2.25rem] z-0" />
        <div className="relative aspect-[4/5] max-w-[360px] mx-auto lg:ml-auto rounded-[2rem] overflow-hidden border border-black/10 group shadow-xl shadow-black/10 ring-1 ring-black/5 bg-white z-[1]">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-primary/25 via-transparent to-secondary/10 opacity-85 pointer-events-none z-[1]" />
          {profileImg && (
            <Image
              src={profileImg.imageUrl}
              alt={about.name}
              unoptimized={profileImg.imageUrl.startsWith("/api/images/")}
              fill
              style={{
                objectFit: (profileImg.objectFit as "cover" | "contain" | undefined) ?? "cover",
                objectPosition: profileImg.objectPosition ?? "center",
              }}
              data-ai-hint={profileImg.imageHint}
              priority
            />
          )}
          <div className="absolute top-6 right-6 w-12 h-12 glass-morphism rounded-xl flex items-center justify-center border-black/10 animate-float z-[2]">
            <Box className="text-foreground h-6 w-6" />
          </div>
        </div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/30 blur-3xl -z-10 rounded-full animate-pulse-soft" />
      </motion.div>
    </motion.div>
  );
}

function HeroLayout({
  about,
  stats,
  profileImg,
  motion: useMotion,
}: AnimatedHeroProps & { motion: boolean }) {
  return (
    <div className="container px-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
      <div className="lg:col-span-7 order-2 lg:order-1 pb-10">
        <HeroContent about={about} stats={stats} motion={useMotion} />
      </div>
      <div className="lg:col-span-5 relative order-1 lg:order-2">
        <div className="absolute -bottom-2 right-2 md:right-8 w-[72%] h-[68%] bg-primary rounded-[2.25rem] z-0" />
        <div className="relative aspect-[4/5] max-w-[360px] mx-auto lg:ml-auto rounded-[2rem] overflow-hidden border border-black/10 shadow-xl shadow-black/10 bg-white z-[1]">
          {profileImg && (
            <Image
              src={profileImg.imageUrl}
              alt={about.name}
              unoptimized={profileImg.imageUrl.startsWith("/api/images/")}
              fill
              style={{
                objectFit: (profileImg.objectFit as "cover" | "contain" | undefined) ?? "cover",
                objectPosition: profileImg.objectPosition ?? "center",
              }}
              data-ai-hint={profileImg.imageHint}
              priority
            />
          )}
          <div className="absolute top-6 right-6 w-12 h-12 glass-morphism rounded-xl flex items-center justify-center border-black/10 animate-float">
            <Box className="text-foreground h-6 w-6" />
          </div>
        </div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/25 blur-3xl -z-10" />
      </div>
    </div>
  );
}

function HeroContent({
  about,
  stats,
  motion: useMotion,
}: {
  about: AboutContent;
  stats: StatItem[];
  motion: boolean;
}) {
  const statCardClass = "glass-morphism p-4 rounded-2xl border-black/10 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group/stat";

  const headline = (
    <h1 className="text-6xl md:text-8xl xl:text-9xl font-luckiest font-black text-secondary mb-6 leading-[0.9] uppercase tracking-[-0.04em]">
      PORTO
      <br />
      FOLIO
    </h1>
  );



  const statsGrid = (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-2xl">
      {stats.map((stat, i) =>
        useMotion ? (
          <motion.div
            key={stat.id}
            className={statCardClass}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.06, duration: 0.45, ease }}
          >
            <p className="text-2xl md:text-3xl font-headline font-black text-secondary mb-1 group-hover/stat:text-primary transition-colors">
              {stat.value}
            </p>
            <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest">
              {stat.label}
            </p>
          </motion.div>
        ) : (
          <div key={stat.id} className={statCardClass}>
            <p className="text-2xl md:text-3xl font-headline font-black text-secondary mb-1 group-hover/stat:text-primary transition-colors">
{stat.value}
            </p>
            <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        )
      )}
    </div>
  );

  return (
    <>
      {headline}
      {statsGrid}
    </>
  );
}




