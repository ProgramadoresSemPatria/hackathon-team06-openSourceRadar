import { Button } from "@/components/ui/button";
import { Github, Compass, Lock } from "lucide-react";
import { Radar } from "./Radar";

export function HeroSection() {
  return (
    <section className="grid gap-12 md:grid-cols-2 md:gap-16 items-center ">
      {/* Text container */}
      <div className="flex flex-col gap-6">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
          <span className="flex h-2 w-2 rounded-full bg-foreground"></span>
          <span className="ml-2 font-medium">Discover • Contribute • Grow</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Your personal <span className="text-foreground">open source</span>{" "}
            radar
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Find projects that match your skills, track your contributions, and
            build your developer profile in the open source community.
          </p>
        </div>

        <Button size="lg" className="w-full md:max-w-52 gap-2">
          <Github className="h-5 w-5" />
          <span>Connect with GitHub</span>
        </Button>
      </div>

      {/* Radar Card */}
      <div className="rounded-xl border bg-card shadow-2xl px-8 py-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10">
              <Compass className="h-4 w-4" />
            </div>
            <h3 className="font-semibold">Project Radar</h3>
          </div>
          <div className="rounded-full bg-foreground/10 px-2 py-1 text-xs font-medium">
            Scanning
          </div>
        </div>

        {/* Body */}
        <div className="flex items-center justify-center py-12 w-full rounded-lg border">
          <Radar />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Connect with GitHub to unlock personalized features
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
