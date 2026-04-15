"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Separator } from "@/components/ui/separator";

interface ProjectIntroProps {
  name: string;
  logoPath: string;
  role: string;
  scope: string;
  period: string;
  summary: string;
}

export function ProjectIntro({
  name,
  logoPath,
  role,
  scope,
  period,
  summary,
}: ProjectIntroProps) {
  return (
    <Reveal>
      <div className="mx-auto mb-16 max-w-3xl rounded-2xl border border-border/90 border-t-4 border-t-primary bg-gradient-to-b from-card to-muted/25 px-8 py-7 shadow-md shadow-primary/5 ring-1 ring-primary/7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          {/* Logo */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-border/90 bg-muted/50 p-3 shadow-inner ring-1 ring-inset ring-primary/10">
            <Image
              src={logoPath}
              alt={`${name} logo`}
              width={48}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Meta */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Project
            </p>
            <h3 className="mt-0.5 text-2xl font-bold">{name}</h3>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
              {/* <span>
                <span className="font-medium text-foreground">Role:</span> {role}
              </span> */}
              {/* <span>
                <span className="font-medium text-foreground">Scope:</span> {scope}
              </span> */}
              {/* <span>
                <span className="font-medium text-foreground">Period:</span> {period}
              </span> */}
            </div>
          </div>
        </div>

        <Separator className="my-5" />

        <p className="text-sm leading-relaxed text-muted-foreground">
          {summary}
        </p>
      </div>
    </Reveal>
  );
}
