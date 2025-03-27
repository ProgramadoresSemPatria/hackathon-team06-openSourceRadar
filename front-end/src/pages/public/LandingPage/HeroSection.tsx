import { Button } from "@/components/ui/button";
import { Github, Compass, Lock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
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

      {/* Radar container */}
      <div className="relative">
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-foreground/10 to-foreground/20 blur-xl"></div>
        <div className="relative rounded-xl border bg-card p-1 shadow-xl">
          <div className="space-y-3 rounded-lg bg-background p-6">
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

            <div className="space-y-2">
              {/* Radar visualization */}
              <div className="relative h-64 w-full rounded-lg border">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-48 w-48">
                    {[1, 2, 3, 4].map((ring) => (
                      <div
                        key={ring}
                        className="absolute inset-0 rounded-full border border-dashed border-foreground/20"
                        style={{
                          transform: `scale(${ring / 4})`,
                          opacity: 1 - (ring - 1) * 0.2,
                        }}
                      />
                    ))}

                    {/* Project dots */}
                    <ProjectDot
                      position="top-1/4 right-1/4"
                      size="lg"
                      color="bg-blue-500"
                      pulse
                    />
                    <ProjectDot
                      position="bottom-1/3 left-1/4"
                      size="md"
                      color="bg-slate-500"
                    />
                    <ProjectDot
                      position="top-1/3 left-1/3"
                      size="sm"
                      color="bg-yellow-400"
                    />
                    <ProjectDot
                      position="bottom-1/4 right-1/3"
                      size="md"
                      color="bg-purple-500"
                      pulse
                    />
                    <ProjectDot
                      position="top-1/2 left-1/2"
                      size="sm"
                      color="bg-red-500"
                    />
                    <ProjectDot
                      position="bottom-1/2 right-1/2"
                      size="lg"
                      color="bg-cyan-400"
                      pulse
                    />

                    {/* Center dot */}
                    <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow-lg shadow-foreground/20" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Connect with GitHub to unlock personalized features
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectDotProps {
  position: string;
  size: "sm" | "md" | "lg";
  color: string;
  pulse?: boolean;
}

function ProjectDot({ position, size, color, pulse = false }: ProjectDotProps) {
  const sizeClass = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  }[size];

  return (
    <div className={`absolute ${position} flex items-center justify-center`}>
      <div className={`rounded-full ${color} ${sizeClass} shadow-lg`} />
      {pulse && (
        <div
          className={`absolute rounded-full ${color} ${sizeClass} animate-ping opacity-75`}
          style={{ animationDuration: "3s" }}
        />
      )}
    </div>
  );
}
