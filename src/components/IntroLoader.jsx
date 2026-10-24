import { useEffect, useRef, useState, useCallback } from "react";

export const IntroLoader = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const timersRef = useRef([]);
  const originalOverflowRef = useRef("");
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsVisible(false);
    document.body.style.overflow = originalOverflowRef.current;
    if (onComplete) onComplete();
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (isExiting || completedRef.current) return;

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setIsExiting(true);
    const skipTimer = setTimeout(() => {
      finish();
    }, 750);
    timersRef.current.push(skipTimer);
  }, [isExiting, finish]);

  useEffect(() => {
    originalOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setStage(1), 120);
    const t2 = setTimeout(() => setStage(2), 750);
    const t3 = setTimeout(() => setStage(3), 1300);
    const t4 = setTimeout(() => setIsExiting(true), 3800);
    const t5 = setTimeout(() => finish(), 4700);

    timersRef.current = [t1, t2, t3, t4, t5];

    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflowRef.current;
    };
  }, [finish, handleSkip]);

  if (!isVisible) return null;

  return (
    <aside
      role="status"
      aria-label="Oldal betöltése"
      tabIndex={0}
      onClick={handleSkip}
      className={`fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer select-none overflow-hidden transition-transform duration-900 ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        backgroundColor: "var(--color-background, #0f1418)",
        transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div
        className={`absolute w-[450px] h-[450px] rounded-full pointer-events-none transition-opacity duration-1000 ${
          stage >= 1 ? "opacity-30" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(circle, var(--color-primary, #6366f1) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div
        className={`relative z-10 w-[92vw] max-w-[720px] px-4 transition-all duration-700 ${
          isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 360"
          className="w-full h-auto drop-shadow-2xl"
          role="img"
          aria-labelledby="loader-title loader-desc"
        >
          <title id="loader-title">Németh Gábor - Webfejlesztő</title>
          <desc id="loader-desc">Betöltési animáció</desc>

          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary, #6366f1)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="var(--color-primary, #6366f1)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--color-primary, #6366f1)" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <g textAnchor="middle">
            <text
              x="600"
              y="166"
              fontSize="82"
              fontWeight="700"
              letterSpacing="3"
              className="fill-foreground font-sans transition-all duration-900 ease-out"
              style={{
                opacity: stage >= 1 ? 1 : 0,
                transform: stage >= 1 ? "translateY(0)" : "translateY(16px)",
                filter: stage >= 1 ? "blur(0px)" : "blur(8px)",
                transition: "opacity 0.9s ease-out, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s ease-out",
              }}
            >
              Németh{" "}
              <tspan fill="var(--color-primary, #6366f1)">Gábor</tspan>
            </text>

            <rect
              x="505"
              y="205"
              width="190"
              height="3"
              rx="1.5"
              fill="url(#lineGrad)"
              className="transition-all duration-800 ease-out"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                transform: stage >= 2 ? "scaleX(1)" : "scaleX(0)",
                opacity: stage >= 2 ? 1 : 0,
                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out",
              }}
            />

            <text
              x="600"
              y="266"
              fontSize="31"
              fontWeight="400"
              letterSpacing="9"
              className="fill-muted-foreground font-sans uppercase"
              style={{
                opacity: stage >= 3 ? 0.9 : 0,
                transform: stage >= 3 ? "translateY(0)" : "translateY(12px)",
                filter: stage >= 3 ? "blur(0px)" : "blur(6px)",
                transition: "opacity 0.9s ease-out, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s ease-out",
              }}
            >
              Webfejlesztő
            </text>
          </g>
        </svg>

        <p
          className={`text-center text-xs text-muted-foreground/40 mt-4 tracking-wider transition-opacity duration-500 ${
            stage >= 3 ? "opacity-100" : "opacity-0"
          }`}
        >
          Kattints az átugráshoz
        </p>
      </div>
    </aside>
  );
};
