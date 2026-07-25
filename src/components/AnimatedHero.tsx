"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { AboutContent, StatItem } from "@/lib/portfolio-data";
import { FloatAnimation } from "@/components/motion/Reveal";
import { PortfolioMascot } from "@/components/portfolio/mascot-guide";

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
      className="container px-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={item} className="lg:col-span-7 order-2 lg:order-1 pb-6">
        <HeroContent about={about} stats={stats} motion={true} />
      </motion.div>

      <motion.div variants={item} className="lg:col-span-5 relative order-1 lg:order-2">
        {/* Neobrutalist Offset Background Box (Signature Neobrutal Yellow #FFDE00) */}
        <FloatAnimation duration={4} distance={5}>
          <div className="absolute -bottom-3 right-2 md:right-6 w-[82%] h-[78%] bg-[#FFDE00] rounded-[2.5rem] border-4 border-black shadow-brutal-lg z-0" />
        </FloatAnimation>

        {/* Profile Image Container */}
        <div className="relative aspect-[4/5] max-w-[360px] mx-auto lg:ml-auto rounded-[2.5rem] overflow-hidden border-4 border-black shadow-brutal-lg bg-slate-900 z-[1] group">
          {profileImg && (
            <Image
              src={profileImg.imageUrl}
              alt={about.name}
              fill
              sizes="(max-width: 768px) 85vw, (max-width: 1200px) 42vw, 360px"
              style={{
                objectFit: (profileImg.objectFit as "cover" | "contain" | undefined) ?? "cover",
                objectPosition: profileImg.objectPosition ?? "center",
              }}
              data-ai-hint={profileImg.imageHint}
              priority
              className="transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Floating Sticker Badges */}
          <FloatAnimation duration={3.2} distance={6} className="absolute top-4 right-4 z-[2]">
            <div className="bg-[#A3E635] text-black border-2 border-black px-3.5 py-1.5 rounded-xl shadow-brutal-sm flex items-center gap-2 rotate-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
              <span className="text-[11px] font-headline font-black uppercase tracking-wider">AVAILABLE ⚡</span>
            </div>
          </FloatAnimation>

          <FloatAnimation duration={3.8} distance={7} className="absolute bottom-4 left-4 z-[2]">
            <div className="bg-[#FF007A] text-white px-4 py-1.5 rounded-xl border-2 border-black shadow-brutal-sm -rotate-3">
              <span className="text-xs font-headline font-black uppercase tracking-wide">ZIDAN BSA 👋</span>
            </div>
          </FloatAnimation>
        </div>

        <PortfolioMascot
          section="hero"
          size={120}
          mobileSize={72}
          position="left"
          alt="Friendly robot mascot welcoming visitors to Zidan's portfolio"
          className="absolute bottom-24 left-2 z-[3] sm:bottom-3 sm:left-[calc(50%-190px)] lg:-bottom-5 lg:-left-7"
        />
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
    <div className="container px-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
      <div className="lg:col-span-7 order-2 lg:order-1 pb-6">
        <HeroContent about={about} stats={stats} motion={useMotion} />
      </div>
      <div className="lg:col-span-5 relative order-1 lg:order-2">
        <div className="absolute -bottom-3 right-2 md:right-6 w-[82%] h-[78%] bg-[#FFDE00] rounded-[2.5rem] border-4 border-black shadow-brutal-lg z-0" />
        <div className="relative aspect-[4/5] max-w-[360px] mx-auto lg:ml-auto rounded-[2.5rem] overflow-hidden border-4 border-black shadow-brutal-lg bg-slate-900 z-[1]">
          {profileImg && (
            <Image
              src={profileImg.imageUrl}
              alt={about.name}
              fill
              sizes="(max-width: 768px) 85vw, (max-width: 1200px) 42vw, 360px"
              style={{
                objectFit: (profileImg.objectFit as "cover" | "contain" | undefined) ?? "cover",
                objectPosition: profileImg.objectPosition ?? "center",
              }}
              data-ai-hint={profileImg.imageHint}
              priority
            />
          )}
          <div className="absolute top-4 right-4 bg-[#A3E635] text-black border-2 border-black px-3.5 py-1.5 rounded-xl shadow-brutal-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-black" />
            <span className="text-[11px] font-headline font-black uppercase tracking-wider">AVAILABLE ⚡</span>
          </div>
        </div>
        <PortfolioMascot
          section="hero"
          size={120}
          mobileSize={72}
          position="left"
          alt="Friendly robot mascot welcoming visitors to Zidan's portfolio"
          className="absolute bottom-24 left-2 z-[3] sm:bottom-3 sm:left-[calc(50%-190px)] lg:-bottom-5 lg:-left-7"
        />
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
  const statCardClass =
    "bg-slate-900 p-5 rounded-2xl border-3 border-black shadow-brutal transition-all duration-150 group/stat cursor-default";

  const headline = (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-5">
        <FloatAnimation duration={4} distance={4}>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFDE00] text-black font-headline font-black text-xs uppercase border-2 border-black shadow-brutal-sm -rotate-1">
            💻 FULLSTACK DEVELOPER
          </span>
        </FloatAnimation>
        <FloatAnimation duration={4.5} distance={5}>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00F0FF] text-black font-headline font-black text-xs uppercase border-2 border-black shadow-brutal-sm rotate-2">
            {about.location ? `${about.location.toUpperCase()} 📍` : "MAKASSAR, ID 📍"}
          </span>
        </FloatAnimation>
      </div>
      <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-luckiest font-black mb-6 leading-[0.88] uppercase tracking-[-0.03em] text-white drop-shadow-[5px_5px_0px_#FFDE00]">
        PORTO<br />FOLIO
      </h1>
      <p className="text-base sm:text-lg font-medium text-slate-300 max-w-xl mb-8 leading-relaxed">
        {about.roleDescription || "Crafting scalable web & mobile products with high-performance code & bold Neobrutalism design."}
      </p>
    </div>
  );

  const statsGrid = (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
      {stats.map((stat, i) =>
        useMotion ? (
          <motion.div
            key={stat.id}
            className={statCardClass}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ delay: 0.35 + i * 0.06, duration: 0.45, ease }}
          >
            <p className="text-3xl font-headline font-black text-[#FFDE00] mb-0.5 group-hover/stat:text-[#00F0FF] transition-colors">
              {stat.value}
            </p>
            <p className="text-[10px] font-headline font-black text-slate-300 uppercase tracking-wider">
              {stat.label}
            </p>
          </motion.div>
        ) : (
          <div key={stat.id} className={statCardClass}>
            <p className="text-3xl font-headline font-black text-[#FFDE00] mb-0.5 group-hover/stat:text-[#00F0FF] transition-colors">
              {stat.value}
            </p>
            <p className="text-[10px] font-headline font-black text-slate-300 uppercase tracking-wider">
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
