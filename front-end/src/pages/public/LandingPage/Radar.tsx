import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Repositórios de exemplo para exibir nos balões
const exampleRepos = [
  { name: "react", stars: "212k" },
  { name: "tensorflow", stars: "178k" },
  { name: "vscode", stars: "153k" },
  { name: "bitcoin", stars: "72k" },
  { name: "typescript", stars: "94k" },
];

export function Radar() {
  // Estado para o ponto que está sendo atualmente destacado
  const [highlightedDot, setHighlightedDot] = useState<number | null>(null);

  // Estado para armazenar os pontos do radar
  const [projectDots, setProjectDots] = useState<
    Array<{
      id: number;
      position: { x: number; y: number };
      repo: { name: string; stars: string };
      delay: number;
    }>
  >([]);

  // Controle de animação para o scanner
  const scannerControls = useAnimation();

  // Ref para armazenar o ponto que foi destacado por interação do usuário
  const userHighlightedDotRef = useRef<number | null>(null);

  // Gerar pontos de projetos em posições naturais e espalhadas
  useEffect(() => {
    // Posições espalhadas pelo radar
    const positions = [
      { x: 0.25, y: 0.18 }, // Superior esquerdo
      { x: 0.72, y: 0.23 }, // Superior direito
      { x: 0.17, y: 0.65 }, // Meio esquerdo
      { x: 0.83, y: 0.72 }, // Inferior direito
      { x: 0.55, y: 0.55 }, // Meio-direita
    ];

    const dots = positions.map((position, index) => ({
      id: index,
      position: { x: position.x * 2 - 1, y: position.y * 2 - 1 }, // Convertendo para range -1 a 1
      repo: exampleRepos[index],
      delay: index * 0.3,
    }));

    setProjectDots(dots);

    // Iniciar a animação do scanner
    scannerControls.start({
      rotate: 360,
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "linear",
      },
    });

    // Iniciar com o primeiro ponto destacado após um pequeno delay
    setTimeout(() => {
      setHighlightedDot(0);
    }, 1000);
  }, [scannerControls]);

  // Efeito para alternar entre os pontos em intervalos regulares
  useEffect(() => {
    // Define a duração de uma rotação completa em milissegundos (6 segundos)
    const ROTATION_DURATION = 6000;

    // O intervalo entre mudanças de ponto será a duração da rotação
    const intervalId = setInterval(() => {
      // Só mudar o ponto automaticamente se o usuário não estiver interagindo
      if (userHighlightedDotRef.current === null) {
        setHighlightedDot((prevDot) => {
          // Circular através dos pontos
          if (prevDot === null || prevDot >= projectDots.length - 1) {
            return 0;
          }
          return prevDot + 1;
        });
      }
    }, ROTATION_DURATION);

    return () => clearInterval(intervalId);
  }, [projectDots.length]);

  // Manipulador para destacar um ponto ao passar o mouse
  const handleMouseEnter = (index: number) => {
    setHighlightedDot(index);
    userHighlightedDotRef.current = index;
  };

  // Manipulador para remover o destaque ao tirar o mouse
  const handleMouseLeave = () => {
    userHighlightedDotRef.current = null;
    // Não resetamos o highlightedDot aqui para manter o ponto atual
  };

  return (
    <div className="relative aspect-square size-full max-w-72 max-h-72 flex items-center justify-center">
      {/* Background do radar */}
      <div className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/5" />

      {/* Anéis do radar */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-dashed border-blue-500/30"
            style={{
              width: `${(ring / 3) * 100}%`,
              height: `${(ring / 3) * 100}%`,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%)`,
            }}
          />
        ))}

        {/* Grade em cruz */}
        <div
          className="absolute w-full h-px bg-blue-500/20"
          style={{ top: "50%", left: 0 }}
        />
        <div
          className="absolute w-px h-full bg-blue-500/20"
          style={{ left: "50%", top: 0 }}
        />

        {/* Linha de varredura animada */}
        <motion.div
          className="absolute w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"
          style={{
            originX: 0,
            originY: "50%",
            top: "50%",
            left: "50%",
          }}
          animate={scannerControls}
        >
          <div className="absolute top-0 right-0 h-2 w-2 -mr-1 -mt-1 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
        </motion.div>

        {/* Ponto central pulsante */}
        <motion.div
          className="absolute w-3 h-3 bg-blue-500 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.7)",
              "0 0 0 10px rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </div>

      {/* Pontos de projetos */}
      {projectDots.map((dot, index) => (
        <ProjectDot
          key={dot.id}
          posX={dot.position.x}
          posY={dot.position.y}
          repo={dot.repo}
          delay={dot.delay}
          isHighlighted={highlightedDot === index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

interface ProjectDotProps {
  posX: number;
  posY: number;
  repo: { name: string; stars: string };
  delay: number;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function ProjectDot({
  posX,
  posY,
  repo,
  delay,
  isHighlighted,
  onMouseEnter,
  onMouseLeave,
}: ProjectDotProps) {
  // Converter posições relativas (-1 a 1) para porcentagens
  const left = `${50 + posX * 50}%`;
  const top = `${50 + posY * 50}%`;

  // Determinar para qual lado o balão deve apontar
  const isLeft = posX > 0;

  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left, top }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Balão de informação */}
      <AnimatePresence>
        {isHighlighted && (
          <motion.div
            className={`absolute whitespace-nowrap ${
              isLeft ? "right-full mr-3" : "left-full ml-3"
            } top-0 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-lg text-sm flex flex-col transform -translate-y-1/2 z-10`}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-medium">{repo.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              {repo.stars}
            </span>

            {/* Seta do balão */}
            <div
              className={`absolute ${
                isLeft ? "right-[-6px]" : "left-[-6px]"
              } top-1/2 transform -translate-y-1/2 w-0 h-0 border-solid border-[6px] ${
                isLeft
                  ? "border-l-white dark:border-l-gray-800 border-r-transparent"
                  : "border-r-white dark:border-r-gray-800 border-l-transparent"
              } border-y-transparent`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ponto do projeto - com animação de pulso mais suave */}
      <motion.div
        className="rounded-full bg-blue-500 h-3 w-3"
        style={{
          boxShadow:
            "0 0 8px rgba(59, 130, 246, 0.8), 0 0 12px rgba(59, 130, 246, 0.3)",
        }}
        whileHover={{ scale: 1.5 }}
        animate={
          isHighlighted
            ? {
                scale: [1.2, 1.4, 1.2],
                boxShadow: [
                  "0 0 8px rgba(59, 130, 246, 0.8), 0 0 12px rgba(59, 130, 246, 0.3)",
                  "0 0 12px rgba(59, 130, 246, 1), 0 0 18px rgba(59, 130, 246, 0.5)",
                  "0 0 8px rgba(59, 130, 246, 0.8), 0 0 12px rgba(59, 130, 246, 0.3)",
                ],
              }
            : {
                scale: [0.95, 1.05, 0.95],
                boxShadow: [
                  "0 0 5px rgba(59, 130, 246, 0.5), 0 0 8px rgba(59, 130, 246, 0.2)",
                  "0 0 8px rgba(59, 130, 246, 0.6), 0 0 10px rgba(59, 130, 246, 0.3)",
                  "0 0 5px rgba(59, 130, 246, 0.5), 0 0 8px rgba(59, 130, 246, 0.2)",
                ],
              }
        }
        transition={{
          duration: isHighlighted ? 2 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Efeito de pulso adicional quando destacado */}
      {isHighlighted && (
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500 opacity-70"
          animate={{
            scale: [1, 2],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}
    </motion.div>
  );
}
