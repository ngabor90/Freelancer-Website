import { useEffect, useRef, useState } from "react";

export const Reveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-x-0 translate-y-0 opacity-100 blur-none";
    switch (direction) {
      case "up":
        return "translate-y-8 opacity-0 blur-xs";
      case "down":
        return "-translate-y-8 opacity-0 blur-xs";
      case "left":
        return "translate-x-8 opacity-0 blur-xs";
      case "right":
        return "-translate-x-8 opacity-0 blur-xs";
      default:
        return "opacity-0 blur-xs";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: "800ms",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all transform ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};
