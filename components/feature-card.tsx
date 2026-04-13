"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Feature } from "@/lib/pebbles-data";

interface FeatureCardProps {
  feature: Feature;
  /** Even index = image left, odd index = image right */
  index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const hasImages = feature.images && feature.images.length > 0;
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const imageRight = index % 2 === 1;
  const imageCount = feature.images?.length ?? 0;
  const showGalleryNav = hasImages && imageCount > 1;

  const goPrev = () => {
    setActiveIdx((i) => (i - 1 + imageCount) % imageCount);
  };

  const goNext = () => {
    setActiveIdx((i) => (i + 1) % imageCount);
  };

  return (
    <Reveal delay={0.05 * index}>
      <div
        className={`flex flex-col gap-8 md:flex-row md:items-center ${
          imageRight ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* ── Image / gallery side (narrower on md+ for 14" laptops) ── */}
        <div className="w-full shrink-0 md:w-[45%] md:max-w-md">
          {hasImages ? (
            <div className="rounded-3xl bg-gradient-to-b from-muted/40 via-card to-secondary/20 p-0.5 shadow-lg shadow-primary/7 ring-1 ring-border/60 md:p-1">
              {/* Main image + optional arrow gallery — tight inset so shot fills the frame */}
              <div className="relative">
                <button
                  className="group relative block w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-md ring-1 ring-inset ring-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setLightboxOpen(true)}
                  aria-label={`View ${feature.title} screenshot ${activeIdx + 1} of ${imageCount} fullscreen`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative aspect-[9/16] w-full min-h-[68svh] max-h-[min(90svh,960px)] sm:aspect-[9/14] md:aspect-auto md:h-[78svh] md:min-h-[72svh] md:max-h-[min(88svh,960px)]"
                    >
                      <Image
                        src={feature.images![activeIdx]}
                        alt={`${feature.title} screenshot ${activeIdx + 1}`}
                        fill
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 42vw, 360px"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <span className="absolute bottom-2 right-2 rounded-md bg-background/70 px-2 py-1 text-xs text-muted-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    Click to zoom
                  </span>
                </button>

                {showGalleryNav ? (
                  <>
                    <button
                      type="button"
                      className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={goPrev}
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft className="h-5 w-5 drop-shadow-md" aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={goNext}
                      aria-label="Next screenshot"
                    >
                      <ChevronRight className="h-5 w-5 drop-shadow-md" aria-hidden />
                    </button>
                    <span className="pointer-events-none absolute top-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-background/80 px-2.5 py-0.5 text-xs font-medium tabular-nums text-muted-foreground backdrop-blur-sm">
                      {activeIdx + 1} / {imageCount}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          ) : (
            /* Placeholder when no images yet */
            <div className="flex aspect-[9/16] w-full min-h-[68svh] max-h-[min(90svh,960px)] items-center justify-center rounded-3xl border border-dashed border-border/80 bg-gradient-to-b from-muted/50 to-secondary/15 p-4 shadow-inner ring-1 ring-inset ring-primary/5 sm:aspect-[9/14] md:aspect-auto md:h-[78svh] md:min-h-[72svh] md:max-h-[min(88svh,960px)]">
              <p className="text-sm text-muted-foreground">
                {feature.title} · screenshot coming
              </p>
            </div>
          )}
        </div>

        {/* ── Text side ────────────────────────────────────────── */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {feature.users}
            </p>
            <h3 className="mt-1 text-2xl font-bold leading-snug">
              {feature.title}
            </h3>
            <p className="mt-1 text-base font-medium text-primary">
              {feature.tagline}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {feature.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {feature.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {hasImages && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-sm border-0 bg-transparent p-0 shadow-none">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={feature.images![activeIdx]}
                alt={`${feature.title} fullscreen`}
                width={300}
                height={700}
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Reveal>
  );
}
