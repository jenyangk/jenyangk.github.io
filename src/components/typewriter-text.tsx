import { useEffect, useState, useRef, useCallback } from "react";

export interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  cursorClassName?: string;
  onComplete?: () => void;
  start?: boolean;
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  speed = 80,
  className,
  cursorClassName = "animate-pulse opacity-60",
  onComplete,
  start = true,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const typeNext = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= speed) {
        lastTimeRef.current = timestamp;
        if (indexRef.current < text.length) {
          setDisplayText(text.slice(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          setIsComplete(true);
          onComplete?.();
          return;
        }
      }

      rafRef.current = requestAnimationFrame(typeNext);
    },
    [text, speed, onComplete]
  );

  useEffect(() => {
    if (!start) return;
    indexRef.current = 0;
    setDisplayText("");
    setIsComplete(false);
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(typeNext);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [start, text, typeNext]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && !isComplete && (
        <span className={cursorClassName}>|</span>
      )}
    </span>
  );
}
