export function Radar() {
  return (
    <>
      <div className="relative h-48 w-48">
        {[1, 2, 3, 4].map((ring) => (
          <div
            key={ring}
            className="absolute inset-0 rounded-full border border-dashed border-foreground/50"
            style={{
              transform: `scale(${ring / 4})`,
              opacity: 1 - (ring - 1) * 0.2,
            }}
          />
        ))}

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
          size="md"
          color="bg-yellow-400"
          pulse
        />
        <ProjectDot
          position="bottom-1/4 right-1/3"
          size="md"
          color="bg-purple-500"
          pulse
        />
        <ProjectDot position="top-1/2 left-1/2" size="sm" color="bg-red-500" />
        <ProjectDot
          position="bottom-1/2 right-1/2"
          size="lg"
          color="bg-cyan-400"
        />
      </div>
    </>
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
